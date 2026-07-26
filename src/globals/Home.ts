import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

const linkFields = [
  {
    name: "label",
    type: "text" as const,
    label: common.label,
    required: true,
  },
  {
    name: "href",
    type: "text" as const,
    label: bl("URL", "URL"),
    required: true,
  },
];

export const Home: GlobalConfig = {
  slug: "home",
  label: { pt: "Página inicial", en: "Home page" },
  admin: {
    group: adminGroups.content,
    hidden: hideFromNonCms,
  },
  access: {
    read: anyone,
    update: cmsEditor,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: bl("Hero", "Hero"),
          fields: [
            {
              name: "hero",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                },
                {
                  name: "cta",
                  type: "group",
                  label: bl("Botão", "Button"),
                  fields: linkFields,
                },
              ],
            },
          ],
        },
        {
          label: bl("Destaques", "Key features"),
          fields: [
            {
              name: "keyFeatures",
              type: "group",
              label: false,
              fields: [
                {
                  name: "items",
                  type: "array",
                  label: bl("Itens", "Items"),
                  labels: {
                    singular: bl("Item", "Item"),
                    plural: bl("Itens", "Items"),
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
          label: bl("Aventura", "Adventure"),
          fields: [
            {
              name: "adventure",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "showAllLabel",
                  type: "text",
                  label: bl("Etiqueta «ver todas»", "Show all label"),
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: bl("Mapas", "Maps"),
          fields: [
            {
              name: "maps",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                },
                {
                  name: "cta",
                  type: "group",
                  label: bl("Botão", "Button"),
                  fields: linkFields,
                },
              ],
            },
          ],
        },
        {
          label: bl("Tipos de evento", "Event types"),
          fields: [
            {
              name: "eventTypes",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                },
                {
                  name: "cardLinkLabel",
                  type: "text",
                  label: bl("Etiqueta do cartão", "Card link label"),
                  required: true,
                  defaultValue: "Ver pacotes",
                },
                {
                  name: "events",
                  type: "relationship",
                  relationTo: "events",
                  hasMany: true,
                  label: bl("Eventos em destaque", "Featured events"),
                  admin: {
                    description: bl(
                      "Escolhe e ordena os eventos mostrados nesta secção.",
                      "Choose and order the events shown in this section.",
                    ),
                  },
                  filterOptions: {
                    isActive: {
                      equals: true,
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          label: bl("Mais do que paintball", "More than paintball"),
          fields: [
            {
              name: "moreThanPaintball",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                },
                mediaImageField(),
                {
                  name: "features",
                  type: "array",
                  label: bl("Funcionalidades", "Features"),
                  labels: {
                    singular: bl("Funcionalidade", "Feature"),
                    plural: bl("Funcionalidades", "Features"),
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: common.label,
                      required: true,
                    },
                    {
                      name: "icon",
                      type: "select",
                      label: bl("Ícone", "Icon"),
                      required: true,
                      options: [
                        {
                          label: bl("Árvores / exterior", "Trees / outdoors"),
                          value: "tree",
                        },
                        { label: bl("Barbecue", "Barbecue"), value: "grill" },
                        { label: bl("Balneários", "Showers"), value: "shower" },
                        {
                          label: bl("Estacionamento", "Parking"),
                          value: "parking",
                        },
                        { label: bl("Descanso", "Rest area"), value: "coffee" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: bl("Segurança", "Safety"),
          fields: [
            {
              name: "safety",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                },
                mediaImageField(),
                {
                  name: "items",
                  type: "array",
                  label: bl("Itens", "Items"),
                  labels: {
                    singular: bl("Item", "Item"),
                    plural: bl("Itens", "Items"),
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: common.label,
                      required: true,
                    },
                    {
                      name: "icon",
                      type: "select",
                      label: bl("Ícone", "Icon"),
                      required: true,
                      options: [
                        {
                          label: bl("Briefing", "Briefing"),
                          value: "briefing",
                        },
                        {
                          label: bl("Proteção", "Protection"),
                          value: "shield",
                        },
                        { label: bl("Monitores", "Monitors"), value: "person" },
                        { label: bl("Regras", "Rules"), value: "rules" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: bl("Testemunhos", "Testimonials"),
          fields: [
            {
              name: "testimonials",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                },
                {
                  name: "images",
                  type: "array",
                  label: bl("Galeria", "Gallery"),
                  labels: {
                    singular: bl("Imagem", "Image"),
                    plural: bl("Imagens", "Images"),
                  },
                  fields: [
                    mediaImageField({ required: true }),
                    {
                      name: "alt",
                      type: "text",
                      label: common.alt,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: bl("CTA", "CTA"),
          fields: [
            {
              name: "cta",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "button",
                  type: "group",
                  label: bl("Botão", "Button"),
                  fields: linkFields,
                },
              ],
            },
          ],
        },
        {
          label: bl("FAQ", "FAQ"),
          fields: [
            {
              name: "faq",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                },
                {
                  name: "items",
                  type: "array",
                  label: bl("Perguntas", "Questions"),
                  labels: {
                    singular: bl("Pergunta", "Question"),
                    plural: bl("Perguntas", "Questions"),
                  },
                  fields: [
                    {
                      name: "question",
                      type: "text",
                      label: bl("Pergunta", "Question"),
                      required: true,
                    },
                    {
                      name: "answer",
                      type: "textarea",
                      label: bl("Resposta", "Answer"),
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
