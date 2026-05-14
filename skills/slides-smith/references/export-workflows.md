# Export Workflows

## Contents

1. Decision tree
2. Reveal PDF
3. Pandoc PPTX
4. Screenshot PPTX
5. Native PPTX
6. Legacy PPT

## Decision Tree

Ask this when the user requests PowerPoint and intent is unclear:

> Should the PPTX be editable as PowerPoint text/shapes, or should it preserve the Reveal deck visuals as faithfully as possible?

| Answer                                 | Use                   |
| -------------------------------------- | --------------------- |
| Editable, outline, simple theme        | Pandoc PPTX           |
| Pixel-fidelity, polished Reveal design | Screenshot PPTX       |
| Editable and highly designed           | Native PPTX           |
| Delivery handout                       | Reveal PDF            |
| `.ppt` specifically                    | Legacy PPT after PPTX |

## Reveal PDF

Use for delivery, speaker review, or handouts.

Terminal 1:

```bash
pnpm build
pnpm preview
```

Terminal 2, while preview is still running:

```bash
pnpm export:pdf
```

Reveal's browser print path is `?print-pdf`. Manual export requires Chrome/Chromium, landscape, no margins, and background graphics enabled.

## Pandoc PPTX

Best for editable text-first decks. Pandoc does not preserve React/CSS Reveal visuals; create an intermediate Markdown source.

Recommended structure:

```text
exports/<deck-slug>.md
exports/reference.pptx        # optional template
exports/<deck-slug>.pptx
```

Markdown pattern:

```markdown
---
title: Deck Title
author: Team
---

# Slide Title

- Point one
- Point two

::: notes
Speaker notes here.
:::

---

# Next Slide
```

Commands:

```bash
pandoc "exports/<deck-slug>.md" -t pptx -o "exports/<deck-slug>.pptx"
pandoc "exports/<deck-slug>.md" -t pptx --reference-doc "exports/reference.pptx" -o "exports/<deck-slug>.pptx"
```

Use Pandoc when source is Markdown, content must remain editable, or the user expects conventional PowerPoint styling.

## Screenshot PPTX

Best for preserving the Reveal deck exactly. It creates a PowerPoint where each slide is a full-slide image.

Workflow:

1. Build and preview the deck.
2. Capture slide screenshots with Playwright or Decktape.
3. Generate a PPTX that places each image edge-to-edge using PptxGenJS.

Trade-off: visual fidelity is high, but text is not editable.

Implementation guidance:

- Use 16:9 layout unless the Reveal config says otherwise.
- Use PNG for crisp UI/code slides; JPEG only for photo-heavy decks.
- Preserve speaker notes separately in Markdown or PDF because screenshot slides do not contain editable notes.

## Native PPTX

Best when the user requires both editability and designed slides. Use PptxGenJS to create native text boxes, shapes, images, and charts from structured slide data.

Use this only when the deck content can be represented as a data model. Do not attempt to convert arbitrary React DOM to editable PowerPoint shapes automatically.

Suggested architecture:

```text
exports/<deck-slug>.json
scripts/export-pptx.mjs
exports/<deck-slug>.pptx
```

## Legacy PPT

Only use `.ppt` when explicitly required. Generate PPTX first, then convert with LibreOffice:

```bash
soffice --headless --convert-to ppt --outdir exports "exports/<deck-slug>.pptx"
```

Warn that `.ppt` is a legacy binary format and may lose layout fidelity.

## Validation

After any export work:

1. Re-run the source deck validation.
2. Open or inspect the exported file if tooling is available.
3. Document the trade-off in the final response: editable vs visual fidelity.
