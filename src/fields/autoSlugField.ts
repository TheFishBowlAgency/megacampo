import type { Field } from "payload";

export function autoSlugField(sourceLabel: string): Field {
  return {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      readOnly: true,
      position: "sidebar",
      description: `Auto-generated from ${sourceLabel}.`,
    },
  };
}
