function getCalendarLocale() {
  const lang = document.documentElement.lang;
  if (lang === 'uk') {
    return {
      title: 'Календар подій',
      months: ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'],
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
      noEvents: 'Немає подій',
    };
  } else if (lang === 'ru') {
    return {
      title: 'Календарь событий',
      months: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      noEvents: 'Нет событий',
    };
  } else {
    return {
      title: 'Events Calendar',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      noEvents: 'No events',
    };
  }
}
