import RevealMermaid from "reveal.js-mermaid-plugin";

import type { RevealPlugin, RevealPluginFactory } from "reveal.js";

export const mermaidPlugins = [RevealMermaid] satisfies Array<
	RevealPlugin | RevealPluginFactory
>;

export const mermaidPresetConfig = {
	mermaid: {
		startOnLoad: false,
	},
};
