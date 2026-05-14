import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge, badgeVariants } from "./badge";

describe("Badge", () => {
	it("renders default variant classes", () => {
		render(<Badge>Default</Badge>);

		const badge = screen.getByText("Default");

		expect(badge.className).toContain("bg-primary");
		expect(badge.className).toContain("text-primary-foreground");
	});

	it("merges className through the variant helper", () => {
		expect(
			badgeVariants({ className: "tracking-wide", variant: "outline" }),
		).toContain("tracking-wide");
	});
});
