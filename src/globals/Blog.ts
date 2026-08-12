import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Blog: GlobalConfig = {
  slug: "blog",
  label: { pt: "Blog", en: "Blog page" },
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
                  localized: true,
                },
                {
                  name: "cardLinkLabel",
                  type: "text",
                  label: bl("Etiqueta do cartão", "Card link label"),
                  required: true,
                  defaultValue: "Ver mais",
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
