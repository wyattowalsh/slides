import Markdown from "reveal.js/plugin/markdown";
import Notes from "reveal.js/plugin/notes";
import Search from "reveal.js/plugin/search";
import Highlight from "reveal.js/plugin/highlight";
import Zoom from "reveal.js/plugin/zoom";

export const builtInPlugins = [Markdown, Highlight, Notes, Search, Zoom];

export function isPrintPdf(params) {
	return params.has("print-pdf") || document.documentElement.classList.contains("print-pdf");
}

export function shouldLoadMenu(params) {
	const value = params.get("menu");
	return params.has("menu") && value !== "0" && value !== "false" && !isPrintPdf(params);
}

export async function resolvePlugins(params) {
	const plugins = [...builtInPlugins];
	const optional = {
		menu: false,
	};

	if (shouldLoadMenu(params)) {
		await import("reveal.js-menu/menu.css");
		const { default: RevealMenu } = await import("reveal.js-menu/plugin.js");
		plugins.push(RevealMenu());
		optional.menu = true;
	}

	return { plugins, optional };
}

export function menuConfig(params) {
	if (!shouldLoadMenu(params)) return {};

	return {
		menu: {
			path: "./reveal-menu/",
			loadIcons: false,
			openButton: false,
			keyboard: true,
			numbers: "c/t",
			themes: false,
			transitions: false,
			titleSelector: "h1, h2, [data-menu-title]",
			useTextContentForMissingTitles: false,
		},
	};
}
