import type { CartLineItem } from '@/components/cart/types';

export function calculateCartTotal(items: CartLineItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function formatAmountForPayment(total: number): string {
  return total.toFixed(2);
}
