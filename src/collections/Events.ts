import type { CollectionConfig } from "payload";

import { anyone, hideFromNonOperations, operationsAdmin } from "@/access/roles";
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
    hidden: hideFromNonOperations,
  },
  access: {
    read: anyone,
    create: operationsAdmin,
    update: operationsAdmin,
    delete: operationsAdmin,
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
    {
      name: "description",
      type: "textarea",
      label: common.description,
      admin: {
        description: bl(
          "Resumo curto nos cartões de eventos e lead do detalhe.",
          "Short summary on event cards and detail lead copy.",
        ),
      },
    },
    {
      name: "body",
      type: "richText",
      label: bl("Corpo", "Body"),
      admin: {
        description: bl(
          "Texto longo na página de detalhe simples do evento.",
          "Long-form copy on the simple event detail page.",
        ),
      },
    },
    {
      name: "activityHeading",
      type: "text",
      label: bl("Título da escolha de atividade", "Activity choice heading"),
    },
    {
      name: "activityDescription",
      type: "textarea",
      label: bl(
        "Descrição da escolha de atividade",
        "Activity choice description",
      ),
    },
    {
      name: "pricingTabs",
      type: "array",
      label: bl("Separadores de preços", "Pricing tabs"),
      labels: {
        singular: bl("Separador", "Tab"),
        plural: bl("Separadores", "Tabs"),
      },
      admin: {
        description: bl(
          "Pacotes por tipo de atividade na página /pacotes. Se um separador não tiver pacotes, usa o primeiro com conteúdo.",
          "Packages per activity type on the /pacotes page. Empty tabs fall back to the first populated tab.",
        ),
        initCollapsed: true,
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: common.label,
          required: true,
        },
        {
          name: "packages",
          type: "array",
          label: bl("Pacotes", "Packages"),
          labels: {
            singular: bl("Pacote", "Package"),
            plural: bl("Pacotes", "Packages"),
          },
          fields: [
            {
              name: "name",
              type: "text",
              label: common.name,
              required: true,
            },
            {
              name: "price",
              type: "text",
              label: bl("Preço", "Price"),
              required: true,
              admin: {
                description: bl(
                  "Valor mostrado (ex.: 29,95).",
                  "Displayed amount (e.g. 29,95).",
                ),
              },
            },
            {
              name: "popular",
              type: "checkbox",
              label: bl("O mais popular", "Most popular"),
              defaultValue: false,
            },
            {
              name: "features",
              type: "array",
              label: bl("Destaques", "Highlights"),
              labels: {
                singular: bl("Destaque", "Highlight"),
                plural: bl("Destaques", "Highlights"),
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
          ],
        },
      ],
    },
    {
      name: "testimonialsHeading",
      type: "text",
      label: bl("Título dos testemunhos", "Testimonials heading"),
      defaultValue: "O que dizem os nossos clientes?",
    },
    {
      name: "testimonials",
      type: "relationship",
      relationTo: "testimonials",
      hasMany: true,
      label: bl("Testemunhos", "Testimonials"),
      admin: {
        description: bl(
          "Se vazio, usa todos os testemunhos ativos.",
          "If empty, all active testimonials are used.",
        ),
      },
      filterOptions: {
        isActive: {
          equals: true,
        },
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
