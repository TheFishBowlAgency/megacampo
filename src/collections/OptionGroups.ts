import type { CollectionConfig } from "payload";

import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const OptionGroups: CollectionConfig = {
  slug: "option-groups",
  labels: {
    singular: { pt: "Grupo de opções", en: "Option group" },
    plural: { pt: "Grupos de opções", en: "Option groups" },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "selectionType", "sort"],
    group: adminGroups.catalog,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: common.title,
      required: true,
    },
    {
      name: "selectionType",
      type: "select",
      label: bl("Tipo de seleção", "Selection type"),
      required: true,
      defaultValue: "single",
      options: [
        { label: bl("Seleção única", "Single select"), value: "single" },
        { label: bl("Seleção múltipla", "Multi select"), value: "multi" },
      ],
    },
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
  ],
};
