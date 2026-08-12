import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Cenarios: GlobalConfig = {
  slug: "cenarios",
  label: { pt: "Cenários", en: "Scenarios page" },
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
                  type: "textarea",
                  label: common.title,
                  required: true,
                  localized: true,
                  admin: {
                    description: bl(
                      "Uma linha por linha do título (ex.: MAPAS / MUNDIALMENTE / FAMOSOS).",
                      "One line per title line (e.g. MAPAS / MUNDIALMENTE / FAMOSOS).",
                    ),
                  },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: common.description,
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
                  name: "description",
                  type: "textarea",
                  label: common.description,
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
};
