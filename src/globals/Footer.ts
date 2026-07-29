import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: { pt: "Rodapé", en: "Footer" },
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
      name: "contact",
      type: "group",
      label: bl("Contactos", "Contact"),
      fields: [
        {
          name: "title",
          type: "text",
          label: common.title,
          required: true,
          defaultValue: "CONTACTA-NOS",
        },
        {
          name: "phoneFixed",
          type: "text",
          label: bl("Telefone fixo", "Landline"),
          required: true,
          defaultValue: "+351 214 876 088",
        },
        {
          name: "phoneMobile",
          type: "text",
          label: bl("Telefone móvel", "Mobile"),
          required: true,
          defaultValue: "+351 913 402 013",
        },
        {
          name: "phoneFixedNote",
          type: "text",
          label: bl("Nota telefone fixo", "Landline note"),
          defaultValue: "*Chamada para rede fixa nacional",
        },
        {
          name: "phoneMobileNote",
          type: "text",
          label: bl("Nota telefone móvel", "Mobile note"),
          defaultValue: "**Chamada para rede móvel nacional",
        },
        {
          name: "email",
          type: "email",
          label: bl("Email", "Email"),
          required: true,
          defaultValue: "info@megacampo.com",
        },
        {
          name: "addressLine1",
          type: "text",
          label: bl("Morada (linha 1)", "Address line 1"),
          required: true,
          defaultValue: "Avenida do Megacampo, Lugar da Romã",
        },
        {
          name: "addressLine2",
          type: "text",
          label: bl("Morada (linha 2)", "Address line 2"),
          required: true,
          defaultValue: "Sobral da Abalheira, 2640-615 Mafra",
        },
      ],
    },
    {
      name: "hours",
      type: "group",
      label: bl("Horário", "Hours"),
      fields: [
        {
          name: "title",
          type: "text",
          label: common.title,
          required: true,
          defaultValue: "HORÁRIO",
        },
        {
          name: "rows",
          type: "array",
          label: bl("Linhas", "Rows"),
          labels: {
            singular: bl("Linha", "Row"),
            plural: bl("Linhas", "Rows"),
          },
          fields: [
            {
              name: "label",
              type: "text",
              label: common.label,
              required: true,
            },
            {
              name: "value",
              type: "text",
              label: bl("Valor", "Value"),
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "social",
      type: "group",
      label: bl("Redes sociais", "Social"),
      fields: [
        {
          name: "title",
          type: "text",
          label: common.title,
          required: true,
          defaultValue: "SEGUE-NOS",
        },
        {
          name: "links",
          type: "array",
          label: bl("Ligações", "Links"),
          labels: {
            singular: bl("Ligação", "Link"),
            plural: bl("Ligações", "Links"),
          },
          fields: [
            {
              name: "platform",
              type: "select",
              label: bl("Plataforma", "Platform"),
              required: true,
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "Instagram", value: "instagram" },
              ],
            },
            {
              name: "url",
              type: "text",
              label: bl("URL", "URL"),
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "legalLinks",
      type: "array",
      label: bl("Ligações legais", "Legal links"),
      labels: {
        singular: bl("Ligação", "Link"),
        plural: bl("Ligações", "Links"),
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
        },
      ],
    },
  ],
};
