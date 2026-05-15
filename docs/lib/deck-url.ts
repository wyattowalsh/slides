const defaultDeckUrl = "http://127.0.0.1:5173";

export const deckUrl =
	process.env.NEXT_PUBLIC_SLIDES_DECK_URL?.trim() || defaultDeckUrl;
