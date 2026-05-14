import RevealSimplemenu from "reveal.js-simplemenu";
import "reveal.js-simplemenu/plugin/simplemenu/simplemenu.css";

import type { RevealPlugin, RevealPluginFactory } from "reveal.js";

export const simplemenuPlugins = [RevealSimplemenu] satisfies Array<
	RevealPlugin | RevealPluginFactory
>;
