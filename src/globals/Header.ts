import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Header: GlobalConfig = {
  slug: "header",
  label: { pt: "Cabeçalho", en: "Header" },
  admin: {
    group: adminGroups.content,
    hidden: hideFromNonCms,
  },
  access: {
    read: anyone,
    update: cmsEditor,
  },
  fields: [
    mediaImageField(),
    {
      name: "logoAlt",
      type: "text",
      label: bl("Texto alternativo do logótipo", "Logo alt text"),
      defaultValue: "Megacampo",
    },
    {
      name: "topBar",
      type: "group",
      label: bl("Barra superior", "Top bar"),
      fields: [
        {
          name: "contactLabel",
          type: "text",
          label: bl("Etiqueta de contacto", "Contact label"),
          required: true,
          defaultValue: "Contacta-nos:",
        },
        {
          name: "phone",
          type: "text",
          label: bl("Telefone", "Phone"),
          required: true,
          defaultValue: "+351 913 402 013",
        },
      ],
    },
    {
      name: "navLinks",
      type: "array",
      label: bl("Ligações de navegação", "Navigation links"),
      labels: {
        singular: bl("Ligação", "Link"),
        plural: bl("Ligações", "Links"),
      },
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: common.label,
          required: true,
        },
        {
          name: "href",
          type: "text",
          label: bl("URL", "URL"),
          required: true,
          admin: {
            description: bl(
              "Caminho interno (ex.: /como) ou âncora (ex.: /#contactos).",
              "Internal path (e.g. /como) or anchor (e.g. /#contactos).",
            ),
          },
        },
      ],
    },
  ],
};
