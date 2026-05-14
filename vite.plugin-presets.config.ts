import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 7000,
		emptyOutDir: true,
		lib: {
			entry: fileURLToPath(
				new URL("./tests/plugin-presets-entry.ts", import.meta.url),
			),
			fileName: "plugin-presets",
			formats: ["es"],
		},
		outDir: ".tmp/plugin-preset-build",
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
