import type { CollectionConfig } from "payload";

import { anyone, staff } from "@/access/roles";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: { pt: "Multimédia", en: "Media" },
    plural: { pt: "Multimédia", en: "Media" },
  },
  admin: {
    group: adminGroups.content,
  },
  access: {
    read: anyone,
    create: staff,
    update: staff,
    delete: staff,
  },
  upload: {
    adminThumbnail: ({ doc }) => {
      if (typeof doc.url === "string" && doc.url.length > 0) {
        return doc.url;
      }

      return "";
    },
    filenameCompoundIndex: ["prefix", "filename"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: common.alt,
      required: true,
      admin: {
        description: bl(
          "Descrição da imagem para acessibilidade e SEO.",
          "Image description for accessibility and SEO.",
        ),
      },
    },
  ],
};
