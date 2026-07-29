import type { Field } from "payload";

import { common } from "@/i18n/labels";

export const mediaImageField = (options?: { required?: boolean }): Field => ({
  name: "image",
  type: "upload",
  relationTo: "media",
  label: common.image,
  required: options?.required ?? false,
});
