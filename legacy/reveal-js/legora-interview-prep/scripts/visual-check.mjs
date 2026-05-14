import { assert, openDeck, withDeckBrowser } from "./browser-harness.mjs";

async function checkViewport(browser, baseUrl, viewport, path = "") {
	const { page, errors } = await openDeck(browser, baseUrl, path);
	await page.setViewport(viewport);

	const stats = await page.evaluate(async () => {
		const issues = [];
		const slides = Array.from(document.querySelectorAll(".slides > section"));

		for (let index = 0; index < slides.length; index += 1) {
			window.__LEGORA_REVEAL__.slide(index);
			await new Promise((resolve) => requestAnimationFrame(resolve));
			window.__LEGORA_REVEAL__.layout();
			await new Promise((resolve) => setTimeout(resolve, 650));

			const slide = slides[index];
			const rect = slide.getBoundingClientRect();
			const overflowX = Math.ceil(slide.scrollWidth - slide.clientWidth);
			const overflowY = Math.ceil(slide.scrollHeight - slide.clientHeight);
			const visible = rect.width > 0 && rect.height > 0;

			if (!visible || overflowX > 3 || overflowY > 18) {
				issues.push({
					id: slide.dataset.slideId,
					overflowX,
					overflowY,
					width: Math.round(rect.width),
					height: Math.round(rect.height),
				});
			}
		}

		return {
			issues,
			documentOverflowX: Math.ceil(document.documentElement.scrollWidth - window.innerWidth),
		};
	});

	await page.close();

	assert(errors.length === 0, `${viewport.width}x${viewport.height}${path} console errors: ${errors.join(" | ")}`);
	assert(stats.documentOverflowX <= 3, `${viewport.width}x${viewport.height}${path} document has horizontal overflow.`);
	assert(
		stats.issues.length === 0,
		`${viewport.width}x${viewport.height}${path} slide overflow: ${JSON.stringify(stats.issues)}`
	);
}

await withDeckBrowser(async ({ browser, baseUrl }) => {
	await checkViewport(browser, baseUrl, { width: 1440, height: 900, deviceScaleFactor: 1 });
	await checkViewport(browser, baseUrl, { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }, "?view=scroll");
});

console.log("Visual checks OK.");
