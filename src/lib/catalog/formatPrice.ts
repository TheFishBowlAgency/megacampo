export function formatPriceAmount(amount: number): string {
  return amount.toFixed(2);
}

export function formatPriceFromCents(cents: number): string {
  return formatPriceAmount(cents / 100);
}

export function formatPriceFromEur(eur: number): string {
  return formatPriceAmount(eur);
}

export function formatPriceWithCurrency(amount: number): string {
  return `${formatPriceAmount(amount)}€`;
}
