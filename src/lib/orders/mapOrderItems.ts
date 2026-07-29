import type { CartLineItem } from "@/components/cart/types";

/** Shape stored on Order.items (Payload array rows). */
export type OrderItemRecord = {
  id?: string | null;
  lineId: string;
  itemType?: "package" | "extra" | null;
  packageId?: string | null;
  imageUrl?: string | null;
  productName: string;
  productSubtitle?: string | null;
  quantity: number;
  unitPrice: number;
  date?: string | null;
  period?: string | null;
  details?:
    | {
        id?: string | null;
        label: string;
        value: string;
      }[]
    | null;
  selections?:
    | {
        id?: string | null;
        groupId: string;
        optionId: string;
      }[]
    | null;
};

export function cartItemsToOrderItems(
  items: CartLineItem[],
): Omit<OrderItemRecord, "id">[] {
  return items.map((item) => ({
    lineId: item.id,
    itemType: item.itemType ?? "package",
    packageId: item.packageId,
    imageUrl: item.imageUrl,
    productName: item.productName,
    productSubtitle: item.productSubtitle,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    date: item.date,
    period: item.period,
    details: (item.details ?? []).map((detail) => ({
      label: detail.label,
      value: detail.value,
    })),
    selections: item.selections
      ? Object.entries(item.selections).map(([groupId, optionId]) => ({
          groupId,
          optionId,
        }))
      : [],
  }));
}

function selectionsToRecord(
  selections: OrderItemRecord["selections"],
): Record<string, string> | undefined {
  if (!selections?.length) return undefined;
  const record: Record<string, string> = {};
  for (const row of selections) {
    if (row.groupId && row.optionId) {
      record[row.groupId] = row.optionId;
    }
  }
  return Object.keys(record).length ? record : undefined;
}

function isLegacyCartLine(value: unknown): value is CartLineItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CartLineItem & { lineId?: string };
  return (
    typeof item.productName === "string" &&
    typeof item.quantity === "number" &&
    typeof item.unitPrice === "number" &&
    typeof item.id === "string" &&
    !("lineId" in item && typeof item.lineId === "string")
  );
}

function isOrderItemRecord(value: unknown): value is OrderItemRecord {
  if (!value || typeof value !== "object") return false;
  const item = value as OrderItemRecord;
  return (
    typeof item.productName === "string" &&
    typeof item.quantity === "number" &&
    typeof item.unitPrice === "number" &&
    typeof item.lineId === "string"
  );
}

export function orderItemsToCartItems(value: unknown): CartLineItem[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((raw) => {
    if (isOrderItemRecord(raw)) {
      const cartItem: CartLineItem = {
        id: raw.lineId,
        itemType: raw.itemType ?? "package",
        packageId: raw.packageId ?? undefined,
        imageUrl: raw.imageUrl ?? undefined,
        productName: raw.productName,
        productSubtitle: raw.productSubtitle ?? undefined,
        quantity: raw.quantity,
        unitPrice: raw.unitPrice,
        date: raw.date ?? undefined,
        period: raw.period ?? undefined,
        details: (raw.details ?? []).map((detail) => ({
          label: detail.label,
          value: detail.value,
        })),
        selections: selectionsToRecord(raw.selections),
      };
      return [cartItem];
    }

    if (isLegacyCartLine(raw)) {
      return [raw];
    }

    return [];
  });
}
