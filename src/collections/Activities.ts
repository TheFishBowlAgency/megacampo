import type { CollectionConfig } from "payload";

import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generateActivitySlug } from "@/hooks/generateSlug";

export const Activities: CollectionConfig = {
  slug: "activities",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "sort", "isActive"],
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
      required: true,
    },
    autoSlugField("title"),
    mediaImageField(),
    {
      name: "sort",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
