/** Compare EUR amounts with 1-cent tolerance. */
export function amountsMatch(
  expected: number,
  actual: number,
  tolerance = 0.01,
): boolean {
  if (!Number.isFinite(expected) || !Number.isFinite(actual)) return false;
  return Math.abs(expected - actual) <= tolerance;
}

export function parseAmount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseFloat(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/** Parse ifthenpay dates like "28-10-2021" or "28-10-2021 10:55:21". */
export function parseIfthenpayDateTime(
  value: string | null | undefined,
): Date | null {
  if (!value?.trim()) return null;

  const match = value
    .trim()
    .match(/^(\d{2})-(\d{2})-(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?$/);

  if (!match) {
    const fallback = new Date(value);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }

  const [, day, month, year, hours = "23", minutes = "59", seconds = "59"] =
    match;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
    Number(seconds),
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

export function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}
