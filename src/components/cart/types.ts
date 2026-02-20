export interface CartItemDetail {
  label: string;
  value: string;
}

export interface CartLineItem {
  id: string;
  imageUrl?: string;
  productName: string;
  /** e.g. "500 BOLAS" for extras */
  productSubtitle?: string;
  details: CartItemDetail[];
  quantity: number;
  unitPrice: number;
}
