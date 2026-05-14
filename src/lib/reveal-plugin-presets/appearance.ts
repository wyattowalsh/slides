import RevealAppearance from "reveal.js-appearance";
import "reveal.js-appearance/appearance.css";

import type { RevealPlugin, RevealPluginFactory } from "reveal.js";

export const appearancePlugins = [RevealAppearance] satisfies Array<
	RevealPlugin | RevealPluginFactory
>;
