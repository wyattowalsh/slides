import { readFile } from "node:fs/promises";

const sources = JSON.parse(await readFile(new URL("../data/sources.json", import.meta.url), "utf8"));
const timeoutMs = 15000;
const errors = [];

async function checkSource([sourceId, source]) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(source.url, {
			method: "GET",
			redirect: "follow",
			signal: controller.signal,
			headers: {
				"User-Agent": "legora-interview-prep-source-check/1.0",
				Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
			},
		});

		if (!response.ok) {
			errors.push(`${sourceId}: ${response.status} ${response.statusText} ${source.url}`);
		}
	} catch (error) {
		errors.push(`${sourceId}: ${error.name === "AbortError" ? "timeout" : error.message} ${source.url}`);
	} finally {
		clearTimeout(timeout);
	}
}

await Promise.all(Object.entries(sources).map(checkSource));

if (errors.length > 0) {
	console.error(errors.map((error) => `- ${error}`).join("\n"));
	process.exit(1);
}

console.log(`Sources OK: ${Object.keys(sources).length} URLs reachable.`);
