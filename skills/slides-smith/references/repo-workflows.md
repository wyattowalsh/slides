# Repo Workflows

## Contents

1. Repo topology
2. Common workflows
3. Plugin policy
4. Legacy migration
5. Documentation sync

## Repo Topology

| Path                                | Purpose                             | Rules                               |
| ----------------------------------- | ----------------------------------- | ----------------------------------- |
| `/`                                 | Vite + React + Reveal.js deck app   | Keep app at root                    |
| `src/slides/`                       | Presentation source                 | Prefer React Reveal components      |
| `src/lib/reveal-plugins.ts`         | Default plugin array                | Keep stable and small               |
| `src/lib/reveal-plugin-metadata.ts` | Plugin policy metadata              | Sync with README/docs               |
| `src/lib/reveal-plugin-presets/`    | Opt-in community presets            | Static imports before `Deck` mounts |
| `docs/`                             | Next.js + Fumadocs documentation    | Build with `pnpm docs:build`        |
| `packages/ui/`                      | Shared shadcn-compatible primitives | Keep minimal and reusable           |
| `legacy/`                           | Archived imported material          | Not active app source               |

## Common Workflows

### Create

1. Read `AGENTS.md`, README, and current `src/slides/` structure.
2. Ask for missing audience/duration/content only if not inferable.
3. Draft the narrative arc: opener, sections, proof, close.
4. Implement with `Deck`, `Slide`, `Stack`, `Fragment`, `Code`, and `Markdown`.
5. Add tests only where behavior/navigation/export risk changes.
6. Run relevant validation.

### Edit

1. Locate target slide IDs/components.
2. Make small edits instead of rewriting the whole deck.
3. Preserve existing visual language unless user asks for redesign.
4. Validate the touched path.

### Design

1. Identify existing tokens/classes before adding new styling.
2. Improve hierarchy, spacing, contrast, density, and rhythm.
3. Use motion sparingly: fragments, transitions, auto-animate, opt-in Appearance only when useful.
4. Verify desktop and mobile Playwright flows when layout changes.

## Plugin Policy

Default plugins are `Highlight`, `Notes`, `Search`, `Zoom`, `Math.KaTeX`, and `CopyCode`.

When adding a plugin:

1. Check `src/lib/reveal-plugin-metadata.ts` first.
2. Prefer built-in Reveal capability or existing opt-in preset.
3. If new preset is needed, add a static module under `src/lib/reveal-plugin-presets/` and import package CSS there.
4. Add the preset to `tests/plugin-presets-entry.ts` so `pnpm validate:plugin-presets` compiles it.
5. Add bundle-guard markers to `src/lib/reveal-plugin-bundle-guards.json` for any new opt-in package or CSS marker. Edit `scripts/validate-default-bundle.mjs` only when validator behavior changes.
6. Update metadata, README, and `docs/content/docs/reveal-plugins.mdx`.
7. For default plugin changes, also update `src/lib/reveal-plugins.ts` and confirm the default remains intentionally small.
8. Run `pnpm validate:plugin-presets`, then `pnpm validate:slides` or `pnpm build && pnpm validate:bundle`.
9. Run `pnpm docs:build` when README/docs changed and `pnpm test:e2e` when runtime navigation, layout, or accessibility can change.

Do not add remote-control, analytics, live-code execution, server-rendered diagrams, or arbitrary external loaders without a security/privacy review.

## Legacy Migration

Use this path for old reveal.js HTML, copied upstream checkouts, or one-off decks.

1. Preserve source material under `legacy/` only when it has user-owned value.
2. Do not copy `.git`, `node_modules`, caches, generated build output, or vendored upstream source unless required for a runnable snapshot.
3. Document archive boundaries in a `README.md` inside the legacy folder.
4. Port reusable content into `src/slides/` intentionally; do not treat archived HTML as active source.
5. Keep `legacy/**` ignored by lint/build unless intentionally validating an archive.

## Documentation Sync

Update docs when changing:

| Change          | Surfaces                                                               |
| --------------- | ---------------------------------------------------------------------- |
| Default plugins | `src/lib/reveal-plugins.ts`, metadata, bundle guard, README, docs      |
| Opt-in presets  | preset module, preset entry test, bundle guard, metadata, README, docs |
| Commands        | `package.json`, README, docs                                           |
| Export workflow | README, docs export page, skill reference if applicable                |
| Repo topology   | `AGENTS.md`, README, docs                                              |
