import type { CollectionConfig } from "payload";

import { anyone, hideFromNonOperations, operationsAdmin } from "@/access/roles";
import { autoSlugField } from "@/fields/autoSlugField";
import { highlightsField } from "@/fields/highlightsField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generateActivitySlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Activities: CollectionConfig = {
  slug: "activities",
  labels: {
    singular: { pt: "Atividade", en: "Activity" },
    plural: { pt: "Atividades", en: "Activities" },
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
    beforeValidate: [generateActivitySlug],
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
          "Resumo curto apresentado nos cartões de atividade.",
          "Short summary shown on activity cards.",
        ),
      },
    },
    autoSlugField(bl("título", "title")),
    mediaImageField(),
    highlightsField(),
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
    {
      name: "groupExtras",
      type: "relationship",
      relationTo: "group-extras",
      hasMany: true,
      label: bl("Extras de grupo", "Group extras"),
      admin: {
        description: bl(
          "Extras opcionais para o grupo mostrados no separador «Melhora a tua atividade».",
          "Optional group add-ons shown in the «Improve your activity» tab.",
        ),
      },
      filterOptions: {
        isActive: {
          equals: true,
        },
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      label: common.isActive,
      defaultValue: true,
    },
  ],
};
