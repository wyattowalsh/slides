import { createServer } from "vite";
import puppeteer from "puppeteer";

export async function withDeckBrowser(callback) {
	const server = await createServer({
		appType: "mpa",
		logLevel: "error",
		server: {
			host: "127.0.0.1",
			port: 0,
		},
	});

	let browser;

	try {
		await server.listen();
		const baseUrl = server.resolvedUrls.local[0];
		browser = await puppeteer.launch({
			headless: "new",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});

		await callback({ browser, baseUrl });
	} finally {
		if (browser) await browser.close();
		await server.close();
	}
}

export async function openDeck(browser, baseUrl, path = "") {
	const page = await browser.newPage();
	const errors = [];

	page.on("pageerror", (error) => errors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") {
			errors.push(message.text());
		}
	});

	await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle0" });
	await page.waitForFunction(() => window.__LEGORA_DECK__?.initialized === true, {
		timeout: 15000,
	});

	return { page, errors };
}

export function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}
