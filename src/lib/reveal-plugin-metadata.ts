export type RevealPluginStatus = "default" | "opt-in" | "lab" | "avoid";

export type RevealPluginCategory =
	| "official"
	| "authoring"
	| "animation"
	| "navigation"
	| "diagram"
	| "interaction"
	| "remote"
	| "data-viz"
	| "collection"
	| "runtime";

export type RevealPluginCompatibility =
	| "verified"
	| "compatible"
	| "review-required"
	| "avoid";

export type RevealPluginRisk = "low" | "medium" | "high";

export type RevealPluginTestStatus =
	| "covered"
	| "bundle-covered"
	| "metadata-only"
	| "blocked";

export interface RevealPluginMetadata {
	name: string;
	packageName: string;
	status: RevealPluginStatus;
	category: RevealPluginCategory;
	version?: string;
	importPath?: string;
	cssPath?: string;
	peerRange?: string;
	license?: string;
	compatibility: RevealPluginCompatibility;
	risk: RevealPluginRisk;
	testStatus: RevealPluginTestStatus;
	sourceUrl: string;
	rationale: string;
}

export const revealPluginMetadata: RevealPluginMetadata[] = [
	{
		name: "Highlight",
		packageName: "reveal.js/plugin/highlight",
		status: "default",
		category: "official",
		importPath: "reveal.js/plugin/highlight",
		peerRange: "reveal.js@6.0.1",
		license: "MIT",
		compatibility: "verified",
		risk: "low",
		testStatus: "covered",
		sourceUrl: "https://revealjs.com/plugins/",
		rationale:
			"Official syntax highlighting plugin required by the React Code component.",
	},
	{
		name: "Notes",
		packageName: "reveal.js/plugin/notes",
		status: "default",
		category: "official",
		importPath: "reveal.js/plugin/notes",
		peerRange: "reveal.js@6.0.1",
		license: "MIT",
		compatibility: "verified",
		risk: "low",
		testStatus: "covered",
		sourceUrl: "https://revealjs.com/speaker-view/",
		rationale: "Official speaker notes plugin with low runtime risk.",
	},
	{
		name: "Search",
		packageName: "reveal.js/plugin/search",
		status: "default",
		category: "official",
		importPath: "reveal.js/plugin/search",
		peerRange: "reveal.js@6.0.1",
		license: "MIT",
		compatibility: "verified",
		risk: "low",
		testStatus: "covered",
		sourceUrl: "https://revealjs.com/plugins/",
		rationale: "Official deck search plugin and useful during authoring.",
	},
	{
		name: "Zoom",
		packageName: "reveal.js/plugin/zoom",
		status: "default",
		category: "official",
		importPath: "reveal.js/plugin/zoom",
		peerRange: "reveal.js@6.0.1",
		license: "MIT",
		compatibility: "verified",
		risk: "low",
		testStatus: "covered",
		sourceUrl: "https://revealjs.com/plugins/",
		rationale: "Official zoom affordance for presenting dense slides.",
	},
	{
		name: "Math.KaTeX",
		packageName: "reveal.js/plugin/math",
		status: "default",
		category: "official",
		importPath: "reveal.js/plugin/math",
		peerRange: "reveal.js@6.0.1",
		license: "MIT",
		compatibility: "verified",
		risk: "low",
		testStatus: "covered",
		sourceUrl: "https://revealjs.com/math/",
		rationale:
			"Official math renderer configured for local KaTeX assets when available.",
	},
	{
		name: "CopyCode",
		packageName: "reveal.js-copycode",
		status: "default",
		category: "authoring",
		version: "1.4.2",
		importPath: "reveal.js-copycode",
		cssPath: "reveal.js-copycode/plugin/copycode/copycode.css",
		peerRange: "reveal.js >=4.0.0",
		license: "MIT",
		compatibility: "verified",
		risk: "low",
		testStatus: "covered",
		sourceUrl: "https://github.com/Martinomagnifico/reveal.js-copycode",
		rationale:
			"Small utility plugin for copying code examples without changing authoring syntax.",
	},
	{
		name: "Mermaid",
		packageName: "reveal.js-mermaid-plugin",
		status: "opt-in",
		category: "diagram",
		version: "11.12.3",
		importPath: "@/lib/reveal-plugin-presets/mermaid",
		peerRange: "reveal.js 5 examples; reviewed against Reveal 6 import model",
		license: "MIT",
		compatibility: "compatible",
		risk: "medium",
		testStatus: "bundle-covered",
		sourceUrl: "https://github.com/zjffun/reveal.js-mermaid-plugin",
		rationale: "Useful for diagram-heavy talks, but too large for every deck.",
	},
	{
		name: "Simplemenu",
		packageName: "reveal.js-simplemenu",
		status: "opt-in",
		category: "navigation",
		version: "2.0.3",
		importPath: "@/lib/reveal-plugin-presets/simplemenu",
		cssPath: "reveal.js-simplemenu/plugin/simplemenu/simplemenu.css",
		license: "MIT",
		compatibility: "compatible",
		risk: "medium",
		testStatus: "bundle-covered",
		sourceUrl: "https://github.com/Martinomagnifico/reveal.js-simplemenu",
		rationale:
			"Navigation UI is presentation-specific and should not be a default.",
	},
	{
		name: "Appearance",
		packageName: "reveal.js-appearance",
		status: "opt-in",
		category: "animation",
		version: "1.4.0",
		importPath: "@/lib/reveal-plugin-presets/appearance",
		cssPath: "reveal.js-appearance/appearance.css",
		peerRange: "reveal.js >=4.0.0",
		license: "MIT",
		compatibility: "compatible",
		risk: "low",
		testStatus: "bundle-covered",
		sourceUrl: "https://github.com/Martinomagnifico/reveal.js-appearance",
		rationale:
			"Maintained ESM plugin with explicit CSS import; decks opt in before Reveal initializes.",
	},
	{
		name: "Verticator",
		packageName: "reveal.js-verticator",
		status: "opt-in",
		category: "navigation",
		version: "1.3.2",
		importPath: "@/lib/reveal-plugin-presets/verticator",
		cssPath: "reveal.js-verticator/verticator.css",
		peerRange: "reveal.js >=4.0.0",
		license: "MIT",
		compatibility: "compatible",
		risk: "low",
		testStatus: "bundle-covered",
		sourceUrl: "https://github.com/Martinomagnifico/reveal.js-verticator",
		rationale:
			"Maintained vertical-stack indicator plugin; useful only when a deck needs extra navigation chrome.",
	},
	{
		name: "reveal.js-plugins",
		packageName: "reveal.js-plugins",
		status: "lab",
		category: "collection",
		version: "4.6.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "high",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/rajgoel/reveal.js-plugins",
		rationale:
			"Large collection; import specific plugins only after a concrete deck need appears.",
	},
	{
		name: "Rajgoel Chalkboard",
		packageName: "reveal.js-plugins/chalkboard",
		status: "lab",
		category: "interaction",
		version: "4.6.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl:
			"https://github.com/rajgoel/reveal.js-plugins/tree/master/chalkboard",
		rationale:
			"Useful for teaching annotations, but it needs CSS, input handling, storage, and print-mode testing before any preset.",
	},
	{
		name: "Rajgoel Audio Slideshow",
		packageName: "reveal.js-plugins/audio-slideshow",
		status: "lab",
		category: "runtime",
		version: "4.6.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl:
			"https://github.com/rajgoel/reveal.js-plugins/tree/master/audio-slideshow",
		rationale:
			"Narrated decks are a valid use case, but recording/playback behavior must be tested separately from live presentations.",
	},
	{
		name: "Rajgoel Animate",
		packageName: "reveal.js-plugins/animate",
		status: "lab",
		category: "animation",
		version: "4.6.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl:
			"https://github.com/rajgoel/reveal.js-plugins/tree/master/animate",
		rationale:
			"SVG animation can help specialized decks, but Appearance and Reveal auto-animate cover most routine animation needs.",
	},
	{
		name: "Rajgoel Fullscreen",
		packageName: "reveal.js-plugins/fullscreen",
		status: "lab",
		category: "interaction",
		version: "4.6.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl:
			"https://github.com/rajgoel/reveal.js-plugins/tree/master/fullscreen",
		rationale:
			"Could support iframe-heavy decks, but it uses collection-style packaging and overlaps built-in fullscreen behavior.",
	},
	{
		name: "Rajgoel Seminar Suite",
		packageName: "reveal.js-plugins/seminar poll questions",
		status: "lab",
		category: "remote",
		version: "4.6.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "high",
		testStatus: "metadata-only",
		sourceUrl:
			"https://github.com/rajgoel/reveal.js-plugins/tree/master/seminar",
		rationale:
			"Live classes, polls, and Q&A are useful but require a Socket.IO server, room security, moderation, and privacy review.",
	},
	{
		name: "Drawer",
		packageName: "reveal.js-drawer",
		status: "lab",
		category: "interaction",
		version: "0.1.3",
		license: "MIT",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/burnpiro/reveal-drawer",
		rationale:
			"Drawing overlay can be valuable for teaching decks but needs browser input and cleanup testing.",
	},
	{
		name: "Pointer",
		packageName: "reveal.js-pointer",
		status: "lab",
		category: "interaction",
		license: "MIT",
		compatibility: "review-required",
		risk: "low",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/burnpiro/reveal-pointer",
		rationale:
			"Small pointer affordance for presenters; verify ESM/CSS packaging and input behavior before preset promotion.",
	},
	{
		name: "FsFx",
		packageName: "reveal.js-fsfx",
		status: "lab",
		category: "interaction",
		license: "MIT",
		compatibility: "review-required",
		risk: "low",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/Martinomagnifico/reveal.js-fsfx",
		rationale:
			"Fullscreen/start-button UI can help kiosk decks, but Reveal already has built-in fullscreen support.",
	},
	{
		name: "Attribution",
		packageName: "rschmehl/reveal-plugins/attribution",
		status: "lab",
		category: "authoring",
		license: "MIT",
		compatibility: "review-required",
		risk: "low",
		testStatus: "metadata-only",
		sourceUrl:
			"https://github.com/rschmehl/reveal-plugins/tree/main/attribution",
		rationale:
			"Useful for image-heavy decks, but it needs a packaged import path and visual regression check before use.",
	},
	{
		name: "Relative Number",
		packageName: "reveal.js-relativenumber",
		status: "lab",
		category: "navigation",
		version: "1.0.2",
		license: "MIT",
		compatibility: "review-required",
		risk: "low",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/Martinomagnifico/reveal.js-relativenumber",
		rationale:
			"Can place slide numbers in custom chrome, but Simplemenu and Reveal slide-number config cover common cases.",
	},
	{
		name: "Fragment Flow Helpers",
		packageName: "reveal-onetimer / reveal-skip-fragments",
		status: "lab",
		category: "navigation",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/tpoindex/reveal-onetimer",
		rationale:
			"One-time or skipped fragments are niche rehearsal aids and can surprise standard fragment navigation.",
	},
	{
		name: "Reveal Remote",
		packageName: "cologneintelligence/reveal.js-remote",
		status: "lab",
		category: "remote",
		license: "MIT",
		compatibility: "review-required",
		risk: "high",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/cologneintelligence/reveal.js-remote",
		rationale:
			"Socket.IO remote-control features require server, authentication, and privacy review before use.",
	},
	{
		name: "RevealD3",
		packageName: "reveald3",
		status: "lab",
		category: "data-viz",
		version: "2.0.0",
		license: "MIT",
		compatibility: "review-required",
		risk: "medium",
		testStatus: "metadata-only",
		sourceUrl: "https://github.com/gcalmettes/reveal.js-d3",
		rationale:
			"Powerful iframe-based data visualization support, but package metadata is old and bundle impact is high.",
	},
	{
		name: "PlantUML",
		packageName: "reveal-plantuml",
		status: "avoid",
		category: "diagram",
		compatibility: "avoid",
		risk: "high",
		testStatus: "blocked",
		sourceUrl: "https://github.com/soluml/reveal-plantuml",
		rationale:
			"Remote rendering and server dependency add reliability and privacy risk.",
	},
	{
		name: "Legacy Live Code And Analytics Plugins",
		packageName:
			"reveal-run-in-terminal / reveal-ga / tracking / mqtt / webcam plugins",
		status: "avoid",
		category: "runtime",
		compatibility: "avoid",
		risk: "high",
		testStatus: "blocked",
		sourceUrl: "https://revealjs.com/plugins/",
		rationale:
			"Execution, tracking, or media-capture plugins need explicit product, privacy, and security review before any deck can depend on them.",
	},
	{
		name: "Deprecated Or Superseded Navigation Plugins",
		packageName:
			"reveal.js-menu / reveal.js-toolbar / jump-plugin / TOC plugins / title footer",
		status: "avoid",
		category: "navigation",
		compatibility: "avoid",
		risk: "medium",
		testStatus: "blocked",
		sourceUrl: "https://revealjs.com/jump-to-slide/",
		rationale:
			"These are stale, duplicate Simplemenu or built-in Reveal features, or add licensing/packaging risk without current deck demand.",
	},
	{
		name: "Arbitrary Execution And External Content Plugins",
		packageName:
			"anything / loadcontent / external HTML / css-snippet / editors / livecode",
		status: "avoid",
		category: "runtime",
		compatibility: "avoid",
		risk: "high",
		testStatus: "blocked",
		sourceUrl:
			"https://github.com/rajgoel/reveal.js-plugins/tree/master/anything",
		rationale:
			"Runtime HTML loading, editor execution, and function-string evaluation conflict with React authoring and expand the trust boundary.",
	},
	{
		name: "Hardware And Sensor Control Plugins",
		packageName: "gamepad / joycon / leap / wave / speech / tts",
		status: "avoid",
		category: "interaction",
		compatibility: "avoid",
		risk: "high",
		testStatus: "blocked",
		sourceUrl: "https://revealjs.com/touch-navigation/",
		rationale:
			"Hardware, webcam, speech, and sensor controls are presenter-specific and add privacy or device-dependency risk.",
	},
];
