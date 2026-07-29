import type { Condition, Field } from "payload";

import { bl, common } from "@/i18n/labels";

type PriceFieldPairOptions = {
  centsName?: string;
  euroName?: string;
  required?: boolean;
  description?: ReturnType<typeof bl>;
  condition?: Condition;
};

export function priceCentsEuroFields(
  options: PriceFieldPairOptions = {},
): Field[] {
  const centsName = options.centsName ?? "priceCents";
  const euroName = options.euroName ?? "priceEur";

  return [
    {
      name: centsName,
      type: "number",
      min: 0,
      required: options.required,
      admin: {
        hidden: true,
      },
    },
    {
      name: euroName,
      type: "number",
      label: common.priceEur,
      min: 0,
      required: options.required,
      admin: {
        step: 0.01,
        description:
          options.description ??
          bl(
            "Preço em euros (ex.: 30 para 30€).",
            "Price in euros (e.g. 30 for €30).",
          ),
        condition: options.condition,
      },
    },
  ];
}

export function basePriceFields(): Field[] {
  return priceCentsEuroFields({
    centsName: "basePriceCents",
    euroName: "basePriceEur",
    required: true,
    description: bl(
      "Preço base do pacote em euros.",
      "Base package price in euros.",
    ),
  });
}

export function defaultPriceFields(): Field[] {
  return priceCentsEuroFields({
    centsName: "defaultPriceCents",
    euroName: "defaultPriceEur",
    description: bl(
      "Preço de recurso opcional. O preço específico do pacote em Pacotes substitui normalmente este valor.",
      "Optional fallback price. Package-specific pricing in Packages usually overrides this.",
    ),
  });
}
