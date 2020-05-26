// Convert seconds to hours and minutes
export function secondsToHm(sec) {
  let hours = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
  let min = Math.floor(sec / 60);
  if (min < 10) min = `0${min}`;

  return `${hours}h${min}`;
}

// Convert meters in km, then round to one decimal
export function metersToKm(meters) {
  return Math.round((meters / 1000) * 10) / 10;
}
