# Authoring Patterns

## Contents

1. Narrative structure
2. React Reveal components
3. Layout and design
4. Markdown and code
5. Accessibility

## Narrative Structure

Use a slide deck as a directed argument, not a document dump.

| Section | Purpose                      | Typical Slides                      |
| ------- | ---------------------------- | ----------------------------------- |
| Opener  | Frame the stakes and promise | title, problem, thesis              |
| Context | Give audience shared ground  | market, architecture, current state |
| Core    | Teach or persuade            | 3-5 sections with evidence          |
| Proof   | Demonstrate credibility      | demo, metrics, code, examples       |
| Close   | Make next action obvious     | summary, decision, appendix         |

Prefer one primary idea per slide. Use vertical stacks for drill-down detail that should not interrupt the main path.

## React Reveal Components

Use official `@revealjs/react` surfaces:

| Need                     | Component / Pattern                                                   |
| ------------------------ | --------------------------------------------------------------------- |
| Horizontal slide         | `Slide`                                                               |
| Vertical stack           | `Stack` containing `Slide` children                                   |
| Incremental reveal       | `Fragment`                                                            |
| Syntax-highlighted code  | `Code` with default Highlight plugin                                  |
| Markdown-authored slides | `Markdown` component, not Reveal Markdown plugin                      |
| Notes                    | `notes` prop or Reveal-compatible notes pattern                       |
| Backgrounds              | `background`, `backgroundColor`, `backgroundImage`, props or `data-*` |
| Transitions              | `transition` prop or `data-transition`                                |
| Auto-animate             | `autoAnimate` and stable `data-id`                                    |

Do not manually initialize Reveal in React components. `Deck` owns lifecycle, synchronization, config, plugin registration, and event wiring.

## Layout And Design

1. Start with audience, venue, and duration.
2. Pick a visual thesis: technical minimal, editorial, product demo, academic, or cinematic.
3. Use stable spacing rhythm and a small type scale.
4. Make slide density intentional: sparse slides for pivots, dense slides for reference only.
5. Vary layout across adjacent slides: title, split, cards, diagram, code, quote, table, demo.
6. Prefer semantic HTML and reusable components over one-off div soup.
7. Keep text contrast WCAG AA or better.
8. Avoid tiny charts, walls of bullets, and decorative motion without narrative purpose.

## Markdown And Code

React `Markdown` can split slides with separators and supports notes and attributes. Use it when content is mostly prose or imported markdown.

Use `Code` for snippets so Highlight and CopyCode work predictably. Keep code blocks short enough for the venue; move full examples to docs or repository files.

## Data And Charts

Prefer simple SVG/HTML/Tailwind visualizations for small static data. Use Mermaid opt-in only for diagram-heavy decks. If adding chart libraries, isolate them to the deck need and validate bundle impact.

## Accessibility

1. Use real headings in order.
2. Provide alt text for meaningful images.
3. Avoid color-only encoding.
4. Ensure keyboard navigation remains usable.
5. Keep touch targets large enough for mobile smoke tests.
6. Run Playwright axe coverage after visual or interaction changes.
