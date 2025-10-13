import "./newsbody.scss"

document.addEventListener('DOMContentLoaded', () => {
	const newsBodies = document.querySelectorAll('[data-fls-newsbody]');

	newsBodies.forEach(body => {
		const content = body.querySelector('[data-news-content]');
		const nav = body.querySelector('[data-news-nav]');
		if (!content || !nav) return;

		const more = nav.querySelector('[data-news-more]');
		const pagination = nav.querySelector('[data-news-pagination]');
		const moreBtn = more ? more.querySelector('[data-news-more] button, [data-fls-buttons]') : null;

		const cards = content.querySelectorAll('[data-fls-cardnews]');
		const cardsArray = Array.from(cards);

		// 🔧 Берём значение из data-news-content, по умолчанию 8
		const VISIBLE_COUNT = parseInt(content.dataset.newsContent, 10) || 8;

		function updateView() {
			if (cardsArray.length <= VISIBLE_COUNT) {
				// Если карточек меньше или равно порогу — скрываем кнопку, показываем пагинацию
				if (more) more.hidden = true;
				if (pagination) pagination.hidden = false;
			} else {
				// Если больше — показываем кнопку, скрываем пагинацию и обрезаем видимые карточки
				if (more) more.hidden = false;
				if (pagination) pagination.hidden = true;
				cardsArray.forEach((card, index) => {
					card.style.display = index < VISIBLE_COUNT ? '' : 'none';
				});
			}
		}

		updateView();

		if (moreBtn) {
			moreBtn.addEventListener('click', () => {
				// Показываем все карточки при клике
				cardsArray.forEach(card => (card.style.display = ''));
				if (more) more.hidden = true;
				if (pagination) pagination.hidden = false;
			});
		}
	});
});
