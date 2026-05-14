import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
	it("defaults native buttons to type=button", () => {
		render(<Button>Do not submit</Button>);

		expect(
			screen
				.getByRole("button", { name: "Do not submit" })
				.getAttribute("type"),
		).toBe("button");
	});

	it("preserves explicit native button type", () => {
		render(<Button type="submit">Submit</Button>);

		expect(
			screen.getByRole("button", { name: "Submit" }).getAttribute("type"),
		).toBe("submit");
	});

	it("does not add button-only attributes when rendering as a child", () => {
		render(
			<Button asChild>
				<a href="/docs">Docs</a>
			</Button>,
		);

		const link = screen.getByRole("link", { name: "Docs" });

		expect(link.getAttribute("href")).toBe("/docs");
		expect(link.getAttribute("type")).toBeNull();
	});
});
