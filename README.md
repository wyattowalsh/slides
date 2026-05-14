# slides

Reveal.js slide authoring workspace with React, Tailwind CSS v4, shadcn/ui-style primitives, and a Fumadocs development docs site.

## Layout

| Path           | Purpose                                            |
| -------------- | -------------------------------------------------- |
| `src/`         | Root Vite + React + Reveal.js deck                 |
| `packages/ui/` | Shared Tailwind v4 + shadcn-compatible primitives  |
| `docs/`        | Next.js + Fumadocs development documentation       |
| `tests/e2e/`   | Playwright and axe smoke tests for the deck        |
| `legacy/`      | Archived deck/source material, not active app code |
| `skills/`      | Project-local AI agent skills for this workspace   |

The root stays the slides app. Do not add an `apps/` layer unless the repo grows enough to justify a topology change.

Legacy material imported from the previous `~/dev/tools/reveal.js` checkout lives under `legacy/reveal-js/`. Treat it as reference input until intentionally ported into the active React deck.

## Requirements

- Node.js `>=24`
- pnpm, pinned by `packageManager`

Install dependencies:

```bash
pnpm install
```

## Commands

| Command                        | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `pnpm dev`                     | Run the slide deck locally                        |
| `pnpm build`                   | Build the slide deck                              |
| `pnpm preview`                 | Preview the built deck                            |
| `pnpm docs:dev`                | Run the Fumadocs docs site                        |
| `pnpm docs:build`              | Build the docs site                               |
| `pnpm typecheck`               | Type-check root, UI package, and docs             |
| `pnpm lint`                    | Run ESLint                                        |
| `pnpm test:ui`                 | Run shared UI primitive unit tests                |
| `pnpm validate`                | Run the aggregate pre-ship validation gate        |
| `pnpm validate:bundle`         | Ensure opt-in presets stay out of the app bundle  |
| `pnpm validate:plugin-presets` | Compile opt-in plugin preset imports and CSS      |
| `pnpm validate:slides`         | Build and validate the rendered Reveal deck       |
| `pnpm test:e2e`                | Run Playwright smoke tests                        |
| `pnpm test:e2e:preview`        | Run Playwright smoke tests against preview output |
| `pnpm export:pdf`              | Export `slides.pdf` from a running preview server |

## Authoring Slides

The rendered deck is selected by `src/slides/active-deck.tsx`, with test-facing metadata in `src/slides/active-deck-metadata.ts`. The current active source is `src/slides/LegoraInterviewPrep.tsx`; `src/slides/Presentation.tsx` remains a reusable starter/example deck.

Slide files should use official `@revealjs/react` components.

- Use `Slide` for horizontal slides and `Stack` for vertical slide groups.
- Use `Fragment` for incremental reveals.
- Use `Code` with `RevealHighlight` registered in `src/lib/reveal-plugins.ts`.
- Use React `Markdown` for markdown slides. Do not add the Reveal Markdown plugin unless a concrete markdown-plugin feature is needed.
- Use Reveal slide props and `data-*` attributes for backgrounds, lightbox previews, speaker notes, auto-animate, and transitions.

## Plugin Policy

Default plugins are intentionally small: Highlight, Notes, Search, Zoom, Math.KaTeX, and CopyCode. Additional community plugins stay opt-in and documented before they become defaults.

Reviewed opt-ins live in `src/lib/reveal-plugin-metadata.ts`. Presets that import plugin code and CSS live in `src/lib/reveal-plugin-presets/` so decks opt in statically before `@revealjs/react` initializes Reveal. Available presets cover Appearance, Verticator, Mermaid, and Simplemenu.

Run `pnpm validate:plugin-presets` after adding or changing preset modules. It compiles optional preset imports and CSS through Vite and checks preset config exports such as Mermaid's `startOnLoad: false` contract, but it does not prove runtime Reveal initialization.

Run `pnpm validate:bundle` after building the deck to ensure opt-in preset markers from `src/lib/reveal-plugin-bundle-guards.json` are absent from the default production bundle. `pnpm validate:slides` runs the bundle check after rendered deck validation.

Additional researched plugins stay metadata-only until a deck needs them. Useful lab candidates include drawing, pointer, attribution, narrated slideshow, and specialized fragment-flow helpers; remote control, analytics, webcam, voice, live-code, terminal execution, and external-content loaders remain blocked pending security and privacy review.

See `src/lib/reveal-plugin-metadata.ts` and `docs/content/docs/reveal-plugins.mdx` for the current allowlist, opt-in list, and avoided plugins.

## Agent Workflow

Use `/slides-smith <workflow>` or `skills/slides-smith/` for AI-assisted deck creation, editing, validation, migration, and export workflows in this repository. See `skills/slides-smith/SKILL.md` for dispatch, validation, and reference-loading rules. Do not use it for Slidev/Marp, generic PowerPoint design, or agent/skill/MCP authoring.

The skill includes PPT/PPTX export decision logic:

- Pandoc PPTX for editable text-first decks.
- PptxGenJS screenshot-backed PPTX for visual fidelity.
- PptxGenJS native shapes for highly editable designed decks.
- LibreOffice conversion only when legacy `.ppt` output is explicitly required.

## Docs Workflow

The docs site in `./docs` documents the implementation conventions for this workspace: setup, authoring patterns, plugin policy, export, and validation.

Run it with:

```bash
pnpm docs:dev
```

## Export And Validation

Use `pnpm validate:slides` before committing slide changes. Use `pnpm validate` before broad deck, plugin, docs, package, or workflow changes. For PDF export, build and start the preview server in one terminal:

```bash
pnpm build
pnpm preview
```

Then export from another terminal while preview is running:

```bash
pnpm export:pdf
```

## Dependency Policy

Runtime and tooling dependencies are pinned exactly in `package.json`; use the lockfile plus reviewed dependency updates instead of caret ranges. Keep optional Reveal plugins out of the default bundle unless their status changes in metadata, docs, README, and the bundle guard together.

Run `pnpm audit --audit-level moderate` during release checks and after dependency updates. Treat `docs/content` as public-by-default because the Fumadocs search route indexes committed docs content.
