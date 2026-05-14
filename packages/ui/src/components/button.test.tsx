import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
	it("defaults native buttons to type=button", () => {
		const { container } = render(<Button>Do not submit</Button>);

		expect(container.querySelector("button")?.getAttribute("type")).toBe(
			"button",
		);
	});

	it("preserves explicit native button type", () => {
		const { container } = render(<Button type="submit">Submit</Button>);

		expect(container.querySelector("button")?.getAttribute("type")).toBe(
			"submit",
		);
	});

	it("does not add button-only attributes when rendering as a child", () => {
		const { container } = render(
			<Button asChild>
				<a href="/docs">Docs</a>
			</Button>,
		);

		const link = container.querySelector("a");

		expect(link?.getAttribute("href")).toBe("/docs");
		expect(link?.getAttribute("type")).toBeNull();
	});

	it("maps disabled asChild buttons to accessible inert links", () => {
		const onClick = vi.fn();

		const { container } = render(
			<Button asChild disabled onClick={onClick}>
				<a href="/docs">Docs</a>
			</Button>,
		);

		const link = container.querySelector("a");

		link?.click();

		expect(link?.getAttribute("aria-disabled")).toBe("true");
		expect(link?.getAttribute("data-disabled")).toBe("true");
		expect(link?.getAttribute("disabled")).toBeNull();
		expect(link?.getAttribute("tabindex")).toBe("-1");
		expect(onClick).not.toHaveBeenCalled();
	});
});
