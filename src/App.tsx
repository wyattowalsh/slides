import "reveal.js/reveal.css";
import "reveal.js/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";
import "reveal.js-copycode/plugin/copycode/copycode.css";
import { ActiveDeck } from "@/slides/active-deck";

export function App() {
	return <ActiveDeck />;
}
