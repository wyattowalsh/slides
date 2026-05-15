import Link from "next/link";
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workspace/ui";
import { deckUrl } from "@/lib/deck-url";

const links = [
	{
		href: "/docs/getting-started",
		title: "Getting Started",
		copy: "Install dependencies and run the deck or docs site.",
	},
	{
		href: "/docs/authoring-slides",
		title: "Authoring Slides",
		copy: "Use official @revealjs/react components and Reveal attributes.",
	},
	{
		href: "/docs/reveal-plugins",
		title: "Plugin Policy",
		copy: "Keep defaults small; document opt-in plugins before adding them.",
	},
];

export default function HomePage() {
	return (
		<main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20">
			<Badge className="mb-8" variant="secondary">
				Reveal.js workspace
			</Badge>
			<section className="max-w-4xl">
				<h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl">
					Slides that stay maintainable.
				</h1>
				<p className="mt-6 text-xl leading-8 text-fd-muted-foreground">
					This repo keeps the deck at the root, documentation in Fumadocs, and
					shared UI primitives in one small workspace.
				</p>
				<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
					<Button asChild size="lg">
						<Link className="w-full sm:w-auto" href="/docs">
							Read the docs
						</Link>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link className="w-full sm:w-auto" href={deckUrl}>
							Open local deck
						</Link>
					</Button>
				</div>
			</section>
			<section aria-labelledby="docs-shortcuts-heading" className="mt-16">
				<h2 className="sr-only" id="docs-shortcuts-heading">
					Documentation shortcuts
				</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{links.map((link) => (
						<Card key={link.href}>
							<CardHeader>
								<CardTitle>{link.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm text-fd-muted-foreground">
									{link.copy}
								</p>
								<Link className="font-medium text-fd-primary" href={link.href}>
									Open {link.title}
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
			</section>
		</main>
	);
}
