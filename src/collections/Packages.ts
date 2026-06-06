import type { CollectionConfig } from "payload";

import {
  extraGroupConfigFields,
  templateOverrideFields,
} from "@/fields/extraGroupConfigFields";
import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generatePackageSlug } from "@/hooks/generateSlug";

export const Packages: CollectionConfig = {
  slug: "packages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "activity", "category", "basePriceCents", "isActive"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (
          data?.templatePackage &&
          Array.isArray(data.extraGroupConfigs) &&
          data.extraGroupConfigs.length > 0
        ) {
          throw new Error(
            "Remove extra group configs when inheriting from a template package. Use template overrides instead.",
          );
        }

        return data;
      },
      generatePackageSlug,
    ],
  },
  fields: [
    {
      name: "activity",
      type: "relationship",
      relationTo: "activities",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "package-categories",
      admin: {
        description:
          "Optional middle layer (e.g. Paintball Group, Birthday Party). Leave empty when not used.",
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    autoSlugField("activity, category, and name"),
    mediaImageField(),
    {
      name: "basePriceCents",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Base package price in cents (EUR).",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "sort",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "templatePackage",
      type: "relationship",
      relationTo: "packages",
      admin: {
        description:
          "Inherit extra configuration from another package (e.g. Commando Party → Commando). Apply overrides below.",
      },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    {
      name: "templateOverrides",
      type: "array",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.templatePackage),
        description:
          "Mutations applied on top of the template package configuration.",
      },
      fields: templateOverrideFields,
    },
    {
      name: "extraGroupConfigs",
      type: "array",
      admin: {
        condition: (_, siblingData) => !siblingData?.templatePackage,
        description:
          "Full extra configuration for this package. Not used when a template package is set.",
      },
      fields: extraGroupConfigFields,
    },
  ],
};
