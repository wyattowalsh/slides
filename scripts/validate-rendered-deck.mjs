import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { get } from "node:http";
import { createServer } from "node:net";
import { join } from "node:path";
import { spawn, spawnSync } from "node:child_process";

const host = "127.0.0.1";
const defaultPort = 4173;
const outputDirectory = join(process.cwd(), ".tmp", "rendered-validation");
const renderedDeckPath = join(outputDirectory, "rendered-reveal.html");

const findAvailablePort = async () => {
	for (let port = defaultPort; port < defaultPort + 50; port += 1) {
		const isAvailable = await new Promise((resolve) => {
			const server = createServer();

			server.unref();
			server.on("error", () => resolve(false));
			server.listen(port, host, () => {
				server.close(() => resolve(true));
			});
		});

		if (isAvailable) {
			return String(port);
		}
	}

	throw new Error("Could not find an available preview port.");
};

const waitForServer = async (url, previewProcess, timeoutMs = 30_000) => {
	const deadline = Date.now() + timeoutMs;

	while (Date.now() < deadline) {
		if (previewProcess.exitCode !== null || previewProcess.signalCode !== null) {
			throw new Error(
				`Preview server exited before becoming ready. Exit code: ${previewProcess.exitCode}, signal: ${previewProcess.signalCode}.`,
			);
		}

		const isReady = await new Promise((resolve) => {
			const request = get(url, (response) => {
				response.resume();
				resolve(response.statusCode !== undefined && response.statusCode < 500);
			});

			request.on("error", () => resolve(false));
			request.setTimeout(1_000, () => {
				request.destroy();
				resolve(false);
			});
		});

		if (isReady) {
			return;
		}

		await new Promise((resolve) => setTimeout(resolve, 250));
	}

	throw new Error(`Timed out waiting for preview server at ${url}.`);
};

const port = await findAvailablePort();
const baseUrl = `http://${host}:${port}`;
const preview = spawn(
	"pnpm",
	["exec", "vite", "preview", "--host", host, "--port", port, "--strictPort"],
	{
		stdio: ["ignore", "pipe", "pipe"],
	},
);

preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
preview.stderr.on("data", (chunk) => process.stderr.write(chunk));

const stopPreview = async () => {
	if (preview.exitCode !== null || preview.signalCode !== null) {
		return;
	}

	await new Promise((resolve) => {
		preview.once("exit", resolve);
		preview.kill("SIGTERM");
		setTimeout(resolve, 2_000).unref();
	});
};

try {
	await waitForServer(baseUrl, preview);

	let browser;
	const consoleErrors = [];
	let renderedDeck;

	try {
		browser = await chromium.launch();
		const page = await browser.newPage();

		page.on("console", (message) => {
			if (message.type() === "error") {
				consoleErrors.push(message.text());
			}
		});

		await page.goto(baseUrl, { waitUntil: "networkidle" });
		await page.waitForSelector(".reveal .slides section", { timeout: 10_000 });

		renderedDeck = await page.locator(".reveal").evaluate((element) => {
			const ownerDocument = element.ownerDocument;

			return {
				activeSlideText:
					ownerDocument
						.querySelector(".reveal .slides section.present")
						?.textContent?.trim() ?? "",
				sectionCount: ownerDocument.querySelectorAll(".reveal .slides section")
					.length,
				markup: element.outerHTML,
			};
		});
	} finally {
		await browser?.close();
	}

	if (consoleErrors.length > 0) {
		throw new Error(`Rendered deck produced console errors:\n${consoleErrors.join("\n")}`);
	}

	if (renderedDeck.sectionCount === 0) {
		throw new Error("Rendered deck did not contain any Reveal sections.");
	}

	if (!renderedDeck.activeSlideText) {
		throw new Error("Rendered deck did not expose text for the active slide.");
	}

	if (!existsSync(outputDirectory)) {
		mkdirSync(outputDirectory, { recursive: true });
	}

	writeFileSync(
		renderedDeckPath,
		`<!doctype html><html><body>${renderedDeck.markup}</body></html>`,
	);

	const validation = spawnSync(
		"pnpm",
		["exec", "revealjs-validator", renderedDeckPath],
		{ encoding: "utf8" },
	);

	if (validation.status !== 0) {
		throw new Error(
			`Rendered Reveal validation failed:\n${validation.stdout}${validation.stderr}`,
		);
	}

	console.log(
		`Rendered deck validation passed for ${renderedDeck.sectionCount} Reveal sections.`,
	);
} finally {
	await stopPreview();
}
