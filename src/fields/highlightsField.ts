import type { Field } from "payload";

import { bl, common } from "@/i18n/labels";

/** Label chips shown under activity/category package heroes. */
export const highlightsField = (): Field => ({
  name: "highlights",
  type: "array",
  label: common.highlights,
  admin: {
    description: bl(
      "Etiquetas sob o hero da página de pacotes (ex.: 12 MAPAS).",
      "Chips under the packages page hero (e.g. 12 MAPAS).",
    ),
  },
  fields: [
    {
      name: "label",
      type: "text",
      label: common.label,
      required: true,
    },
  ],
});
