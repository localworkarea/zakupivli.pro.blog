async function fetchCalendarData(url) {
  const response = await fetch(url);
  return await response.json();
}
