import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";

interface PageProps {
	params: Promise<{
		slug?: string[];
	}>;
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug = [] } = await params;
	const page = source.getPage(slug);

	if (!page) {
		return {
			title: "Not Found",
		};
	}

	return {
		description: page.data.description,
		title: page.data.title,
	};
}

export default async function Page({ params }: PageProps) {
	const { slug = [] } = await params;
	const page = source.getPage(slug);

	if (!page) {
		notFound();
	}

	const Mdx = page.data.body;

	return (
		<DocsPage toc={page.data.toc}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<Mdx components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	);
}
