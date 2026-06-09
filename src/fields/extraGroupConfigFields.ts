import type { Field } from "payload";

export const packageOptionRowFields: Field[] = [
  {
    name: "option",
    type: "relationship",
    relationTo: "options",
    required: true,
  },
  {
    name: "isDefault",
    type: "checkbox",
    defaultValue: false,
    admin: {
      description: "Pre-selected choice for this package in this group.",
    },
  },
  {
    name: "priceCents",
    type: "number",
    required: true,
    min: 0,
    admin: {
      description:
        "Add-on price for this package (0 = included with the default selection).",
    },
  },
];

export const extraGroupConfigFields: Field[] = [
  {
    name: "group",
    type: "relationship",
    relationTo: "option-groups",
    required: true,
  },
  {
    name: "sort",
    type: "number",
    defaultValue: 0,
  },
  {
    name: "options",
    type: "array",
    required: true,
    minRows: 1,
    fields: packageOptionRowFields,
  },
];

export const templateOverrideFields: Field[] = [
  {
    name: "type",
    type: "select",
    required: true,
    options: [
      { label: "Replace option", value: "replaceOption" },
      { label: "Exclude option", value: "excludeOption" },
      { label: "Add option", value: "addOption" },
      { label: "Set default", value: "setDefault" },
      { label: "Price override", value: "priceOverride" },
    ],
  },
  {
    name: "group",
    type: "relationship",
    relationTo: "option-groups",
    required: true,
  },
  {
    name: "fromOption",
    type: "relationship",
    relationTo: "options",
    admin: {
      condition: (_, siblingData) =>
        siblingData?.type === "replaceOption" ||
        siblingData?.type === "excludeOption" ||
        siblingData?.type === "setDefault" ||
        siblingData?.type === "priceOverride",
    },
  },
  {
    name: "toOption",
    type: "relationship",
    relationTo: "options",
    admin: {
      condition: (_, siblingData) =>
        siblingData?.type === "replaceOption" || siblingData?.type === "addOption",
    },
  },
  {
    name: "isDefault",
    type: "checkbox",
    admin: {
      condition: (_, siblingData) =>
        siblingData?.type === "addOption" || siblingData?.type === "replaceOption",
    },
  },
  {
    name: "priceCents",
    type: "number",
    min: 0,
    admin: {
      condition: (_, siblingData) =>
        siblingData?.type === "addOption" ||
        siblingData?.type === "replaceOption" ||
        siblingData?.type === "priceOverride",
      description: "Package-specific price in cents for the added or replaced option.",
    },
  },
];
