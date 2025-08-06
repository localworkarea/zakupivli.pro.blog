const LOCALES = {
  ua: {
    title: 'Календар заходів',
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    weekdays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'],
    noEvents: 'Немає подій'
  },
  ru: {
    title: 'Календарь событий',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    noEvents: 'Нет событий'
  },
  en: {
    title: 'Event Calendar',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    noEvents: 'No events'
  }
};

export default function getCalendarLocale() {
  const lang = document.documentElement.lang.toLowerCase();
  if (lang.startsWith('uk') || lang === 'ua') return LOCALES.ua;
  if (lang.startsWith('ru')) return LOCALES.ru;
  return LOCALES.en;
}
