import type { CartLineItem } from "./types";

export function getCartItemDisplay(item: CartLineItem): {
  category: string;
  itemName: string;
} {
  if (item.productSubtitle) {
    return { category: item.productName, itemName: item.productSubtitle };
  }
  const parts = item.productName.trim().split(/\s+/);
  if (parts.length <= 1) {
    return { category: item.productName, itemName: item.productName };
  }
  return {
    category: parts[0],
    itemName: parts.slice(1).join(" "),
  };
}
