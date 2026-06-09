import type { CollectionSlug, PayloadRequest } from "payload";

import { joinSlugParts, slugify } from "@/lib/slugify";

type RelationValue = string | { id: string; slug?: string | null } | null | undefined;

export async function resolveDocumentSlug(
  req: PayloadRequest,
  collection: CollectionSlug,
  relation: RelationValue,
): Promise<string | null> {
  if (!relation) return null;

  if (typeof relation === "object" && relation.slug) {
    return relation.slug;
  }

  const id = typeof relation === "string" ? relation : relation.id;

  const doc = await req.payload.findByID({
    collection,
    id,
    depth: 0,
  });

  if (doc && "slug" in doc && typeof doc.slug === "string") {
    return doc.slug;
  }

  return null;
}

export async function ensureUniqueSlug(
  req: PayloadRequest,
  collection: CollectionSlug,
  baseSlug: string,
  excludeId?: string | number,
): Promise<string> {
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await req.payload.find({
      collection,
      where: {
        and: [
          { slug: { equals: candidate } },
          ...(excludeId ? [{ id: { not_equals: excludeId } }] : []),
        ],
      },
      limit: 1,
      depth: 0,
    });

    if (existing.docs.length === 0) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

export async function buildActivityScopedSlug(
  req: PayloadRequest,
  activity: RelationValue,
  label: string,
): Promise<string> {
  const activitySlug = await resolveDocumentSlug(req, "activities", activity);
  return joinSlugParts(activitySlug, slugify(label));
}

export async function buildPackageSlug(
  req: PayloadRequest,
  data: {
    activity?: RelationValue;
    category?: RelationValue;
    name?: string | null;
  },
): Promise<string> {
  const activitySlug = await resolveDocumentSlug(req, "activities", data.activity);
  const categorySlug = await resolveDocumentSlug(
    req,
    "package-categories",
    data.category,
  );
  const nameSlug = data.name ? slugify(data.name) : "";

  return joinSlugParts(activitySlug, categorySlug, nameSlug);
}
