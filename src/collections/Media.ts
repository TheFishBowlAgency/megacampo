import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    adminThumbnail: ({ doc }) => {
      if (typeof doc.url === "string" && doc.url.length > 0) {
        return doc.url;
      }

      return "";
    },
    filenameCompoundIndex: ["prefix", "filename"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
