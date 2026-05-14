import { assert, openDeck, withDeckBrowser } from "./browser-harness.mjs";

await withDeckBrowser(async ({ browser, baseUrl }) => {
	const normal = await openDeck(browser, baseUrl);
	const normalStats = await normal.page.evaluate(() => ({
		title: document.title,
		slideCount: document.querySelectorAll(".slides > section").length,
		noteCount: document.querySelectorAll("aside.notes").length,
		sourceLinks: document.querySelectorAll(".source-chips a").length,
		hasDeprecatedDependencies: document.documentElement.innerHTML.includes("dependencies:"),
		hasFitText: Boolean(document.querySelector(".r-fit-text")),
		hasStretch: Boolean(document.querySelector(".r-stretch")),
		hasStack: Boolean(document.querySelector(".r-stack")),
		hasFrame: Boolean(document.querySelector(".r-frame")),
		hasLightboxTarget: Boolean(document.querySelector("[data-preview-image]")),
		hasAutoAnimate: Boolean(document.querySelector("[data-auto-animate]")),
		plugins: window.__LEGORA_DECK__.plugins,
	}));

	assert(normal.errors.length === 0, `Normal deck console errors: ${normal.errors.join(" | ")}`);
	assert(normalStats.title === "Legora Interview Prep Deck", "Unexpected document title.");
	assert(normalStats.slideCount >= 20, "Expected at least 20 top-level slides.");
	assert(normalStats.noteCount === normalStats.slideCount, "Every slide should have speaker notes.");
	assert(normalStats.sourceLinks >= 20, "Expected source chips on factual slides.");
	assert(!normalStats.hasDeprecatedDependencies, "Deck should not use deprecated dependencies config.");
	assert(normalStats.hasFitText && normalStats.hasStretch && normalStats.hasStack && normalStats.hasFrame, "Missing reveal layout helpers.");
	assert(normalStats.hasLightboxTarget, "Missing lightbox target.");
	assert(normalStats.hasAutoAnimate, "Missing auto-animate slides.");
	for (const plugin of ["markdown", "highlight", "notes", "search", "zoom"]) {
		assert(normalStats.plugins.includes(plugin), `Missing built-in plugin: ${plugin}.`);
	}
	await normal.page.close();

	const scroll = await openDeck(browser, baseUrl, "?view=scroll");
	const scrollStats = await scroll.page.evaluate(() => ({
		configView: window.__LEGORA_REVEAL__.getConfig().view,
		scrollClass: document.documentElement.className,
		pageCount: document.querySelectorAll(".scroll-page").length,
	}));
	assert(scroll.errors.length === 0, `Scroll deck console errors: ${scroll.errors.join(" | ")}`);
	assert(scrollStats.configView === "scroll", "Scroll view config was not enabled.");
	assert(scrollStats.pageCount > 0 || scrollStats.scrollClass.includes("scroll"), "Scroll view did not render scroll pages/classes.");
	await scroll.page.close();

	const pdf = await openDeck(browser, baseUrl, "?print-pdf&showNotes=separate-page");
	const pdfStats = await pdf.page.evaluate(() => ({
		printPdf: document.documentElement.classList.contains("print-pdf"),
		showNotes: window.__LEGORA_REVEAL__.getConfig().showNotes,
		menuLoaded: window.__LEGORA_REVEAL__.hasPlugin("menu"),
	}));
	assert(pdf.errors.length === 0, `PDF deck console errors: ${pdf.errors.join(" | ")}`);
	assert(pdfStats.printPdf, "print-pdf mode class was not enabled.");
	assert(pdfStats.showNotes === "separate-page", "Separate-page notes were not enabled.");
	assert(!pdfStats.menuLoaded, "Optional menu should stay out of PDF export.");
	await pdf.page.close();

	const menu = await openDeck(browser, baseUrl, "?menu=1");
	const menuStats = await menu.page.evaluate(async () => {
		await new Promise((resolve) => {
			if (document.querySelector(".slide-menu")) return resolve();
			document.querySelector(".reveal").addEventListener("menu-ready", resolve, { once: true });
		});

		return {
			hasPlugin: window.__LEGORA_REVEAL__.hasPlugin("menu"),
			hasMenu: Boolean(document.querySelector(".slide-menu")),
			openButton: Boolean(document.querySelector(".slide-menu-button")),
			optional: window.__LEGORA_DECK__.optional.menu,
		};
	});
	assert(menu.errors.length === 0, `Menu deck console errors: ${menu.errors.join(" | ")}`);
	assert(menuStats.hasPlugin && menuStats.hasMenu && menuStats.optional, "URL-gated menu did not initialize.");
	assert(!menuStats.openButton, "Menu open button should be disabled to avoid visual clutter.");
	await menu.page.close();

	const lightbox = await openDeck(browser, baseUrl);
	await lightbox.page.evaluate(async () => {
		const slides = Array.from(document.querySelectorAll(".slides > section"));
		const index = slides.findIndex((slide) => slide.dataset.slideId === "architecture-diagram");
		window.__LEGORA_REVEAL__.slide(index);
		await new Promise((resolve) => requestAnimationFrame(resolve));
		window.__LEGORA_REVEAL__.layout();
	});
	await lightbox.page.click("[data-preview-image]");
	await lightbox.page.waitForFunction(
		() =>
			Boolean(
				document.querySelector(".r-overlay-preview, .lightbox, .reveal-lightbox, .preview")
			),
		{ timeout: 5000 }
	);
	const lightboxOpen = await lightbox.page.evaluate(() =>
		Boolean(document.querySelector(".r-overlay-preview, .lightbox, .reveal-lightbox, .preview"))
	);
	assert(lightbox.errors.length === 0, `Lightbox deck console errors: ${lightbox.errors.join(" | ")}`);
	assert(lightboxOpen, "Lightbox did not open for architecture diagram.");
	await lightbox.page.close();
});

console.log("Deck smoke OK.");
