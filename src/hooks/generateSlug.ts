import type { CollectionBeforeValidateHook, CollectionSlug } from "payload";

import {
  buildActivityScopedSlug,
  buildPackageSlug,
  ensureUniqueSlug,
} from "@/hooks/slugHelpers";
import { slugify } from "@/lib/slugify";

type SlugData = Record<string, unknown>;

type GenerateSlugHookOptions = {
  collectionSlug: CollectionSlug;
  sourceField: string;
  buildBaseSlug?: (
    data: SlugData,
    req: Parameters<CollectionBeforeValidateHook>[0]["req"],
  ) => Promise<string> | string;
};

export function generateSlugBeforeValidate(
  options: GenerateSlugHookOptions,
): CollectionBeforeValidateHook {
  return async ({ data, req, operation, originalDoc }) => {
    if (!data) return data;

    const sourceValue = data[options.sourceField];

    if (typeof sourceValue !== "string" || !sourceValue.trim()) {
      return data;
    }

    const baseSlug = options.buildBaseSlug
      ? await options.buildBaseSlug(data, req)
      : slugify(sourceValue);

    if (!baseSlug) return data;

    data.slug = await ensureUniqueSlug(
      req,
      options.collectionSlug,
      baseSlug,
      operation === "update" ? originalDoc?.id : undefined,
    );

    return data;
  };
}

export const generateActivitySlug = generateSlugBeforeValidate({
  collectionSlug: "activities",
  sourceField: "title",
});

export const generateEventSlug = generateSlugBeforeValidate({
  collectionSlug: "events",
  sourceField: "title",
});

export const generatePackageCategorySlug = generateSlugBeforeValidate({
  collectionSlug: "package-categories",
  sourceField: "title",
  buildBaseSlug: (data, req) =>
    buildActivityScopedSlug(
      req,
      data.activity as Parameters<typeof buildActivityScopedSlug>[1],
      String(data.title ?? ""),
    ),
});

export const generatePackageSlug = generateSlugBeforeValidate({
  collectionSlug: "packages",
  sourceField: "name",
  buildBaseSlug: (data, req) =>
    buildPackageSlug(req, {
      activity: data.activity as Parameters<
        typeof buildPackageSlug
      >[1]["activity"],
      category: data.category as Parameters<
        typeof buildPackageSlug
      >[1]["category"],
      name: typeof data.name === "string" ? data.name : null,
    }),
});

export const generateGroupExtraSlug = generateSlugBeforeValidate({
  collectionSlug: "group-extras",
  sourceField: "name",
});
