import type { CollectionConfig } from "payload";

import { anyone, cmsEditor, hideFromNonCms } from "@/access/roles";
import { mediaImageField } from "@/fields/mediaImageField";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: { pt: "Testemunho", en: "Testimonial" },
    plural: { pt: "Testemunhos", en: "Testimonials" },
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "featured", "sort", "isActive"],
    group: adminGroups.content,
    hidden: hideFromNonCms,
  },
  access: {
    read: anyone,
    create: cmsEditor,
    update: cmsEditor,
    delete: cmsEditor,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: bl("Nome", "Name"),
      required: true,
    },
    {
      name: "quote",
      type: "textarea",
      label: bl("Citação", "Quote"),
      required: true,
      localized: true,
    },
    mediaImageField(),
    {
      name: "featured",
      type: "checkbox",
      label: bl("Em destaque", "Featured"),
      defaultValue: false,
    },
    {
      name: "stars",
      type: "number",
      label: bl("Estrelas", "Stars"),
      min: 1,
      max: 5,
      defaultValue: 5,
    },
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
