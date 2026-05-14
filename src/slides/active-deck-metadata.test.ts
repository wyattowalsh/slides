import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { activeDeckMetadata } from "@/slides/active-deck-metadata";

describe("activeDeckMetadata", () => {
	it("points at the active deck source file", () => {
		expect(activeDeckMetadata.sourcePath).toBe(
			"src/slides/LegoraInterviewPrep.tsx",
		);
		expect(existsSync(join(process.cwd(), activeDeckMetadata.sourcePath))).toBe(
			true,
		);
	});

	it("defines representative E2E states", () => {
		expect(activeDeckMetadata.testStates.initialHeading).toBeTruthy();
		expect(
			activeDeckMetadata.testStates.desktopHeadings.length,
		).toBeGreaterThan(0);
		expect(activeDeckMetadata.testStates.mobileSmoke.hash).toMatch(/^\/#\//);
		expect(activeDeckMetadata.testStates.verticalStack.hash).toMatch(/^\/#\//);
	});
});
