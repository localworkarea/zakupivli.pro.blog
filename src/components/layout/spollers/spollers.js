import { FLS, slideUp, slideDown, slideToggle, dataMediaQueries } from "@js/common/functions.js";

// Підключення базових стилів
import "./spollers.scss";

// export function spollers() {
// 	const spollersArray = document.querySelectorAll('[data-fls-spollers]');
// 	if (spollersArray.length > 0) {
// 		FLS(`_FLS_SPOLLERS_START`, spollersArray.length)

// 		// Подія кліку
// 		document.addEventListener("click", setSpollerAction);
// 		// Отримання звичайних слойлерів
// 		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
// 			return !item.dataset.flsSpollers.split(",")[0];
// 		});
// 		// Ініціалізація звичайних слойлерів
// 		if (spollersRegular.length) {
// 			initSpollers(spollersRegular);
// 		}
// 		// Отримання слойлерів з медіа-запитами
// 		let mdQueriesArray = dataMediaQueries(spollersArray, "flsSpollers");
// 		if (mdQueriesArray && mdQueriesArray.length) {
// 			mdQueriesArray.forEach(mdQueriesItem => {
// 				// Подія
// 				mdQueriesItem.matchMedia.addEventListener("change", function () {
// 					initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
// 				});
// 				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
// 			});
// 		}
// 		// Ініціалізація
// 		function initSpollers(spollersArray, matchMedia = false) {
// 			spollersArray.forEach(spollersBlock => {
// 				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
// 				if (matchMedia.matches || !matchMedia) {
// 					spollersBlock.classList.add('--spoller-init');
// 					initSpollerBody(spollersBlock);
// 				} else {
// 					spollersBlock.classList.remove('--spoller-init');
// 					initSpollerBody(spollersBlock, false);
// 				}
// 			});
// 		}
// 		// Робота з контентом
// 		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
// 			let spollerItems = spollersBlock.querySelectorAll('details');
// 			if (spollerItems.length) {
// 				//spollerItems = Array.from(spollerItems).filter(item => item.closest('[data-spollers]') === spollersBlock);
// 				spollerItems.forEach(spollerItem => {
// 					let spollerTitle = spollerItem.querySelector('summary');
// 					if (hideSpollerBody) {
// 						spollerTitle.removeAttribute('tabindex');
// 						if (!spollerItem.hasAttribute('data-fls-spollers-open')) {
// 							spollerItem.open = false;
// 							spollerTitle.nextElementSibling.hidden = true;
// 						} else {
// 							spollerTitle.classList.add('--spoller-active');
// 							spollerItem.open = true;
// 						}
// 					} else {
// 						spollerTitle.setAttribute('tabindex', '-1');
// 						spollerTitle.classList.remove('--spoller-active');
// 						spollerItem.open = true;
// 						spollerTitle.nextElementSibling.hidden = false;
// 					}
// 				});
// 			}
// 		}
// 		function setSpollerAction(e) {
// 			const el = e.target;
// 			if (el.closest('summary') && el.closest('[data-fls-spollers]')) {
// 				e.preventDefault();
// 				if (el.closest('[data-fls-spollers]').classList.contains('--spoller-init')) {
// 					const spollerTitle = el.closest('summary');
// 					const spollerBlock = spollerTitle.closest('details');
// 					const spollersBlock = spollerTitle.closest('[data-fls-spollers]');
// 					const oneSpoller = spollersBlock.hasAttribute('data-fls-spollers-one');
// 					const scrollSpoller = spollerBlock.hasAttribute('data-fls-spollers-scroll');
// 					const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
// 					if (!spollersBlock.querySelectorAll('.--slide').length) {
// 						if (oneSpoller && !spollerBlock.open) {
// 							hideSpollersBody(spollersBlock);
// 						}

// 						!spollerBlock.open ? spollerBlock.open = true : setTimeout(() => { spollerBlock.open = false }, spollerSpeed);

// 						spollerTitle.classList.toggle('--spoller-active');
// 						slideToggle(spollerTitle.nextElementSibling, spollerSpeed);

// 						if (scrollSpoller && spollerTitle.classList.contains('--spoller-active')) {
// 							const scrollSpollerValue = spollerBlock.dataset.flsSpollersScroll;
// 							const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
// 							const scrollSpollerNoHeader = spollerBlock.hasAttribute('data-fls-spollers-scroll-noheader') ? document.querySelector('.header').offsetHeight : 0;

// 							//setTimeout(() => {
// 							window.scrollTo(
// 								{
// 									top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
// 									behavior: "smooth",
// 								}
// 							);
// 							//}, spollerSpeed);
// 						}
// 					}
// 				}
// 			}
// 			// Закриття при кліку поза спойлером
// 			if (!el.closest('[data-fls-spollers]')) {
// 				const spollersClose = document.querySelectorAll('[data-fls-spollers-close]');
// 				if (spollersClose.length) {
// 					spollersClose.forEach(spollerClose => {
// 						const spollersBlock = spollerClose.closest('[data-fls-spollers]');
// 						const spollerCloseBlock = spollerClose.parentNode;
// 						if (spollersBlock.classList.contains('--spoller-init')) {
// 							const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
// 							spollerClose.classList.remove('--spoller-active');
// 							slideUp(spollerClose.nextElementSibling, spollerSpeed);
// 							setTimeout(() => { spollerCloseBlock.open = false }, spollerSpeed);
// 						}
// 					});
// 				}
// 			}
// 		}
// 		function hideSpollersBody(spollersBlock) {
// 			const spollerActiveBlock = spollersBlock.querySelector('details[open]');
// 			if (spollerActiveBlock && !spollersBlock.querySelectorAll('.--slide').length) {
// 				const spollerActiveTitle = spollerActiveBlock.querySelector('summary');
// 				const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
// 				spollerActiveTitle.classList.remove('--spoller-active');
// 				slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
// 				setTimeout(() => { spollerActiveBlock.open = false }, spollerSpeed);
// 			}
// 		}
// 	}
// }
// window.addEventListener('load', spollers);

export function spollers() {
	const spollersArray = document.querySelectorAll('[data-fls-spollers]');
	if (!spollersArray.length) return;

	document.addEventListener("click", setSpollerAction);

	function initSpollers(spollersArray) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock.classList.add('--spoller-init');
			initSpollerBody(spollersBlock);
			handleSpollersLimit(spollersBlock); // ← правильное место
		});
	}

	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		let spollerItems = spollersBlock.querySelectorAll('details');
		spollerItems.forEach(spollerItem => {
			const spollerTitle = spollerItem.querySelector('summary');
			if (hideSpollerBody) {
				spollerTitle.removeAttribute('tabindex');
				if (!spollerItem.hasAttribute('data-fls-spollers-open')) {
					spollerItem.open = false;
					if (spollerTitle.nextElementSibling)
						spollerTitle.nextElementSibling.hidden = true;
				} else {
					spollerTitle.classList.add('--spoller-active');
					spollerItem.open = true;
				}
			} else {
				spollerTitle.setAttribute('tabindex', '-1');
				spollerTitle.classList.remove('--spoller-active');
				spollerItem.open = true;
				if (spollerTitle.nextElementSibling)
					spollerTitle.nextElementSibling.hidden = false;
			}
		});
	}

	// === 🔹 Новый корректный блок ограничения ===
	function handleSpollersLimit(spollersBlock) {
		const limit = parseInt(spollersBlock.dataset.flsSpollers);
		if (!limit || isNaN(limit)) return;

		const details = [...spollersBlock.querySelectorAll('details')];
		if (!details.length) return;

		// Ищем/создаём кнопку ВНЕ details
		let btn = spollersBlock.querySelector('[data-fls-buttons]');
		if (!btn) {
			btn = document.createElement('a');
			btn.href = '#';
			btn.className = 'customer-hero__link btn btn--fw btn--green mt-2';
			btn.setAttribute('data-fls-buttons', '');
			btn.setAttribute('aria-label', 'показати всі інструкції');
			btn.textContent = 'Показати всі інструкції';
			// Добавляем строго ПОСЛЕ всех details
			spollersBlock.append(btn);
		}

		// функция применения лимита
		const applyLimit = (showAll = false) => {
			details.forEach((el, i) => {
				el.hidden = !showAll && i >= limit;
			});
		};

		// начальное состояние
		if (details.length <= limit) {
			btn.style.display = 'none';
			applyLimit(true);
		} else {
			btn.style.display = '';
			applyLimit(false);
		}

		// клик по кнопке
		btn.addEventListener('click', e => {
			e.preventDefault();
			const expanded = btn.classList.toggle('--expanded');
			if (expanded) {
				applyLimit(true);
				btn.textContent = 'Сховати інструкції';
				btn.setAttribute('aria-label', 'сховати інструкції');
			} else {
				applyLimit(false);
				btn.textContent = 'Показати всі інструкції';
				btn.setAttribute('aria-label', 'показати всі інструкції');
				spollersBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.closest('summary') && el.closest('[data-fls-spollers]')) {
			e.preventDefault();
			const spollerTitle = el.closest('summary');
			const spollerBlock = spollerTitle.closest('details');
			const spollersBlock = spollerTitle.closest('[data-fls-spollers]');
			const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed
				? parseInt(spollersBlock.dataset.flsSpollersSpeed)
				: 500;

			if (!spollersBlock.querySelectorAll('.--slide').length) {
				!spollerBlock.open
					? (spollerBlock.open = true)
					: setTimeout(() => {
						spollerBlock.open = false;
					}, spollerSpeed);

				spollerTitle.classList.toggle('--spoller-active');
				slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
			}
		}
	}

	initSpollers(spollersArray);
}
window.addEventListener('load', spollers);
