function setAttributes(element, attributes = {}) {
	Object.entries(attributes).forEach(([name, value]) => {
		element.setAttribute(name, value);
	});
}

function renderSourceChips(sourceIds = [], sources) {
	if (sourceIds.length === 0) return "";

	return `
		<nav class="source-chips" aria-label="Slide sources">
			${sourceIds
				.map((sourceId) => {
					const source = sources[sourceId];
					if (!source) {
						throw new Error(`Unknown source id: ${sourceId}`);
					}

					return `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}<span>${source.date}</span></a>`;
				})
				.join("")}
		</nav>
	`;
}

function renderNotes(notes) {
	return `<aside class="notes">${notes.map((note) => `<p>${note}</p>`).join("")}</aside>`;
}

export function renderDeck(container, deck, sources) {
	if (!container) {
		throw new Error("Missing .slides container");
	}

	container.innerHTML = "";

	deck.slides.forEach((slide, index) => {
		const section = document.createElement("section");
		section.dataset.slideId = slide.id;
		section.dataset.menuTitle = slide.menuTitle;
		section.dataset.slideIndex = String(index + 1);

		if (slide.classes) {
			section.classList.add(...slide.classes);
		}

		setAttributes(section, slide.attributes);

		section.innerHTML = [
			slide.html.join("\n"),
			renderSourceChips(slide.sourceIds, sources),
			renderNotes(slide.notes),
		].join("\n");

		container.appendChild(section);
	});

	return {
		slideCount: deck.slides.length,
		sourceCount: Object.keys(sources).length,
	};
}
