import Reveal from "reveal.js";
import deckData from "../data/deck.json";
import sources from "../data/sources.json";
import { menuConfig, resolvePlugins } from "./load-plugins.js";
import { renderDeck } from "./render-deck.js";

import "reveal.js/reset.css";
import "reveal.js/reveal.css";
import "reveal.js/theme/white.css";
import "reveal.js/plugin/highlight/monokai.css";
import "./styles.css";

const params = new URLSearchParams(window.location.search);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function notesMode() {
	const showNotes = params.get("showNotes");
	if (showNotes === "separate-page") return "separate-page";
	if (showNotes === "inline") return true;
	return params.has("showNotes") ? true : false;
}

function hideRuntimeFlagsFromReveal(flagNames) {
	if (!flagNames.some((flagName) => params.has(flagName))) return () => {};

	const originalUrl = window.location.href;
	const revealUrl = new URL(originalUrl);
	flagNames.forEach((flagName) => revealUrl.searchParams.delete(flagName));
	window.history.replaceState(window.history.state, "", revealUrl);

	return () => window.history.replaceState(window.history.state, "", originalUrl);
}

const renderStats = renderDeck(document.querySelector(".slides"), deckData, sources);
const { plugins, optional } = await resolvePlugins(params);
const restoreRuntimeFlags = hideRuntimeFlagsFromReveal(["menu"]);

await Reveal.initialize({
	hash: true,
	controls: true,
	progress: true,
	slideNumber: "c/t",
	width: 1280,
	height: 720,
	margin: 0.055,
	transition: prefersReducedMotion ? "none" : "slide",
	backgroundTransition: prefersReducedMotion ? "none" : "fade",
	autoAnimate: !prefersReducedMotion,
	view: params.get("view") === "scroll" ? "scroll" : null,
	scrollLayout: "compact",
	scrollSnap: "proximity",
	scrollProgress: "auto",
	showNotes: notesMode(),
	pdfSeparateFragments: false,
	previewLinks: false,
	plugins,
	highlight: {
		escapeHTML: true,
		highlightOnLoad: true,
	},
	...menuConfig(params),
});

restoreRuntimeFlags();
window.__LEGORA_REVEAL__ = Reveal;
window.__LEGORA_DECK__ = {
	initialized: true,
	meta: deckData.meta,
	optional,
	plugins: Object.keys(Reveal.getPlugins()),
	...renderStats,
};
