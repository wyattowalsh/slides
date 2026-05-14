import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "src"),
			"@workspace/ui": resolve(import.meta.dirname, "packages/ui/src"),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		include: ["packages/ui/src/**/*.test.tsx", "src/**/*.test.ts"],
		testTimeout: 10_000,
	},
});
