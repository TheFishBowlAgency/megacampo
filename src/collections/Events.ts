import type { CollectionConfig } from "payload";

import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generateEventSlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: { pt: "Evento", en: "Event" },
    plural: { pt: "Eventos", en: "Events" },
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
    beforeValidate: [generateEventSlug],
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
