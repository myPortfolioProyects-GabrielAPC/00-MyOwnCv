/** Calendar month written as "YYYY-MM". */
export type YearMonth = string;

export const YEAR_MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

/** `to` is `null` while the period is still going. */
export type Period = {
  from: YearMonth;
  to: YearMonth | null;
};

export function yearOf(value: YearMonth) {
  return Number(value.slice(0, 4));
}

/** Every calendar year the period touches, up to `currentYear` when ongoing. */
export function yearsOf(period: Period, currentYear: number) {
  const first = yearOf(period.from);
  const last = period.to === null ? currentYear : yearOf(period.to);
  return Array.from({ length: Math.max(0, last - first + 1) }, (_, i) => first + i);
}
