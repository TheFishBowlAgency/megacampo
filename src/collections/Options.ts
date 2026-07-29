import type { CollectionConfig } from "payload";

import { anyone, hideFromNonOperations, operationsAdmin } from "@/access/roles";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";
import { defaultPriceFields } from "@/fields/priceFields";
import {
  syncCentsToEuroDisplay,
  syncEuroInputToCents,
} from "@/lib/pricing/syncPriceFieldPairs";

export const Options: CollectionConfig = {
  slug: "options",
  labels: {
    singular: { pt: "Opção", en: "Option" },
    plural: { pt: "Opções", en: "Options" },
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "group", "pricingUnit", "cartBehavior"],
    group: adminGroups.catalog,
    hidden: hideFromNonOperations,
  },
  access: {
    read: anyone,
    create: operationsAdmin,
    update: operationsAdmin,
    delete: operationsAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        syncEuroInputToCents(data, "defaultPriceEur", "defaultPriceCents");
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        syncCentsToEuroDisplay(doc, "defaultPriceEur", "defaultPriceCents");
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "group",
      type: "relationship",
      relationTo: "option-groups",
      label: common.group,
      required: true,
    },
    {
      name: "label",
      type: "text",
      label: common.label,
      required: true,
    },
    ...defaultPriceFields(),
    {
      name: "pricingUnit",
      type: "select",
      label: bl("Unidade de preço", "Pricing unit"),
      required: true,
      defaultValue: "per_person",
      options: [
        { label: bl("Por pessoa", "Per person"), value: "per_person" },
        { label: bl("Por reserva", "Per booking"), value: "per_booking" },
      ],
    },
    {
      name: "cartBehavior",
      type: "select",
      label: bl("Comportamento no carrinho", "Cart behavior"),
      required: true,
      defaultValue: "inline",
      options: [
        {
          label: bl(
            "Integrado (soma ao preço do pacote)",
            "Inline (adds to package price)",
          ),
          value: "inline",
        },
        {
          label: bl("Linha separada no carrinho", "Separate cart line item"),
          value: "separate_line_item",
        },
      ],
    },
    {
      name: "maxPerBooking",
      type: "number",
      label: bl("Máximo por reserva", "Maximum per booking"),
      min: 1,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.cartBehavior === "separate_line_item",
        description: bl(
          "Quantidade máxima por reserva (ex.: 1 para Private Lounge).",
          "Maximum quantity per booking (e.g. 1 for Private Lounge).",
        ),
      },
    },
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
  ],
};
