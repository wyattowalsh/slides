import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { createReadStream, existsSync, realpathSync, statSync } from "node:fs";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));
const katexDistDirectory = join(rootDirectory, "node_modules", "katex", "dist");
const realKatexDistDirectory = realpathSync(katexDistDirectory);
const contentTypes: Record<string, string> = {
	".css": "text/css; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".ttf": "font/ttf",
	".woff": "font/woff",
	".woff2": "font/woff2",
};

const katexAssetsPlugin = (): Plugin => ({
	name: "slides:katex-assets",
	configureServer(server: ViteDevServer) {
		server.middlewares.use((request, response, next) => {
			const requestUrl = new URL(request.url ?? "/", "http://localhost");

			if (!requestUrl.pathname.startsWith("/katex/dist/")) {
				next();
				return;
			}

			let assetPath: string;

			try {
				assetPath = decodeURIComponent(
					requestUrl.pathname.slice("/katex/dist/".length),
				);
			} catch {
				next();
				return;
			}

			const filePath = resolve(katexDistDirectory, assetPath);
			const pathFromKatexDist = relative(katexDistDirectory, filePath);

			if (
				pathFromKatexDist.startsWith("..") ||
				isAbsolute(pathFromKatexDist) ||
				!existsSync(filePath)
			) {
				next();
				return;
			}

			const realFilePath = realpathSync(filePath);
			const realPathFromKatexDist = relative(
				realKatexDistDirectory,
				realFilePath,
			);

			if (
				realPathFromKatexDist.startsWith("..") ||
				isAbsolute(realPathFromKatexDist)
			) {
				next();
				return;
			}

			const fileStat = statSync(realFilePath);

			if (!fileStat.isFile()) {
				next();
				return;
			}

			response.setHeader(
				"Content-Type",
				contentTypes[extname(filePath)] ?? "application/octet-stream",
			);
			createReadStream(realFilePath).on("error", next).pipe(response);
		});
	},
});

export default defineConfig({
	build: {
		chunkSizeWarningLimit: 1500,
	},
	optimizeDeps: {
		entries: ["index.html", "src/**/*.{ts,tsx}"],
	},
	plugins: [react(), tailwindcss(), katexAssetsPlugin()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		host: "127.0.0.1",
		port: 5173,
	},
	preview: {
		host: "127.0.0.1",
		port: 4173,
	},
});
