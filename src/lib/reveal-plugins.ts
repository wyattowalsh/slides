import RevealCopyCode from "reveal.js-copycode";
import RevealHighlight from "reveal.js/plugin/highlight";
import RevealMath from "reveal.js/plugin/math";
import RevealNotes from "reveal.js/plugin/notes";
import RevealSearch from "reveal.js/plugin/search";
import RevealZoom from "reveal.js/plugin/zoom";

export const revealPlugins = [
	RevealHighlight,
	RevealNotes,
	RevealSearch,
	RevealZoom,
	RevealMath.KaTeX,
	RevealCopyCode,
];
