# Legacy reveal.js Migration

This directory preserves the useful, user-owned artifacts extracted from the previous checkout at `/Users/ww/dev/tools/reveal.js` before that checkout was removed.

The full upstream reveal.js source tree was not vendored into this workspace because this app already consumes `reveal.js` and `@revealjs/react` as pinned package dependencies. Copying the full checkout would duplicate the dependency source, generated bundles, and dependency tree inside the slides app.

## Contents

| Path                                  | Source                                | Purpose                                                                                             |
| ------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `legora-interview-prep/`              | `legora-interview-prep/`              | Standalone custom Legora interview preparation deck from the old checkout's custom commits.         |
| `dist/`                               | active `node_modules/reveal.js/dist`  | Minimal Reveal runtime assets needed by the archived static HTML snapshots.                         |
| `examples/legora-interview-prep.html` | `examples/legora-interview-prep.html` | Static reveal.js example snapshot for the Legora deck.                                              |
| `venture-screening-prep.html`         | `venture-screening-prep.html`         | Standalone venture screening preparation deck snapshot.                                             |
| `react/`                              | `react/`                              | Source-only reference copy of the `@revealjs/react` wrapper source and notes from the old checkout. |
| `source-root/`                        | selected root files                   | Old checkout root dependency/config state that was dirty or untracked during migration.             |

## Active Workspace Boundary

Files under `legacy/` are archival inputs, not active app source. The active slides app remains the repository root Vite app, docs remain under `docs/`, and shared UI remains under `packages/ui/`.

If a legacy deck should become an active deck, port it into `src/slides/` using `@revealjs/react` components and cover it with the normal validation flow.

Nested `package.json`, lockfile, and workspace files under `legacy/` are preserved as historical context only. Do not run installs, audits, or CI from those folders as if they were current workspace packages; their dependency ranges and build-script policies reflect the old checkout, not this repo's pinned root workspace.

The archived `react/` wrapper is preserved for source reference. Its original local `file:` dependencies pointed at the old checkout root, so use the active workspace dependencies or port specific wrapper ideas into normal package dependencies before treating it as runnable. If any legacy subtree must become runnable again, regenerate its lockfile from matching manifests, pin dependency ranges intentionally, and review any install-script allowances before adding it to CI.
