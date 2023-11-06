export function isWeekend(date) {
  let dayOfWeek = date.format("dddd");
  console.log(dayOfWeek);

  if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
    return true;
  } else {
    return false;
  }
}
export default isWeekend;
