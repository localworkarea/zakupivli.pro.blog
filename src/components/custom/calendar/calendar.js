// import fetchCalendarData from '../../../files/calendar-api.js';
// import CALENDAR_DATA_URL from '../../../files/calendar-path.js';
// import getCalendarLocale from '../../../files/calendar-locale.js';
import './calendar.scss';

//    const [{ default: fetchCalendarData }, { default: CALENDAR_DATA_URL }, { default: getCalendarLocale }] = await Promise.all([
//     import('/files/calendar-api.js'),
//     import('/files/calendar-path.js'),
//     import('/files/calendar-locale.js'),
//   ]);

// const LOCALIZATION = getCalendarLocale();

document.addEventListener('DOMContentLoaded', async () => {
    const [{ default: fetchCalendarData }, { default: CALENDAR_DATA_URL }, { default: getCalendarLocale }] = await Promise.all([
    import('/files/calendar-api.js'),
    import('/files/calendar-path.js'),
    import('/files/calendar-locale.js'),
  ]);

  const LOCALIZATION = getCalendarLocale();
  const calendarEl = document.querySelector('[data-fls-calendar]');
  if (!calendarEl) return;

  const calendarData = await fetchCalendarData(CALENDAR_DATA_URL);
  let currentDate = new Date();

  // --- СОЗДАНИЕ СТАТИЧЕСКОЙ СТРУКТУРЫ ---
  const headerEl = document.createElement('div');
  headerEl.className = 'calendar__header';
  headerEl.innerHTML = `
    <h2 class="calendar__title">${LOCALIZATION.title}</h2>
    <div class="calendar__nav">
      <span class="calendar__month-year"><strong></strong></span>
      <div class="calendar__btns">
        <button data-prev class="--icon-arrow"></button>
        <button data-next class="--icon-arrow"></button>
      </div>
    </div>
  `;

  const gridEl = document.createElement('div');
  gridEl.className = 'calendar__grid';

  const weekdaysEl = document.createElement('div');
  weekdaysEl.className = 'calendar__weekdays';
  LOCALIZATION.weekdays.forEach(day => {
    const el = document.createElement('div');
    el.className = 'calendar__weekday';
    el.textContent = day;
    weekdaysEl.appendChild(el);
  });

  const daysContainer = document.createElement('div');
  daysContainer.className = 'calendar__days';

  gridEl.appendChild(weekdaysEl);
  gridEl.appendChild(daysContainer);

  const eventsWrapper = document.createElement('div');
  eventsWrapper.className = 'calendar__events';

  const eventsList = document.createElement('ul');
  eventsList.className = 'calendar__list';
  eventsWrapper.appendChild(eventsList);

  // Сохраняем ссылку
  const linkEl = calendarEl.querySelector('.calendar__link');

  let calendarBody = calendarEl.querySelector('.calendar__body');
  if (!calendarBody) {
    calendarBody = document.createElement('div');
    calendarBody.className = 'calendar__body';
    calendarEl.insertBefore(calendarBody, linkEl); // перед ссылкой
  }
  
  calendarBody.innerHTML = '';
  calendarBody.appendChild(headerEl);
  calendarBody.appendChild(gridEl);
  calendarBody.appendChild(eventsWrapper);


  const monthYearEl = headerEl.querySelector('.calendar__month-year');

  // --- ОСНОВНОЙ РЕНДЕР ---
  function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstWeekday = (firstDay.getDay() + 6) % 7;

    // Заголовок
    monthYearEl.innerHTML = `<strong>${LOCALIZATION.months[month]}</strong> ${year}`;

    // Сброс дней
    daysContainer.innerHTML = '';

    // Пустые ячейки
    for (let i = 0; i < firstWeekday; i++) {
      const empty = document.createElement('div');
      empty.className = 'calendar__day calendar__day--empty';
      daysContainer.appendChild(empty);
    }

    const datesWithEvents = calendarData.map(ev => ev.date);

    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = String(d).padStart(2, '0');
      const monthStr = String(month + 1).padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;

      const dayEl = document.createElement('div');
      dayEl.className = 'calendar__day';
      dayEl.textContent = d;
      dayEl.dataset.date = dateStr;

      if (datesWithEvents.includes(dateStr)) {
        dayEl.classList.add('calendar__day--event');
      }

      dayEl.addEventListener('click', () => {
        renderEventsForDate(dateStr);
      });

      daysContainer.appendChild(dayEl);
    }

    renderMonthEvents(year, month);
  }

  // --- СОБЫТИЯ НА МЕСЯЦ ---
  function renderMonthEvents(year, month) {
    eventsList.innerHTML = '';
    const monthStr = String(month + 1).padStart(2, '0');
    const filtered = calendarData.filter(ev => ev.date.startsWith(`${year}-${monthStr}`));

    if (filtered.length === 0) {
      eventsList.innerHTML = `<li class="calendar__item">${LOCALIZATION.noEvents}</li>`;
      return;
    }

    for (const ev of filtered) {
      const li = document.createElement('li');
      li.className = 'calendar__item';

      const a = document.createElement('a');
      a.className = 'calendar__event';
      a.href = ev.link || '#';
      a.innerHTML = `<strong>${ev.dayName} ${ev.day} ${ev.monty}, ${ev.time}</strong><br>${ev.title}`;
      li.appendChild(a);

      eventsList.appendChild(li);
    }
  }

  // --- СОБЫТИЯ НА КОНКРЕТНЫЙ ДЕНЬ ---
  function renderEventsForDate(dateStr) {
    eventsList.innerHTML = '';
    const events = calendarData.filter(ev => ev.date === dateStr);

    if (events.length === 0) {
      eventsList.innerHTML = `<li class="calendar__item">${LOCALIZATION.noEvents}</li>`;
      return;
    }

    for (const ev of events) {
      const li = document.createElement('li');
      li.className = 'calendar__item';

      const a = document.createElement('a');
      a.className = 'calendar__event';
      a.href = ev.link || '#';
      a.innerHTML = `<strong>${ev.dayName} ${ev.day} ${ev.monty}, ${ev.time}</strong><br>${ev.title}`;
      li.appendChild(a);

      eventsList.appendChild(li);
    }
  }

  // --- КНОПКИ ПЕРЕКЛЮЧЕНИЯ ---
  const prevBtn = headerEl.querySelector('[data-prev]');
  const nextBtn = headerEl.querySelector('[data-next]');

  prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
  });

  // --- ПЕРВИЧНЫЙ ЗАПУСК ---
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
