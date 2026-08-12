import type { GlobalConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

const navLinkFields = [
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
    admin: {
      description: bl(
        "Caminho interno (ex.: /como) ou âncora (ex.: /#contactos).",
        "Internal path (e.g. /como) or anchor (e.g. /#contactos).",
      ),
    },
  },
];

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
      localized: true,
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
          localized: true,
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
      label: bl("Navegação (desktop)", "Navigation (desktop)"),
      labels: {
        singular: bl("Ligação", "Link"),
        plural: bl("Ligações", "Links"),
      },
      admin: {
        initCollapsed: false,
      },
      fields: navLinkFields,
    },
    {
      name: "mobileNavLinks",
      type: "array",
      label: bl("Navegação (mobile)", "Navigation (mobile)"),
      labels: {
        singular: bl("Ligação", "Link"),
        plural: bl("Ligações", "Links"),
      },
      admin: {
        description: bl(
          "Ligações do menu mobile. Se vazio, usa a navegação desktop.",
          "Mobile menu links. If empty, falls back to desktop navigation.",
        ),
        initCollapsed: false,
      },
      fields: navLinkFields,
    },
    {
      name: "labels",
      type: "group",
      label: bl("Etiquetas da interface", "UI labels"),
      fields: [
        {
          name: "languageSelectAria",
          type: "text",
          label: bl("Aria: selecionar idioma", "Aria: select language"),
          required: true,
          defaultValue: "Selecionar idioma",
          localized: true,
        },
        {
          name: "openMenuAria",
          type: "text",
          label: bl("Aria: abrir menu", "Aria: open menu"),
          required: true,
          defaultValue: "Abrir menu",
          localized: true,
        },
        {
          name: "closeMenuAria",
          type: "text",
          label: bl("Aria: fechar menu", "Aria: close menu"),
          required: true,
          defaultValue: "Fechar menu",
          localized: true,
        },
        {
          name: "menuAria",
          type: "text",
          label: bl("Aria: menu", "Aria: menu"),
          required: true,
          defaultValue: "Menu",
          localized: true,
        },
        {
          name: "searchAria",
          type: "text",
          label: bl("Aria: pesquisar", "Aria: search"),
          required: true,
          defaultValue: "Pesquisar",
          localized: true,
        },
        {
          name: "cartAria",
          type: "text",
          label: bl("Aria: carrinho", "Aria: cart"),
          required: true,
          defaultValue: "Carrinho",
          localized: true,
        },
        {
          name: "bagLabel",
          type: "text",
          label: bl("Etiqueta do carrinho (mobile)", "Bag label (mobile)"),
          required: true,
          defaultValue: "Carrinho",
          localized: true,
        },
        {
          name: "searchLabel",
          type: "text",
          label: bl("Etiqueta de pesquisa (mobile)", "Search label (mobile)"),
          required: true,
          defaultValue: "Pesquisar",
          localized: true,
        },
        {
          name: "cartHref",
          type: "text",
          label: bl("URL do carrinho", "Cart URL"),
          required: true,
          defaultValue: "/carrinho",
        },
      ],
    },
    {
      name: "languages",
      type: "array",
      label: bl("Idiomas", "Languages"),
      labels: {
        singular: bl("Idioma", "Language"),
        plural: bl("Idiomas", "Languages"),
      },
      minRows: 1,
      fields: [
        {
          name: "code",
          type: "select",
          label: bl("Código", "Code"),
          required: true,
          options: [
            { label: "Português (pt)", value: "pt" },
            { label: "English (en)", value: "en" },
            { label: "Español (es)", value: "es" },
          ],
        },
        {
          name: "label",
          type: "text",
          label: common.label,
          required: true,
        },
      ],
    },
    {
      name: "promoMessage",
      type: "text",
      label: bl("Mensagem promocional", "Promo message"),
      admin: {
        description: bl(
          "Barra escura abaixo do cabeçalho em páginas de carrinho/checkout.",
          "Dark bar below the header on cart/checkout pages.",
        ),
      },
      defaultValue: "Desconto online de 20% em todos os extras",
      localized: true,
    },
    {
      name: "seo",
      type: "group",
      label: bl("SEO do site", "Site SEO"),
      fields: [
        {
          name: "title",
          type: "text",
          label: bl("Título", "Title"),
          required: true,
          defaultValue:
            "Megacampo | O maior parque de paintball da Península Ibérica",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: common.description,
          required: true,
          defaultValue:
            "Experiência 12 mapas em 60 hectares. Paintball, airsoft, lasertag. Reservas e eventos.",
          localized: true,
        },
      ],
    },
  ],
};
