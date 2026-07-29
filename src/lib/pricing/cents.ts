export function euroToCents(amount: number): number {
  return Math.round(amount * 100);
}

export function centsToEuro(cents: number): number {
  return cents / 100;
}
