import { cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const sourceDirectory = join(rootDirectory, "node_modules", "katex", "dist");
const targetDirectory = join(rootDirectory, "dist", "katex", "dist");

if (!existsSync(sourceDirectory)) {
	throw new Error(
		"Missing node_modules/katex/dist. Run `pnpm install` before building slides.",
	);
}

if (!existsSync(join(rootDirectory, "dist"))) {
	throw new Error("Missing dist. Run `vite build` before copying KaTeX assets.");
}

cpSync(sourceDirectory, targetDirectory, { recursive: true });

console.log("Copied KaTeX runtime assets to dist/katex/dist.");
