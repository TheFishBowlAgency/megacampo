import type { CollectionConfig } from "payload";

export const OptionGroups: CollectionConfig = {
  slug: "option-groups",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "selectionType", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "selectionType",
      type: "select",
      required: true,
      defaultValue: "single",
      options: [
        { label: "Single select", value: "single" },
        { label: "Multi select", value: "multi" },
      ],
    },
    {
      name: "sort",
      type: "number",
      defaultValue: 0,
    },
  ],
};
