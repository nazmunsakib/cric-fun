const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
] as const;

const SHORT_MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export function getLocalTodayISO(): string {
  const now = new Date();
  return toISODate(now);
}

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function isValidISODate(value: string): boolean {
  return parseISODate(value) !== null;
}

/** Stable, locale-independent display: 25 OCTOBER 2026 */
export function formatCardDate(value: string): string {
  const date = parseISODate(value);
  if (!date) return "DATE NOT SET";
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Compact display: 25 OCT 2026 */
export function formatShortDate(value: string): string {
  const date = parseISODate(value);
  if (!date) return "Date not set";
  return `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Long, accessible display: Sunday, 25 October 2026 */
export function formatLongDate(value: string): string {
  const date = parseISODate(value);
  if (!date) return "Date not set";
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];
  const month = MONTHS[date.getMonth()].toLowerCase();
  const titleMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${weekday}, ${date.getDate()} ${titleMonth} ${date.getFullYear()}`;
}

export function dateForFilename(value: string): string {
  return isValidISODate(value) ? value : "undated";
}

export function shiftISODate(value: string, days: number): string {
  const date = parseISODate(value);
  if (!date) return getLocalTodayISO();
  date.setDate(date.getDate() + days);
  return toISODate(date);
}
