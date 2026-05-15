import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { deckUrl } from "@/lib/deck-url";

export const baseOptions = {
	nav: {
		title: "Slides",
	},
	links: [
		{
			text: "Deck",
			url: deckUrl,
		},
	],
} satisfies BaseLayoutProps;
