import type { CollectionConfig } from "payload";

export const Options: CollectionConfig = {
  slug: "options",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "group", "pricingUnit", "cartBehavior"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "group",
      type: "relationship",
      relationTo: "option-groups",
      required: true,
    },
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "defaultPriceCents",
      type: "number",
      min: 0,
      admin: {
        description:
          "Optional fallback price. Package-specific pricing in Packages usually overrides this.",
      },
    },
    {
      name: "pricingUnit",
      type: "select",
      required: true,
      defaultValue: "per_person",
      options: [
        { label: "Per person", value: "per_person" },
        { label: "Per booking", value: "per_booking" },
      ],
    },
    {
      name: "cartBehavior",
      type: "select",
      required: true,
      defaultValue: "inline",
      options: [
        { label: "Inline (adds to package price)", value: "inline" },
        {
          label: "Separate cart line item",
          value: "separate_line_item",
        },
      ],
    },
    {
      name: "maxPerBooking",
      type: "number",
      min: 1,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.cartBehavior === "separate_line_item",
        description: "Maximum quantity per booking (e.g. 1 for Private Lounge).",
      },
    },
    {
      name: "sort",
      type: "number",
      defaultValue: 0,
    },
  ],
};
