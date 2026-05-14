# Legora Interview Prep Deck

Standalone reveal.js deck for the Legora Senior Software Engineer hiring-manager interview prep flow.

## Run

```sh
cd legacy/reveal-js/legora-interview-prep
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://127.0.0.1:5173/`. From the reveal.js repo-root dev server, the same source also renders at `/legora-interview-prep/` because the module entry is relative.

On May 8, 2026, `npm view reveal.js version` reports `latest` as `6.0.1`. The deck uses the current npm package and the ES-module API:

```js
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown";
```

## Prep Controls

- `s` = speaker view.
- `CTRL/CMD+Shift+F` = search.
- `Alt+click` / `Ctrl+click on Linux` = zoom.
- `Esc` = overview.
- `?view=scroll` = readable scroll mode for self-study.
- `?print-pdf` = PDF export.
- `?print-pdf&showNotes=separate-page` = PDF export with speaker notes on separate pages.
- `?menu=1` = optional slide outline via `reveal.js-menu`.

## Structure

- `data/deck.json` is the source of slide content, speaker notes, reveal.js feature markers, and per-slide source IDs.
- `data/sources.json` is the source registry used for slide source chips and URL validation.
- `data/schema.json` documents the supported deck data shape.
- `src/render-deck.js` renders the deck before `Reveal.initialize`.
- `src/load-plugins.js` keeps third-party plugins optional and URL-gated.

Default runtime plugins are official reveal.js built-ins only: Notes, Search, Highlight, Zoom, and Markdown. Math is not loaded because the deck has no equations or scoring formulas.

`reveal.js-menu@2.1.0` is installed but isolated behind `?menu=1`. The menu has no open button, no theme/transition panels, and is skipped in `?print-pdf` mode to avoid visual clutter and PDF export risk.

## Validate

```sh
npm run validate:data
npm run build
npm run check:sources
npm run test:deck
npm run test:visual
npm run verify
```

The checks cover data integrity, source URL reachability, reveal.js feature smoke tests, optional menu loading, scroll view, lightbox, PDF notes export, and desktop/mobile overflow.

## Source Notes

The content is adapted from `/Users/ww/Downloads/legora_interview_prep_applet.html` and refreshed with official Legora pages plus current agent-system guidance:

- Legora aOS press release, May 7, 2026:
  https://legora.com/newsroom/legora-introduces-the-legora-aos-the-agentic-operating-system-for-legal-work
- Graceview acquisition, May 6, 2026:
  https://legora.com/newsroom/legora-acquires-graceview-to-bring-real-time-regulatory-intelligence-to-legal-compliance-and-risk-teams
- Everlaw partnership, May 4, 2026:
  https://legora.com/newsroom/everlaw-and-legora-partner-to-create-end-to-end-ai-litigation-workflows
- Series D extension, Apr 30, 2026:
  https://legora.com/newsroom/legora-extends-series-d-with-additional-50-million-welcomes-atlassian-and-nventures-as-investors
- ARR and customer growth announcement, Apr 2, 2026:
  https://legora.com/newsroom/legal-teams-adoption-of-ai-propels-legora-past-100-million-in-annual-recurring-revenue
- Qura acquisition, Apr 23, 2026:
  https://legora.com/newsroom/legora-acquires-qura-to-build-the-world%E2%80%99s-leading-ai-native-legal-research-platform
- Legora security page:
  https://legora.com/security
- Senior Software Engineer, New York posting:
  https://jobs.ashbyhq.com/legora/3fcdc6ba-e35f-470e-823e-7c4563c933a2
- Anthropic, "Building effective agents":
  https://www.anthropic.com/engineering/building-effective-agents
- OpenAI eval best practices:
  https://developers.openai.com/api/docs/guides/evaluation-best-practices
- OpenAI Agents SDK guardrails and tracing:
  https://openai.github.io/openai-agents-python/guardrails/
  https://openai.github.io/openai-agents-python/tracing/
