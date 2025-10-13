import "./cardnews.scss"

// function adjustCardTextClamp() {
// 	const cards = document.querySelectorAll('.card-news--t1');

// 	cards.forEach((card, i) => {
// 		const text = card.querySelector('.card-news__text');
// 		if (!text) return;

// 		requestAnimationFrame(() => {
// 			const picture = card.querySelector('.card-news__picture');
// 			const time = card.querySelector('.card-news__time');
// 			const tags = card.querySelector('.card-news__tags');
// 			const title = card.querySelector('.card-news__title');

// 			const cardStyle = getComputedStyle(card);
// 			const paddingTop = parseFloat(cardStyle.paddingTop || 0);
// 			const paddingBottom = parseFloat(cardStyle.paddingBottom || 0);
// 			const cardPadding = paddingTop + paddingBottom;

// 			// 💡 Фиксированная высота карточки и картинки
// 			const cardHeight = 488;
// 			const pictureMarginBottom = picture ? parseFloat(getComputedStyle(picture).marginBottom || 0) : 0;
// 			const pictureHeight = 230 + pictureMarginBottom;

// 			// Высота блоков до текста
// 			let occupiedHeight = 0;
// 			[time, tags, title].forEach(el => {
// 				if (el) {
// 					const style = getComputedStyle(el);
// 					occupiedHeight += el.offsetHeight + parseFloat(style.marginBottom || 0);

		
// 				}
// 			});

// 			const textStyle = getComputedStyle(text);
// 			const textMarginTop = parseFloat(textStyle.marginTop || 0);
// 			let availableHeight = cardHeight - cardPadding - pictureHeight - occupiedHeight - textMarginTop;

// 			let lineHeight = parseFloat(textStyle.lineHeight);
// 			if (!lineHeight || isNaN(lineHeight)) {
// 				const fontSize = parseFloat(textStyle.fontSize) || 14;
// 				lineHeight = fontSize * 1.7;
// 			}

// 			const EPSILON = 6;
// 			let lines = Math.floor((availableHeight + EPSILON) / lineHeight);
// 			lines = Math.max(1, lines);


// 			text.style.webkitLineClamp = lines;
// 		});
// 	});
// }



// function adjustCardTextClamp() {
// 	const cards = document.querySelectorAll('.card-news--t1, .card-news--t5, .card-news--t3');

// 	cards.forEach((card, i) => {
// 		const text = card.querySelector('.card-news__text');
// 		if (!text) return;

// 		requestAnimationFrame(() => {
// 			const isT5 = card.classList.contains('card-news--t5');
// 			const picture = card.querySelector('.card-news__picture');
// 			const time = card.querySelector('.card-news__time');
// 			const tags = card.querySelector('.card-news__tags');
// 			const title = card.querySelector('.card-news__title');

// 			const textStyle = getComputedStyle(text);
// 			const textMarginTop = parseFloat(textStyle.marginTop || 0);

// 			let availableHeight = 0;

// 			if (isT5) {
// 				// Для card-news--t5
// 				const cardHeight = 230;
// 				let occupiedHeight = 0;
// 				[time, tags, title].forEach(el => {
// 					if (el) {
// 						const style = getComputedStyle(el);
// 						occupiedHeight += el.offsetHeight + parseFloat(style.marginBottom || 0);
// 					}
// 				});
// 				availableHeight = cardHeight - occupiedHeight - textMarginTop;

// 			} else {
// 				// Для card-news--t1
// 				const cardStyle = getComputedStyle(card);
// 				const paddingTop = parseFloat(cardStyle.paddingTop || 0);
// 				const paddingBottom = parseFloat(cardStyle.paddingBottom || 0);
// 				const cardPadding = paddingTop + paddingBottom;

// 				const cardHeight = 488;
// 				const pictureMarginBottom = picture ? parseFloat(getComputedStyle(picture).marginBottom || 0) : 0;
// 				const pictureHeight = 230 + pictureMarginBottom;

// 				let occupiedHeight = 0;
// 				[time, tags, title].forEach(el => {
// 					if (el) {
// 						const style = getComputedStyle(el);
// 						occupiedHeight += el.offsetHeight + parseFloat(style.marginBottom || 0);
// 					}
// 				});
// 				availableHeight = cardHeight - cardPadding - pictureHeight - occupiedHeight - textMarginTop;
// 			}

// 			let lineHeight = parseFloat(textStyle.lineHeight);
// 			if (!lineHeight || isNaN(lineHeight)) {
// 				const fontSize = parseFloat(textStyle.fontSize) || 14;
// 				lineHeight = fontSize * 1.7;
// 			}

// 			const EPSILON = 6;
// 			let lines = Math.floor((availableHeight + EPSILON) / lineHeight);
// 			lines = Math.max(1, lines);

// 			text.style.webkitLineClamp = lines;
// 		});
// 	});
// }


function adjustCardTextClamp() {
	const cards = document.querySelectorAll('.card-news--t1, .card-news--t5, .card-news--t3');

	cards.forEach(card => {
		const text = card.querySelector('.card-news__text');
		if (!text) return;

		requestAnimationFrame(() => {
			const isT5 = card.classList.contains('card-news--t5');
			const isT3 = card.classList.contains('card-news--t3');
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
						total += 8; // можно подправить под визуал макета
					}
				});
				return total;
			}

			if (isT5 || isT3) {
				// === Для card-news--t5 и card-news--t3 ===
				const cardHeight = 230;
				const occupiedHeight = getOccupiedHeight([time, tags, title]);
				availableHeight = cardHeight - occupiedHeight - textMarginTop;
			} else {
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
