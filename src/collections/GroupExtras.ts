import type { CollectionConfig } from "payload";

import { anyone, hideFromNonOperations, operationsAdmin } from "@/access/roles";
import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { priceCentsEuroFields } from "@/fields/priceFields";
import { generateGroupExtraSlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";
import {
  syncCentsToEuroDisplay,
  syncEuroInputToCents,
} from "@/lib/pricing/syncPriceFieldPairs";

export const GroupExtras: CollectionConfig = {
  slug: "group-extras",
  labels: {
    singular: { pt: "Extra de grupo", en: "Group extra" },
    plural: { pt: "Extras de grupo", en: "Group extras" },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "priceEur", "sort", "isActive"],
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
      generateGroupExtraSlug,
      ({ data }) => {
        syncEuroInputToCents(data, "priceEur", "priceCents");
        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        syncCentsToEuroDisplay(doc, "priceEur", "priceCents");
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: common.name,
      required: true,
    },
    autoSlugField(bl("nome", "name")),
    ...priceCentsEuroFields({
      required: true,
      description: bl(
        "Preço do extra de grupo em euros (ex.: 30 para 30€).",
        "Group extra price in euros (e.g. 30 for €30).",
      ),
    }),
    mediaImageField(),
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: common.isActive,
      defaultValue: true,
    },
  ],
};
