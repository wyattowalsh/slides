import { appearancePlugins } from "@/lib/reveal-plugin-presets/appearance";
import {
	mermaidPlugins,
	mermaidPresetConfig,
} from "@/lib/reveal-plugin-presets/mermaid";
import { simplemenuPlugins } from "@/lib/reveal-plugin-presets/simplemenu";
import { verticatorPlugins } from "@/lib/reveal-plugin-presets/verticator";

const presetPluginCounts = {
	appearance: appearancePlugins.length,
	mermaid: mermaidPlugins.length,
	simplemenu: simplemenuPlugins.length,
	verticator: verticatorPlugins.length,
};

for (const [preset, count] of Object.entries(presetPluginCounts)) {
	if (count === 0) {
		throw new Error(`${preset} preset must export at least one plugin.`);
	}
}

if (mermaidPresetConfig.mermaid.startOnLoad !== false) {
	throw new Error(
		"Mermaid preset must disable Mermaid startOnLoad for Reveal.",
	);
}

export { mermaidPresetConfig, presetPluginCounts };
