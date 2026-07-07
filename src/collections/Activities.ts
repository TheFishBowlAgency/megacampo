import type { CollectionConfig } from "payload";

import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generateActivitySlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Activities: CollectionConfig = {
  slug: "activities",
  labels: {
    singular: { pt: "Atividade", en: "Activity" },
    plural: { pt: "Atividades", en: "Activities" },
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
    beforeValidate: [generateActivitySlug],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: common.title,
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: common.description,
      admin: {
        description: bl(
          "Resumo curto apresentado nos cartões de atividade.",
          "Short summary shown on activity cards.",
        ),
      },
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
