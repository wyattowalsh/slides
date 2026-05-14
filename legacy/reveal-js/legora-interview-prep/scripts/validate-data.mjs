import { readFile } from "node:fs/promises";

const deck = JSON.parse(await readFile(new URL("../data/deck.json", import.meta.url), "utf8"));
const sources = JSON.parse(await readFile(new URL("../data/sources.json", import.meta.url), "utf8"));
const schema = JSON.parse(await readFile(new URL("../data/schema.json", import.meta.url), "utf8"));

const errors = [];
const sourceIds = new Set(Object.keys(sources));
const slideIds = new Set();

function assert(condition, message) {
	if (!condition) errors.push(message);
}

assert(deck.schemaVersion === schema.properties.schemaVersion.const, "Deck schemaVersion is not supported.");
assert(deck.meta && typeof deck.meta.title === "string", "Deck meta.title is required.");
assert(Array.isArray(deck.slides) && deck.slides.length > 0, "Deck must include slides.");

for (const [index, slide] of deck.slides.entries()) {
	const prefix = `Slide ${index + 1}${slide?.id ? ` (${slide.id})` : ""}`;

	assert(/^[a-z0-9-]+$/.test(slide.id || ""), `${prefix}: id must be kebab-case.`);
	assert(!slideIds.has(slide.id), `${prefix}: duplicate id.`);
	slideIds.add(slide.id);
	assert(typeof slide.menuTitle === "string" && slide.menuTitle.length > 0, `${prefix}: menuTitle is required.`);
	assert(Array.isArray(slide.html) && slide.html.length > 0, `${prefix}: html must be a non-empty array.`);
	assert(Array.isArray(slide.notes) && slide.notes.length > 0, `${prefix}: notes must be a non-empty array.`);

	for (const sourceId of slide.sourceIds || []) {
		assert(sourceIds.has(sourceId), `${prefix}: unknown source id ${sourceId}.`);
	}
}

const allHtml = deck.slides.flatMap((slide) => slide.html).join("\n");
const featureChecks = {
	"data-auto-animate": deck.slides.some((slide) => slide.attributes?.["data-auto-animate"] !== undefined),
	"data-preview-image": allHtml.includes("data-preview-image"),
	"r-fit-text": allHtml.includes("r-fit-text"),
	"r-stretch": allHtml.includes("r-stretch"),
	"r-stack": allHtml.includes("r-stack"),
	"r-frame": allHtml.includes("r-frame"),
	fragment: allHtml.includes("fragment"),
	"source-backed slides": deck.slides.filter((slide) => (slide.sourceIds || []).length > 0).length >= 8,
};

for (const [feature, present] of Object.entries(featureChecks)) {
	assert(present, `Missing expected reveal.js feature coverage: ${feature}.`);
}

for (const [sourceId, source] of Object.entries(sources)) {
	assert(typeof source.label === "string" && source.label.length > 0, `Source ${sourceId}: label is required.`);
	assert(typeof source.date === "string" && source.date.length > 0, `Source ${sourceId}: date is required.`);
	assert(/^https:\/\//.test(source.url), `Source ${sourceId}: url must be https.`);
}

if (errors.length > 0) {
	console.error(errors.map((error) => `- ${error}`).join("\n"));
	process.exit(1);
}

console.log(`Data OK: ${deck.slides.length} slides, ${sourceIds.size} sources.`);
