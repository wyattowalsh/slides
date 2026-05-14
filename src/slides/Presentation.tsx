import { Badge, Card, CardContent, CardHeader, CardTitle } from "@workspace/ui";
import { Code, Deck, Fragment, Markdown, Slide, Stack } from "@revealjs/react";
import { revealConfig } from "@/lib/reveal-config";
import { revealPlugins } from "@/lib/reveal-plugins";

const markdownExample = `
## Markdown slides

React \`Markdown\` renders reveal-compatible markdown directly.

--

## Vertical markdown

- Split vertical slides with \`--\`
- Keep the Reveal Markdown plugin out of defaults

---

## Speaker notes

Notes:
This note is available in speaker view.
`;

const codeExample = `
import { Deck, Slide } from '@revealjs/react';
import { revealConfig } from '@/lib/reveal-config';

export function Presentation() {
  return (
    <Deck config={revealConfig} plugins={revealPlugins}>
      <Slide>Ship readable decks.</Slide>
    </Deck>
  );
}
`;

export function Presentation() {
	return (
		<Deck config={revealConfig} plugins={revealPlugins}>
			<Slide backgroundGradient="linear-gradient(135deg, #111827 0%, #312e81 55%, #6d28d9 100%)">
				<div className="mx-auto max-w-5xl text-left">
					<Badge
						variant="secondary"
						className="mb-8 text-base uppercase tracking-[0.35em]"
					>
						Reveal.js React Workspace
					</Badge>
					<h1 className="text-balance text-7xl font-black tracking-tight text-white">
						Build slide decks as typed React components.
					</h1>
					<p className="mt-8 max-w-3xl text-3xl leading-snug text-violet-100">
						Tailwind CSS v4, shadcn-style primitives, Fumadocs guidance, and a
						small plugin surface.
					</p>
				</div>
			</Slide>

			<Slide backgroundColor="#0f172a" transition="fade">
				<div className="grid grid-cols-3 gap-6 text-left">
					<Fragment asChild>
						<Card className="border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur">
							<CardHeader>
								<CardTitle>Author</CardTitle>
							</CardHeader>
							<CardContent>
								Use `Slide`, `Stack`, `Fragment`, `Code`, and `Markdown` from
								`@revealjs/react`.
							</CardContent>
						</Card>
					</Fragment>
					<Fragment asChild>
						<Card className="border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur">
							<CardHeader>
								<CardTitle>Style</CardTitle>
							</CardHeader>
							<CardContent>
								Use Tailwind v4 tokens and reusable primitives from
								`packages/ui`.
							</CardContent>
						</Card>
					</Fragment>
					<Fragment asChild>
						<Card className="border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur">
							<CardHeader>
								<CardTitle>Validate</CardTitle>
							</CardHeader>
							<CardContent>
								Run build, static Reveal validation, docs build, and Playwright
								smoke tests.
							</CardContent>
						</Card>
					</Fragment>
				</div>
			</Slide>

			<Stack>
				<Slide backgroundColor="#111827">
					<h2>Vertical stacks</h2>
					<p>Group related details without flattening the main story arc.</p>
				</Slide>
				<Slide backgroundColor="#111827">
					<h2>Fragments</h2>
					<ul>
						<Fragment as="li">First reveal a claim.</Fragment>
						<Fragment as="li">Then reveal the evidence.</Fragment>
						<Fragment as="li" animation="highlight-blue">
							Finish with the takeaway.
						</Fragment>
					</ul>
				</Slide>
			</Stack>

			<Slide backgroundColor="#020617">
				<h2>Code stays copyable</h2>
				<Code language="tsx" lineNumbers="1-3|5-9" code={codeExample} />
			</Slide>

			<Markdown verticalSeparator="^\\n--\\n$">{markdownExample}</Markdown>

			<Slide backgroundColor="#0b1120" autoAnimate>
				<h2 data-id="auto-title">Auto-animate</h2>
				<p data-id="auto-copy">
					Use matching `data-id` values across adjacent slides.
				</p>
			</Slide>

			<Slide backgroundColor="#0b1120" autoAnimate>
				<h2 data-id="auto-title" className="text-violet-200">
					Auto-animate
				</h2>
				<p data-id="auto-copy" className="text-4xl text-violet-100">
					Keep motion declarative and local to slide markup.
				</p>
			</Slide>

			<Slide backgroundColor="#111827">
				<h2>Lightbox-ready media</h2>
				<a href="https://revealjs.com/lightbox/" data-preview-link>
					Open the Reveal lightbox docs in a preview overlay
				</a>
				<aside className="notes">
					Use built-in lightbox attributes before adding media plugins.
				</aside>
			</Slide>

			<Slide backgroundGradient="linear-gradient(135deg, #111827 0%, #047857 100%)">
				<h2>Next step</h2>
				<p>Document conventions in Fumadocs and keep plugin defaults boring.</p>
			</Slide>
		</Deck>
	);
}
