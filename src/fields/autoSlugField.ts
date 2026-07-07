import type { Field } from "payload";

import { type AdminLabel, common } from "@/i18n/labels";

export function autoSlugField(sourceLabel: AdminLabel): Field {
  return {
    name: "slug",
    type: "text",
    label: common.slug,
    required: true,
    unique: true,
    index: true,
    admin: {
      readOnly: true,
      position: "sidebar",
      description: {
        pt: `Gerado automaticamente a partir de ${sourceLabel.pt}.`,
        en: `Auto-generated from ${sourceLabel.en}.`,
      },
    },
  };
}
