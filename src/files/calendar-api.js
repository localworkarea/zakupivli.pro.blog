// export default async function fetchCalendarData(url) {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Ошибка HTTP: ${response.status}`);
//   }
//   return await response.json();
// }


async function fetchCalendarData(url) {
  const response = await fetch(url);
  return await response.json();
}
