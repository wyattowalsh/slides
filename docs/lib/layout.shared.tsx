import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions = {
	nav: {
		title: "Slides",
	},
	links: [
		{
			text: "Deck",
			url: "http://localhost:5173",
		},
	],
} satisfies BaseLayoutProps;
