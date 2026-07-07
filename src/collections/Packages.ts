import type { CollectionConfig } from "payload";

import {
  extraGroupConfigFields,
  templateOverrideFields,
} from "@/fields/extraGroupConfigFields";
import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generatePackageSlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Packages: CollectionConfig = {
  slug: "packages",
  labels: {
    singular: { pt: "Pacote", en: "Package" },
    plural: { pt: "Pacotes", en: "Packages" },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "activity", "category", "basePriceCents", "isActive"],
    group: adminGroups.catalog,
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
      label: common.activity,
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "package-categories",
      label: common.category,
      admin: {
        description: bl(
          "Camada intermédia opcional (ex.: Paintball Grupo, Festa de Aniversário). Deixar vazio quando não aplicável.",
          "Optional middle layer (e.g. Paintball Group, Birthday Party). Leave empty when not used.",
        ),
      },
    },
    {
      name: "name",
      type: "text",
      label: common.name,
      required: true,
    },
    autoSlugField(bl("atividade, categoria e nome", "activity, category, and name")),
    mediaImageField(),
    {
      name: "basePriceCents",
      type: "number",
      label: bl("Preço base (cêntimos)", "Base price (cents)"),
      required: true,
      min: 0,
      admin: {
        description: bl(
          "Preço base do pacote em cêntimos (EUR).",
          "Base package price in cents (EUR).",
        ),
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: common.isActive,
      defaultValue: true,
    },
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
    {
      name: "isMostPopular",
      type: "checkbox",
      label: common.mostPopular,
      defaultValue: false,
      admin: {
        description: bl(
          'Mostra "O MAIS POPULAR" em destaque no cartão de preço.',
          'Shows "MOST POPULAR" badge on the pricing card.',
        ),
      },
    },
    {
      name: "highlights",
      type: "array",
      label: common.highlights,
      admin: {
        description: bl(
          "Itens incluídos mostrados no cartão de preço (ex.: bolas, equipamento, seguro).",
          "Included items shown on the pricing card (e.g. paintballs, gear, insurance).",
        ),
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: common.label,
          required: true,
        },
      ],
    },
    {
      name: "templatePackage",
      type: "relationship",
      relationTo: "packages",
      label: bl("Pacote modelo", "Template package"),
      admin: {
        description: bl(
          "Herdar configuração extra de outro pacote (ex.: Commando Party → Commando). Aplicar substituições abaixo.",
          "Inherit extra configuration from another package (e.g. Commando Party → Commando). Apply overrides below.",
        ),
      },
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    {
      name: "templateOverrides",
      type: "array",
      label: bl("Substituições do modelo", "Template overrides"),
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.templatePackage),
        description: bl(
          "Alterações aplicadas sobre a configuração do pacote modelo.",
          "Mutations applied on top of the template package configuration.",
        ),
      },
      fields: templateOverrideFields,
    },
    {
      name: "extraGroupConfigs",
      type: "array",
      label: bl("Configuração de grupos extra", "Extra group configuration"),
      admin: {
        condition: (_, siblingData) => !siblingData?.templatePackage,
        description: bl(
          "Configuração completa de extras para este pacote. Não utilizada quando um pacote modelo está definido.",
          "Full extra configuration for this package. Not used when a template package is set.",
        ),
      },
      fields: extraGroupConfigFields,
    },
  ],
};
