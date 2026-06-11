import { joinSlugParts } from "@/lib/slugify";

import type { PackageCategory } from "@/payload-types";

export function getActivitySlugFromRelation(
  activity: PackageCategory["activity"],
): string | null {
  if (!activity || typeof activity === "string") {
    return null;
  }

  return activity.slug;
}

export function getCategoryPathSlug(
  activitySlug: string,
  categorySlug: string,
): string {
  const prefix = `${activitySlug}-`;

  if (categorySlug.startsWith(prefix)) {
    return categorySlug.slice(prefix.length);
  }

  return categorySlug;
}

export function buildPackageCategoryPath(
  activitySlug: string,
  categorySlug: string,
): string {
  return `/atividades/${activitySlug}/${getCategoryPathSlug(activitySlug, categorySlug)}`;
}

export function buildFullPackageCategorySlug(
  activitySlug: string,
  categoryPathSlug: string,
): string {
  return joinSlugParts(activitySlug, categoryPathSlug);
}
