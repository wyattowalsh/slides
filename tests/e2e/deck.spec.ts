import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { activeDeckMetadata } from "../../src/slides/active-deck-metadata";

const appOrigin = new URL(
	process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5173",
).origin;

const failingResource = (url: string) => {
	const { origin, pathname } = new URL(url);
	return origin === appOrigin && pathname !== "/favicon.ico";
};

const assertNoSeriousOrCriticalA11yViolations = async (page: Page) => {
	const results = await new AxeBuilder({ page }).include(".reveal").analyze();
	const seriousOrCritical = results.violations.filter(
		(violation) =>
			violation.impact === "critical" || violation.impact === "serious",
	);

	expect(seriousOrCritical).toEqual([]);
};

const trackPageFailures = (page: Page) => {
	const consoleErrors: string[] = [];
	const requestFailures: string[] = [];
	const badResponses: string[] = [];

	page.on("console", (message) => {
		if (message.type() === "error") {
			consoleErrors.push(message.text());
		}
	});

	page.on("requestfailed", (request) => {
		if (failingResource(request.url())) {
			requestFailures.push(`${request.url()}: ${request.failure()?.errorText}`);
		}
	});

	page.on("response", (response) => {
		if (response.status() >= 400 && failingResource(response.url())) {
			badResponses.push(`${response.url()}: ${response.status()}`);
		}
	});

	return () => {
		expect(consoleErrors).toEqual([]);
		expect(requestFailures).toEqual([]);
		expect(badResponses).toEqual([]);
	};
};

test("deck renders and covers desktop navigation plus mobile route smoke", async ({
	page,
}, testInfo) => {
	const isMobile = testInfo.project.name === "mobile-chrome";
	const expectNoPageFailures = trackPageFailures(page);

	await page.goto("/");

	await expect(
		page.getByRole("heading", {
			name: new RegExp(activeDeckMetadata.testStates.initialHeading, "i"),
		}),
	).toBeVisible();

	if (isMobile) {
		// Mobile emulation does not expose deterministic Reveal controls here, so
		// this branch explicitly verifies route-level rendering at a later slide.
		// Desktop coverage below exercises fragments and vertical-stack navigation.
		await page.goto(activeDeckMetadata.testStates.mobileSmoke.hash);
		await expect(
			page.getByRole("heading", {
				name: activeDeckMetadata.testStates.mobileSmoke.heading,
			}),
		).toBeVisible();

		expectNoPageFailures();
		return;
	}

	for (const [
		index,
		heading,
	] of activeDeckMetadata.testStates.desktopHeadings.entries()) {
		await page.keyboard.press("ArrowRight");
		await expect(page).toHaveURL(new RegExp(`#/${index + 1}$`));
		await expect(page.getByRole("heading", { name: heading })).toBeVisible();
	}

	await page.goto(activeDeckMetadata.testStates.verticalStack.hash);
	await expect(
		page.getByRole("heading", {
			name: activeDeckMetadata.testStates.verticalStack.initialHeading,
		}),
	).toBeVisible();

	await page.keyboard.press("ArrowDown");
	await expect(
		page.getByRole("heading", {
			name: activeDeckMetadata.testStates.verticalStack.downHeading,
		}),
	).toBeVisible();

	expectNoPageFailures();
});

test("representative deck states have no critical accessibility violations", async ({
	page,
}) => {
	const routes = [
		"/",
		activeDeckMetadata.testStates.mobileSmoke.hash,
		activeDeckMetadata.testStates.verticalStack.hash,
	];

	for (const route of routes) {
		await page.goto(route);
		await assertNoSeriousOrCriticalA11yViolations(page);
	}
});
