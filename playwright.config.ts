import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5173";
const webServerCommand =
	process.env.PLAYWRIGHT_WEB_SERVER_COMMAND ?? "pnpm dev";
const reportSuffix = new URL(baseURL).port === "4173" ? "preview" : "dev";
const reuseExistingServer =
	process.env.PLAYWRIGHT_REUSE_EXISTING_SERVER === "1";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	outputDir: `test-results-${reportSuffix}`,
	reporter: [
		["list"],
		[
			"html",
			{
				open: "never",
				outputFolder:
					process.env.PLAYWRIGHT_HTML_REPORT ??
					`playwright-report-${reportSuffix}`,
			},
		],
	],
	use: {
		baseURL,
		trace: "on-first-retry",
	},
	webServer: {
		command: webServerCommand,
		reuseExistingServer,
		url: baseURL,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 7"] },
		},
	],
});
