import { joinSlugParts } from "@/lib/slugify";

/** CMS category slug, e.g. `paintball-paintball-group`. */
function scopedCategorySlug(
  activitySlug: string,
  categoryPathSlug: string,
): string {
  return joinSlugParts(activitySlug, categoryPathSlug);
}

/**
 * Extract the URL path segment for a package from its CMS slug.
 * CMS slugs are `{activity}-{category}-{name}`, e.g.
 * `paintball-paintball-paintball-group-commando` → `commando`.
 */
export function getPackagePathSlug(
  activitySlug: string,
  categoryPathSlug: string,
  fullPackageSlug: string,
): string {
  const prefix = joinSlugParts(
    activitySlug,
    scopedCategorySlug(activitySlug, categoryPathSlug),
  );

  if (fullPackageSlug.startsWith(`${prefix}-`)) {
    return fullPackageSlug.slice(prefix.length + 1);
  }

  return fullPackageSlug;
}

/**
 * URL path segment for packages without a category.
 * CMS slug `airsoft-airsoft` → `airsoft`.
 */
export function getFlatPackagePathSlug(
  activitySlug: string,
  fullPackageSlug: string,
): string {
  const prefix = `${activitySlug}-`;

  if (fullPackageSlug.startsWith(prefix)) {
    return fullPackageSlug.slice(prefix.length);
  }

  return fullPackageSlug;
}

/** Reconstruct the CMS package slug for database lookups. */
export function buildFullPackageSlug(
  activitySlug: string,
  categoryPathSlug: string,
  packagePathSlug: string,
): string {
  return joinSlugParts(
    activitySlug,
    scopedCategorySlug(activitySlug, categoryPathSlug),
    packagePathSlug,
  );
}

/** CMS slug for packages without a category, e.g. `airsoft-airsoft`. */
export function buildFlatFullPackageSlug(
  activitySlug: string,
  packagePathSlug: string,
): string {
  return joinSlugParts(activitySlug, packagePathSlug);
}

export function buildPackagePath(
  activitySlug: string,
  categoryPathSlug: string,
  packagePathSlug: string,
): string {
  return `/atividades/${activitySlug}/${categoryPathSlug}/${packagePathSlug}`;
}

export function buildFlatPackagePath(
  activitySlug: string,
  packagePathSlug: string,
): string {
  return `/atividades/${activitySlug}/${packagePathSlug}`;
}
