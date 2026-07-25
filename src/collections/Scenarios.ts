import type { CollectionConfig } from "payload";

import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generateScenarioSlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Scenarios: CollectionConfig = {
  slug: "scenarios",
  labels: {
    singular: { pt: "Cenário", en: "Scenario" },
    plural: { pt: "Cenários", en: "Scenarios" },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "sort", "isActive"],
    group: adminGroups.content,
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [generateScenarioSlug],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: common.title,
      required: true,
    },
    autoSlugField(bl("título", "title")),
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
