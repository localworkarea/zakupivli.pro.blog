import { addTouchAttr, addLoadedAttr, isMobile, slideUp, slideDown, slideToggle, FLS } from "@js/common/functions.js"
import "./filters.scss"

document.addEventListener("DOMContentLoaded", () => {
	const filtersWrapper = document.querySelector("[data-fls-filters]");
	if (!filtersWrapper) return;

	const filterButtons = filtersWrapper.querySelectorAll("[data-filter]");
	const filterDropdowns = filtersWrapper.querySelectorAll("[data-filter-dropdown]");
	const ANIM_DURATION = 300;

	// --- 1. Закрываем все dropdown при инициализации ---
	filterDropdowns.forEach(dropdown => {
		dropdown.hidden = true;
	});

	let activeDropdown = null;

	// --- 2. Медиа-запрос ---
	const mq = window.matchMedia("(max-width: 48.061em)");

	function handleFilterClick(button, dropdown) {
		// === Мобильная логика (меньше 48.061em) ===
		if (mq.matches) {
			// просто переключаем текущее, не закрывая другие
			slideToggle(dropdown, ANIM_DURATION);
			return;
		}

		// === Десктопная логика (открыт только один) ===
		if (activeDropdown === dropdown) {
			slideUp(dropdown, ANIM_DURATION);
			activeDropdown = null;
			return;
		}

		if (activeDropdown && activeDropdown !== dropdown) {
			slideUp(activeDropdown, ANIM_DURATION);
		}

		slideDown(dropdown, ANIM_DURATION);
		activeDropdown = dropdown;
	}

	// --- 3. Обработка клика по кнопкам фильтров ---
	filterButtons.forEach(button => {
		button.addEventListener("click", e => {
			e.stopPropagation();

			const key = button.dataset.filter;
			const dropdown = filtersWrapper.querySelector(`[data-filter-dropdown="${key}"]`);
			if (!dropdown) return;

			handleFilterClick(button, dropdown);
		});
	});

	// --- 4. Клик вне фильтров — закрыть всё (только на десктопе) ---
	document.addEventListener("click", e => {
		if (!filtersWrapper.contains(e.target) && !mq.matches) {
			if (activeDropdown) {
				slideUp(activeDropdown, ANIM_DURATION);
				activeDropdown = null;
			}
		}
	});

	// --- 5. Закрываем при клике на кнопку "Вибрати" ---
	filtersWrapper.addEventListener("click", e => {
		const applyBtn = e.target.closest(".filter-dropdown__apply");
		if (applyBtn) {
			const dropdown = applyBtn.closest("[data-filter-dropdown]");
			if (dropdown) {
				slideUp(dropdown, ANIM_DURATION);
				if (activeDropdown === dropdown) activeDropdown = null;
			}
		}
	});

	// --- 6. Подсчёт выбранных чекбоксов и управление .filters__applied ---
	filterDropdowns.forEach(dropdown => {
		const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
		const key = dropdown.dataset.filterDropdown;
		const button = filtersWrapper.querySelector(`[data-filter="${key}"]`);

		if (!button || !checkboxes.length) return;

		function updateCountAndApplied() {
			const checked = dropdown.querySelectorAll('input[type="checkbox"]:checked');
			let counter = button.querySelector(".filters__count");

			// === Обновляем число ===
			if (checked.length > 0) {
				if (!counter) {
					counter = document.createElement("span");
					counter.className = "filters__count";
					button.appendChild(counter);
				}
				counter.textContent = checked.length;
			} else if (counter) {
				counter.remove();
			}

			// === Управляем блоком .filters__applied ===
			let applied = filtersWrapper.querySelector(".filters__applied");

			// Если есть выбранные чекбоксы — создаем общий контейнер при необходимости
			if (checked.length > 0 && !applied) {
				applied = document.createElement("div");
				applied.className = "filters__applied";
				applied.innerHTML = `
					<div class="filters__applied-title">Застосовані фільтри</div>
					<button type="button" class="filters__reset btn btn--fill-gray">Скинути фільтри</button>
				`;
				filtersWrapper.querySelector(".filters__body").appendChild(applied);
				filtersWrapper.querySelector(".filters__reset").addEventListener("click", resetAllFilters);
			}

			// === Обновляем/создаем группу ===
			if (checked.length > 0) {
				let group = applied?.querySelector(`.filters__applied-group[data-group="${key}"]`);
				if (!group && applied) {
					group = document.createElement("div");
					group.className = "filters__applied-group";
					group.dataset.group = key;

					const clone = button.cloneNode(true);
					clone.querySelector(".filters__count")?.remove();
					const labelText = clone.textContent.trim();

					group.innerHTML = `<div class="filters__applied-label">${labelText}:</div>`;
					applied.insertBefore(group, applied.querySelector(".filters__reset"));
				}

				if (group) group.querySelectorAll(".filters__tag").forEach(tag => tag.remove());
				checked.forEach(ch => {
					const tag = document.createElement("div");
					tag.className = "filters__tag";
					tag.textContent = ch.value;

					const removeBtn = document.createElement("button");
					removeBtn.type = "button";
					removeBtn.className = "filters__tag-remove";
					removeBtn.setAttribute("aria-label", "Видалити");
					removeBtn.textContent = "×";

					tag.appendChild(removeBtn);
					group.appendChild(tag);

					removeBtn.addEventListener("click", () => {
						ch.checked = false;
						updateCountAndApplied();
					});
				});
			} else {
				const group = applied?.querySelector(`.filters__applied-group[data-group="${key}"]`);
				group?.remove();
			}

			const totalChecked = filtersWrapper.querySelectorAll('input[type="checkbox"]:checked').length;
			if (applied && totalChecked === 0) {
				applied.remove();
			}
		}

		checkboxes.forEach(ch => {
			ch.addEventListener("change", updateCountAndApplied);
		});

		updateCountAndApplied();
	});

	// --- 7. Сброс всех фильтров ---
	function resetAllFilters() {
		filterDropdowns.forEach(dropdown => {
			const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
			checkboxes.forEach(ch => (ch.checked = false));

			const key = dropdown.dataset.filterDropdown;
			const button = filtersWrapper.querySelector(`[data-filter="${key}"]`);
			const counter = button.querySelector(".filters__count");
			if (counter) counter.remove();
		});

		const applied = filtersWrapper.querySelector(".filters__applied");
		if (applied) applied.remove();
	}


  	// --- 8. Мобильное скрытие/открытие filters__body ---
	const toggleBtn = filtersWrapper.querySelector(".filters__hide");
	const filtersBody = filtersWrapper.querySelector(".filters__body");

	if (toggleBtn && filtersBody) {
		const mq = window.matchMedia("(max-width: 48.061em)");
		let isOpen = false;

		function initMobileState() {
			if (mq.matches) {
				// Закрываем без анимации при инициализации
				filtersBody.hidden = true;
				isOpen = false;
				updateButtonState();
			} else {
				// При возвращении на десктоп — всегда показываем блок
				filtersBody.hidden = false;
				isOpen = true;
				resetButtonState();
			}
		}

		function updateButtonState() {
			const spans = toggleBtn.querySelectorAll("span");
			if (spans.length >= 2) {
				spans[0].style.display = isOpen ? "none" : "";
				spans[1].style.display = isOpen ? "" : "none";
			}
		}

		function resetButtonState() {
			const spans = toggleBtn.querySelectorAll("span");
			if (spans.length >= 2) {
				spans[0].style.display = "";
				spans[1].style.display = "none";
			}
		}

		toggleBtn.addEventListener("click", e => {
			if (!mq.matches) return; // только на мобилке

			e.preventDefault();
			if (isOpen) {
				slideUp(filtersBody, 300);
				isOpen = false;
			} else {
				slideDown(filtersBody, 300);
				isOpen = true;
			}
			updateButtonState();
		});

		// Инициализация при загрузке
		initMobileState();

		// Обновление при ресайзе (смена брейкпоинта)
		mq.addEventListener("change", initMobileState);
	}


});
