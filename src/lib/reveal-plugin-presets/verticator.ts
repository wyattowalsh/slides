import RevealVerticator from "reveal.js-verticator";
import "reveal.js-verticator/verticator.css";

import type { RevealPlugin, RevealPluginFactory } from "reveal.js";

export const verticatorPlugins = [RevealVerticator] satisfies Array<
	RevealPlugin | RevealPluginFactory
>;
