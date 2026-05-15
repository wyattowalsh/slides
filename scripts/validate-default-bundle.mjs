import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const assetsDirectory = join(process.cwd(), "dist", "assets");
const bundleGuardPath = join(
	process.cwd(),
	"src",
	"lib",
	"reveal-plugin-bundle-guards.json",
);
const bundleGuards = JSON.parse(readFileSync(bundleGuardPath, "utf8"));
const blockedJavaScriptMarkers = bundleGuards.optInPlugins.flatMap(
	(plugin) =>
		plugin.javaScriptMarkers.map((marker) => ({
			label: `${plugin.name}: ${marker}`,
			marker,
		})),
);
const blockedCssMarkers = bundleGuards.optInPlugins.flatMap((plugin) =>
	plugin.cssMarkers.map((marker) => ({
		label: `${plugin.name}: ${marker}`,
		marker,
	})),
);

if (!existsSync(assetsDirectory)) {
	throw new Error(
		"Missing dist/assets. Run `pnpm build` before validating the default bundle.",
	);
}

const assetFiles = readdirSync(assetsDirectory);
const javascriptFiles = assetFiles.filter((fileName) => fileName.endsWith(".js"));
const cssFiles = assetFiles.filter((fileName) => fileName.endsWith(".css"));

if (javascriptFiles.length === 0) {
	throw new Error("No JavaScript assets found in dist/assets.");
}

const matches = [];

const collectMarkerMatches = (fileNames, markerEntries) => {
	for (const fileName of fileNames) {
		const filePath = join(assetsDirectory, fileName);
		const contents = readFileSync(filePath, "utf8");

		for (const markerEntry of markerEntries) {
			if (contents.includes(markerEntry.marker)) {
				matches.push(`${fileName}: ${markerEntry.label}`);
			}
		}
	}
};

collectMarkerMatches(javascriptFiles, blockedJavaScriptMarkers);
collectMarkerMatches(cssFiles, blockedCssMarkers);

if (cssFiles.length === 0 && blockedCssMarkers.length > 0) {
	console.warn(
		"No CSS assets found in dist/assets; skipped opt-in plugin CSS marker validation.",
	);
}

if (matches.length > 0) {
	throw new Error(
		`Default bundle includes opt-in plugin markers:\n${matches.join("\n")}`,
	);
}

console.log("Default bundle excludes opt-in plugin markers from JS assets.");

if (cssFiles.length > 0) {
	console.log("Default bundle excludes opt-in plugin markers from CSS assets.");
}
