import type { Field } from "payload";

import { priceCentsEuroFields } from "@/fields/priceFields";
import { bl, common } from "@/i18n/labels";

export const packageOptionRowFields: Field[] = [
  {
    name: "option",
    type: "relationship",
    relationTo: "options",
    label: common.option,
    required: true,
  },
  {
    name: "isDefault",
    type: "checkbox",
    label: common.isDefault,
    defaultValue: false,
    admin: {
      description: bl(
        "Opção pré-selecionada para este pacote neste grupo.",
        "Pre-selected choice for this package in this group.",
      ),
    },
  },
  ...priceCentsEuroFields({
    required: true,
    description: bl(
      "Preço adicional para este pacote (0 = incluído na seleção predefinida).",
      "Add-on price for this package (0 = included with the default selection).",
    ),
  }),
];

export const extraGroupConfigFields: Field[] = [
  {
    name: "group",
    type: "relationship",
    relationTo: "option-groups",
    label: common.group,
    required: true,
  },
  {
    name: "sort",
    type: "number",
    label: common.sort,
    defaultValue: 0,
  },
  {
    name: "options",
    type: "array",
    label: common.options,
    required: true,
    minRows: 1,
    fields: packageOptionRowFields,
  },
];

export const templateOverrideFields: Field[] = [
  {
    name: "type",
    type: "select",
    label: common.type,
    required: true,
    options: [
      {
        label: bl("Substituir opção", "Replace option"),
        value: "replaceOption",
      },
      {
        label: bl("Excluir opção", "Exclude option"),
        value: "excludeOption",
      },
      { label: bl("Adicionar opção", "Add option"), value: "addOption" },
      {
        label: bl("Definir predefinição", "Set default"),
        value: "setDefault",
      },
      {
        label: bl("Substituir preço", "Price override"),
        value: "priceOverride",
      },
    ],
  },
  {
    name: "group",
    type: "relationship",
    relationTo: "option-groups",
    label: common.group,
    required: true,
  },
  {
    name: "fromOption",
    type: "relationship",
    relationTo: "options",
    label: bl("Opção de origem", "From option"),
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
    label: bl("Opção de destino", "To option"),
    admin: {
      condition: (_, siblingData) =>
        siblingData?.type === "replaceOption" || siblingData?.type === "addOption",
    },
  },
  {
    name: "isDefault",
    type: "checkbox",
    label: common.isDefault,
    admin: {
      condition: (_, siblingData) =>
        siblingData?.type === "addOption" || siblingData?.type === "replaceOption",
    },
  },
  ...priceCentsEuroFields({
    description: bl(
      "Preço específico do pacote em euros para a opção adicionada ou substituída.",
      "Package-specific price in euros for the added or replaced option.",
    ),
    condition: (_, siblingData) =>
      siblingData?.type === "addOption" ||
      siblingData?.type === "replaceOption" ||
      siblingData?.type === "priceOverride",
  }),
];
