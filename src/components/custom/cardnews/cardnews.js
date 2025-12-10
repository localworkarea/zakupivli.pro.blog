import "./cardnews.scss"


function adjustCardTextClamp() {
	// const cards = document.querySelectorAll('.card-news--t1, .card-news--t5, .card-news--t3');
	const cards = document.querySelectorAll('.card-news--t1, .card-news--t3, .card-news--t5, .card-news--t8');


	cards.forEach(card => {
		const text = card.querySelector('.card-news__text');
		if (!text) return;

		requestAnimationFrame(() => {
			const isT5 = card.classList.contains('card-news--t5');
			const isT3 = card.classList.contains('card-news--t3');
			const isT8 = card.classList.contains('card-news--t8');

			const picture = card.querySelector('.card-news__picture');
			const time = card.querySelector('.card-news__time');
			const tags = card.querySelector('.card-news__tags');
			const title = card.querySelector('.card-news__title');

			const textStyle = getComputedStyle(text);
			const textMarginTop = parseFloat(textStyle.marginTop || 0);

			let availableHeight = 0;

			// Универсальная функция расчёта занятого пространства
			function getOccupiedHeight(elements) {
				let total = 0;
				elements.forEach(el => {
					if (el) {
						const style = getComputedStyle(el);
						total += el.offsetHeight + parseFloat(style.marginBottom || 0);
					} else {
						// Компенсация при отсутствии элемента
						total += 8;
					}
				});
				return total;
			}

			// if (isT5 || isT3) {
			// 	// === Для card-news--t5 и card-news--t3 ===
			// 	const cardHeight = 230;
			// 	const occupiedHeight = getOccupiedHeight([time, tags, title]);
			// 	availableHeight = cardHeight - occupiedHeight - textMarginTop;
			// } 
			if (isT5 || isT3 || isT8) {
 		   // === Для card-news--t5, card-news--t3 и card-news--t8 ===
 		   const cardHeight = isT8 ? 205 : 230; 
 		   const occupiedHeight = getOccupiedHeight([time, tags, title]);
 		   availableHeight = cardHeight - occupiedHeight - textMarginTop;
			}		

			else {
				// === Для card-news--t1 ===
				const cardHeight = 488;
				const cardStyle = getComputedStyle(card);
				const paddingTop = parseFloat(cardStyle.paddingTop || 0);
				const paddingBottom = parseFloat(cardStyle.paddingBottom || 0);
				const cardPadding = paddingTop + paddingBottom;

				const pictureMarginBottom = picture ? parseFloat(getComputedStyle(picture).marginBottom || 0) : 0;
				const pictureHeight = 230 + pictureMarginBottom;

				const occupiedHeight = getOccupiedHeight([time, tags, title]);
				availableHeight = cardHeight - cardPadding - pictureHeight - occupiedHeight - textMarginTop;
			}

			// ============ card-news--t8: теги только в одну строку ============
		if (isT8 && tags) {
			// 1. Сохраняем оригинальные теги один раз
			if (!tags.dataset.original) {
				tags.dataset.original = tags.innerHTML;
			}
		
			// 2. Перед КАЖДЫМ пересчётом восстанавливаем полный набор тегов
			tags.innerHTML = tags.dataset.original;
		
			const tagItems = [...tags.querySelectorAll('[data-fls-tags]')];
			if (tagItems.length > 1) {
			
				const firstRowTop = tagItems[0].offsetTop;
				const ROW_TOLERANCE = 2; 
			
				let lastAllowedIndex = tagItems.length - 1;
			
				tagItems.forEach((tag, index) => {
					// если тег ушёл на следующую строку
					if (tag.offsetTop - firstRowTop > ROW_TOLERANCE && lastAllowedIndex === tagItems.length - 1) {
						lastAllowedIndex = index - 1;
					}
				});
			
				if (lastAllowedIndex < tagItems.length - 1) {
					if (lastAllowedIndex < 0) lastAllowedIndex = 0;
				
					tagItems.forEach((tag, index) => {
						if (index > lastAllowedIndex) tag.remove();
					});
				}
			}
		}



			let lineHeight = parseFloat(textStyle.lineHeight);
			if (!lineHeight || isNaN(lineHeight)) {
				const fontSize = parseFloat(textStyle.fontSize) || 14;
				lineHeight = fontSize * 1.7;
			}

			const EPSILON = 6;
			let lines = Math.floor((availableHeight + EPSILON) / lineHeight);
			lines = Math.max(1, lines);

			text.style.webkitLineClamp = lines;
		});
	});
}

window.addEventListener('load', () => {
	adjustCardTextClamp();
	
  let lastWidth = window.innerWidth;
  const resizeObserver = new ResizeObserver(entries => {
    requestAnimationFrame(() => {
      entries.forEach(entry => {
        const currentWidth = entry.contentRect.width;
        if (currentWidth !== lastWidth) {
          requestAnimationFrame(adjustCardTextClamp);
          lastWidth = currentWidth; 
        }
      });
    });
  });
  resizeObserver.observe(document.body);
});
