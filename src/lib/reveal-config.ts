export const revealConfig = {
	backgroundTransition: "fade",
	center: true,
	controls: true,
	hash: true,
	height: 720,
	history: true,
	margin: 0.08,
	minScale: 0.2,
	progress: true,
	slideNumber: "c/t",
	transition: "slide",
	viewDistance: 3,
	width: 1280,
	copycode: {
		button: "hover",
		cssautoload: false,
		display: "text",
		text: {
			copied: "Copied",
			copy: "Copy",
		},
		timeout: 1200,
	},
	katex: {
		local: "/katex",
	},
} as const;
