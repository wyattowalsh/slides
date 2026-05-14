import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

describe("Card", () => {
	it("composes card sections with expected classes", () => {
		const { container } = render(
			<Card data-testid="card">
				<CardHeader data-testid="header">
					<CardTitle>Title</CardTitle>
				</CardHeader>
				<CardContent data-testid="content">Body</CardContent>
			</Card>,
		);

		expect(
			container.querySelector('[data-testid="card"]')?.className,
		).toContain("bg-card");
		expect(
			container.querySelector('[data-testid="header"]')?.className,
		).toContain("p-6");
		expect(container.querySelector("h3")?.className).toContain("text-2xl");
		expect(
			container.querySelector('[data-testid="content"]')?.className,
		).toContain("pt-0");
	});

	it("preserves consumer class names", () => {
		const { container } = render(
			<Card className="custom-card" data-testid="card" />,
		);

		expect(
			container.querySelector('[data-testid="card"]')?.className,
		).toContain("custom-card");
	});
});
