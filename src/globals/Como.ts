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
    localized: true,
  },
  {
    name: "href",
    type: "text" as const,
    label: bl("URL", "URL"),
    required: true,
  },
];

export const Como: GlobalConfig = {
  slug: "como",
  label: { pt: "Como", en: "How it works" },
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
                  localized: true,
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
                  required: true,
                  localized: true,
                },
                mediaImageField(),
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
          label: bl("Como funciona", "How it works"),
          fields: [
            {
              name: "howItWorks",
              type: "group",
              label: false,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  label: common.title,
                  required: true,
                  localized: true,
                },
                {
                  name: "steps",
                  type: "array",
                  label: bl("Passos", "Steps"),
                  labels: {
                    singular: bl("Passo", "Step"),
                    plural: bl("Passos", "Steps"),
                  },
                  admin: {
                    description: bl(
                      "Ícones das ilustrações são definidos no código (ordem dos passos).",
                      "Step illustration icons are defined in code (by step order).",
                    ),
                  },
                  fields: [
                    {
                      name: "stepLabel",
                      type: "text",
                      label: bl("Etiqueta do passo", "Step label"),
                      required: true,
                      localized: true,
                      admin: {
                        description: bl(
                          "Ex.: «Primeiro passo».",
                          "e.g. «First step».",
                        ),
                      },
                    },
                    {
                      name: "title",
                      type: "text",
                      label: common.title,
                      required: true,
                      localized: true,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: common.description,
                      required: true,
                      localized: true,
                    },
                    {
                      name: "link",
                      type: "group",
                      label: bl("Ligação", "Link"),
                      fields: linkFields,
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
                  localized: true,
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
                  localized: true,
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
                      localized: true,
                    },
                    {
                      name: "answer",
                      type: "textarea",
                      label: bl("Resposta", "Answer"),
                      required: true,
                      localized: true,
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
