import type { CollectionConfig } from "payload";

import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generatePackageCategorySlug } from "@/hooks/generateSlug";

export const PackageCategories: CollectionConfig = {
  slug: "package-categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "activity", "slug", "sort"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [generatePackageCategorySlug],
  },
  fields: [
    {
      name: "activity",
      type: "relationship",
      relationTo: "activities",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Short summary shown on category cards.",
      },
    },
    {
      name: "minAge",
      type: "text",
      admin: {
        description: 'Age requirement label (e.g. "+12 Anos").',
      },
    },
    autoSlugField("activity and title"),
    mediaImageField(),
    {
      name: "sort",
      type: "number",
      defaultValue: 0,
    },
  ],
};
