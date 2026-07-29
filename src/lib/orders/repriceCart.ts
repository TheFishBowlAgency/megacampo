import type { CartLineItem } from "@/components/cart/types";
import { loadPackageTemplates } from "@/lib/catalog/loadPackageTemplates";
import { toPackageDoc } from "@/lib/catalog/packageDoc";
import { resolvePackageConfig } from "@/lib/catalog/resolvePackageConfig";
import { calculateCartTotal } from "@/lib/orders/calculateTotal";
import type { GroupExtra, Package } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

function calculatePackageUnitPriceCents(
  basePriceCents: number,
  selections: Record<string, string> | undefined,
  extraGroups: ReturnType<typeof resolvePackageConfig>["extraGroups"],
): number {
  let total = basePriceCents;

  for (const group of extraGroups) {
    const selectedId = selections?.[group.groupId];
    if (!selectedId) continue;
    const selected = group.options.find(
      (option) => option.optionId === selectedId,
    );
    if (selected) total += selected.priceCents;
  }

  return total;
}

async function repricePackageLine(item: CartLineItem): Promise<CartLineItem> {
  if (!item.packageId) {
    throw new Error(`Item "${item.productName}" sem identificador de pacote.`);
  }

  const payload = await getPayload({ config });
  const pkg = await payload.findByID({
    collection: "packages",
    id: item.packageId,
    depth: 3,
    overrideAccess: true,
  });

  if (!pkg || !(pkg as Package).isActive) {
    throw new Error(`O pacote "${item.productName}" já não está disponível.`);
  }

  const packageDoc = pkg as Package;
  const templates = await loadPackageTemplates(packageDoc);
  const resolved = resolvePackageConfig(toPackageDoc(packageDoc), (id) =>
    templates.get(id),
  );

  if (item.selections) {
    for (const [groupId, optionId] of Object.entries(item.selections)) {
      const group = resolved.extraGroups.find((g) => g.groupId === groupId);
      if (!group) {
        throw new Error(`Opção inválida no pacote "${item.productName}".`);
      }
      const option = group.options.find((o) => o.optionId === optionId);
      if (!option) {
        throw new Error(`Opção inválida no pacote "${item.productName}".`);
      }
    }
  }

  const unitPriceCents = calculatePackageUnitPriceCents(
    resolved.basePriceCents,
    item.selections,
    resolved.extraGroups,
  );

  return {
    ...item,
    itemType: "package",
    unitPrice: unitPriceCents / 100,
  };
}

async function repriceExtraLine(item: CartLineItem): Promise<CartLineItem> {
  if (!item.packageId) {
    throw new Error(`Extra "${item.productName}" sem identificador.`);
  }

  const payload = await getPayload({ config });
  const extra = (await payload.findByID({
    collection: "group-extras",
    id: item.packageId,
    depth: 0,
    overrideAccess: true,
  })) as GroupExtra;

  if (!extra || extra.isActive === false) {
    throw new Error(
      `O extra "${item.productSubtitle || item.productName}" já não está disponível.`,
    );
  }

  return {
    ...item,
    itemType: "extra",
    unitPrice: (extra.priceCents ?? 0) / 100,
  };
}

/**
 * Reprices cart lines from the live catalog so checkout totals
 * cannot be tampered with on the client.
 */
export async function repriceCartItems(
  items: CartLineItem[],
): Promise<{ items: CartLineItem[]; totalAmount: number }> {
  if (!items.length) {
    throw new Error("O carrinho está vazio.");
  }

  const priced = await Promise.all(
    items.map(async (item) => {
      const type = item.itemType ?? "package";
      if (type === "extra") return repriceExtraLine(item);
      return repricePackageLine(item);
    }),
  );

  return {
    items: priced,
    totalAmount: calculateCartTotal(priced),
  };
}
