import type { Field } from "payload";

export const mediaImageField = (options?: { required?: boolean }): Field => ({
  name: "image",
  type: "upload",
  relationTo: "media",
  required: options?.required ?? false,
});
