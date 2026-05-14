# Slides Repository Instructions

## Topology

- The repository root is the Vite + React + Reveal.js slides application.
- Development docs live in `./docs` and use Next.js + Fumadocs.
- Shared shadcn-compatible primitives live in `./packages/ui`.
- Do not add an `apps/` directory or move the slides app out of the root without explicit approval.

## Slide Authoring

- Prefer official `@revealjs/react` components: `Deck`, `Slide`, `Stack`, `Fragment`, `Code`, and `Markdown`.
- Let `@revealjs/react` own Reveal initialization, cleanup, sync, event wiring, and config updates.
- Keep the default plugin array stable and small. Sync any plugin default changes across `src/lib/reveal-plugins.ts`, `src/lib/reveal-plugin-metadata.ts`, README, and docs.
- Do not register the Reveal Markdown plugin by default; React `Markdown` handles markdown slides directly.
- Use Reveal `data-*` attributes or React props for backgrounds, transitions, fragments, notes, and lightbox behavior instead of custom lifecycle wrappers.

## Tooling

- Use pnpm workspace commands from the repo root.
- Use Tailwind CSS v4 CSS-first tokens; avoid `tailwind.config.ts` unless a concrete integration requires it.
- Keep shadcn-style components minimal and reusable in `packages/ui`.
- Before finishing implementation work, run the relevant validation scripts: `pnpm build`, `pnpm docs:build`, `pnpm validate:slides`, and `pnpm test:e2e`.
