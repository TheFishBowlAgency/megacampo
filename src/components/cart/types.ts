export interface CartItemDetail {
  label: string;
  value: string;
}

export type CartItemType = 'package' | 'extra';

export interface CartLineItem {
  id: string;
  itemType?: CartItemType;
  /** Package or extra identifier from CMS / catalog. */
  packageId?: string;
  imageUrl?: string;
  productName: string;
  /** e.g. "500 BOLAS" for extras */
  productSubtitle?: string;
  details: CartItemDetail[];
  quantity: number;
  unitPrice: number;
  /** ISO date from the date input, package lines only. */
  date?: string;
  period?: string;
  /** Option group id → option id, package lines only. */
  selections?: Record<string, string>;
}
