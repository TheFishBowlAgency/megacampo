import type { CollectionConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { autoSlugField } from "@/fields/autoSlugField";
import { mediaImageField } from "@/fields/mediaImageField";
import { generatePostSlug } from "@/hooks/generateSlug";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: { pt: "Artigo", en: "Post" },
    plural: { pt: "Artigos", en: "Posts" },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "sort", "isActive"],
    group: adminGroups.content,
    hidden: hideFromNonCms,
  },
  access: {
    read: anyone,
    create: cmsEditor,
    update: cmsEditor,
    delete: cmsEditor,
  },
  hooks: {
    beforeValidate: [generatePostSlug],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: common.title,
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      label: bl("Excerto", "Excerpt"),
      required: true,
      admin: {
        description: bl(
          "Resumo curto nos cartões da listagem do blog.",
          "Short summary shown on blog listing cards.",
        ),
      },
    },
    {
      name: "body",
      type: "richText",
      label: bl("Corpo", "Body"),
      required: true,
      admin: {
        description: bl(
          "Texto completo do artigo na página de detalhe.",
          "Full article text on the detail page.",
        ),
      },
    },
    autoSlugField(bl("título", "title")),
    mediaImageField(),
    {
      name: "sort",
      type: "number",
      label: common.sort,
      defaultValue: 0,
    },
    {
      name: "isActive",
      type: "checkbox",
      label: common.isActive,
      defaultValue: true,
    },
  ],
};
