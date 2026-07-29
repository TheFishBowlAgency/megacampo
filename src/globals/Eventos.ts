import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Eventos: GlobalConfig = {
  slug: "eventos",
  label: { pt: "Eventos", en: "Events page" },
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
                mediaImageField(),
              ],
            },
          ],
        },
        {
          label: bl("Secção", "Section"),
          fields: [
            {
              name: "section",
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
                  name: "cardLinkLabel",
                  type: "text",
                  label: bl("Etiqueta do cartão", "Card link label"),
                  required: true,
                  defaultValue: "Ver mais",
                },
              ],
            },
          ],
        },
        {
          label: bl("Detalhe", "Detail"),
          fields: [
            {
              name: "detail",
              type: "group",
              label: false,
              fields: [
                {
                  name: "backLabel",
                  type: "text",
                  label: bl("Ligação de regresso", "Back link label"),
                  defaultValue: "Voltar a Eventos",
                },
                {
                  name: "shareLabel",
                  type: "text",
                  label: bl("Etiqueta de partilha", "Share label"),
                  defaultValue: "Partilhar",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
