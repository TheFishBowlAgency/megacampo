import type { CollectionConfig } from "payload";

import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generatePackageCategorySlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const PackageCategories: CollectionConfig = {
  slug: "package-categories",
  labels: {
    singular: { pt: "Categoria de pacote", en: "Package category" },
    plural: { pt: "Categorias de pacotes", en: "Package categories" },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "activity", "slug", "sort"],
    group: adminGroups.content,
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [generatePackageCategorySlug],
  },
  fields: [
    {
      name: "activity",
      type: "relationship",
      relationTo: "activities",
      label: common.activity,
      required: true,
    },
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
          "Resumo curto apresentado nos cartões de categoria.",
          "Short summary shown on category cards.",
        ),
      },
    },
    {
      name: "minAge",
      type: "text",
      label: bl("Idade mínima", "Minimum age"),
      admin: {
        description: bl(
          'Etiqueta de requisito de idade (ex.: "+12 Anos").',
          'Age requirement label (e.g. "+12 Anos").',
        ),
      },
    },
    autoSlugField(bl("atividade e título", "activity and title")),
    mediaImageField(),
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
  ],
};
