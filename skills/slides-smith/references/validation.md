# Validation

## Contents

1. Command matrix
2. Focused validation
3. Full validation
4. Browser QA
5. Failure triage

## Command Matrix

| Change                          | Commands                                                    |
| ------------------------------- | ----------------------------------------------------------- |
| TypeScript/React slide edits    | `pnpm typecheck`, `pnpm lint`                               |
| Shared UI primitive changes     | `pnpm test:ui`                                              |
| Slide structure/build output    | `pnpm build`, `pnpm validate:slides`                        |
| Docs changes                    | `pnpm docs:build`                                           |
| Plugin preset changes           | `pnpm validate:plugin-presets`, then `pnpm validate:slides` |
| Bundle-guard-only check         | `pnpm build`, then `pnpm validate:bundle`                   |
| Navigation/layout/accessibility | `pnpm test:e2e`, `pnpm test:e2e:preview`                    |
| Release readiness               | `pnpm validate` plus any export-specific inspection         |

## Focused Validation

Use focused validation for small content-only edits:

```bash
pnpm typecheck
pnpm lint
pnpm test:ui
pnpm validate:slides
```

## Full Validation

Use before declaring broad workflow work complete:

```bash
pnpm validate && pnpm audit --audit-level moderate
```

`pnpm test:e2e` is a dev-server smoke test because Playwright starts `pnpm dev`. `pnpm test:e2e:preview` builds and exercises `pnpm preview` against production output. Neither command proves exported PDF/PPTX files open correctly.

## Browser QA

Current Playwright coverage checks:

1. Desktop deck loads without console errors.
2. Horizontal navigation works.
3. Vertical stacks work when present.
4. Fragments reveal in intended order.
5. Mobile route smoke passes.
6. Axe reports no critical or serious issues on representative `.reveal` states.
7. App-owned requests do not fail.

Residual risks: fragment-revealed content is not exhaustively axe-scanned. For export or release-critical changes, inspect the exported PDF/PPTX manually when tooling is available.

## Failure Triage

| Symptom                | Likely Cause                           | Response                                                |
| ---------------------- | -------------------------------------- | ------------------------------------------------------- |
| Build fails on imports | bad package export or alias            | inspect package exports and import paths                |
| Validator fails        | invalid rendered Reveal HTML structure | inspect `.tmp/rendered-validation/rendered-reveal.html` |
| Bundle guard fails     | opt-in plugin leaked into default path | move imports behind preset-only entry                   |
| E2E nav fails          | route/hash or fragment order changed   | update deck or test expectation intentionally           |
| Axe failure            | semantics, labels, contrast            | fix accessible markup before visual polish              |
| KaTeX asset missing    | build copy step failed                 | verify `dist/katex/dist` after `pnpm build`             |

## Completion Standard

State exactly which commands passed. If a command could not run, state why and what remains unverified.
