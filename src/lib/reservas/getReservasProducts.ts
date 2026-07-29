import config from "@payload-config";
import { getPayload } from "payload";

import type { Media, Package } from "@/payload-types";
import { getActivityBySlug } from "@/lib/activities/getActivityBySlug";
import { formatPriceFromCents } from "@/lib/catalog/formatPrice";
import {
  buildFlatPackagePath,
  buildPackagePath,
  getFlatPackagePathSlug,
  getPackagePathSlug,
} from "@/lib/catalog/packageSlugHelpers";
import { getCategoryPathSlug } from "@/lib/package-categories/slugHelpers";
import { slugify } from "@/lib/slugify";

export interface ReservasSidebarItem {
  slug: string;
  name: string;
}

export interface ReservasProductItem {
  id: string;
  slug: string;
  name: string;
  price: string;
  imageSrc?: string;
  detailHref: string;
}

export type ReservasPackageRoute =
  | {
      kind: "categorized";
      activitySlug: string;
      categoryPathSlug: string;
      packagePathSlug: string;
    }
  | {
      kind: "flat";
      activitySlug: string;
      packagePathSlug: string;
    };

function resolveMediaUrl(image: Package["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

function buildDetailHref(
  activitySlug: string,
  categoryPathSlug: string | null,
  packagePathSlug: string,
): string {
  if (categoryPathSlug) {
    return buildPackagePath(activitySlug, categoryPathSlug, packagePathSlug);
  }

  return buildFlatPackagePath(activitySlug, packagePathSlug);
}

export async function getReservasSidebarItems(): Promise<ReservasSidebarItem[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "activities",
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: "sort",
    depth: 0,
    limit: 100,
    pagination: false,
  });

  return docs.map((activity) => ({
    slug: activity.slug,
    name: activity.title,
  }));
}

export async function getReservasProductsByActivitySlug(
  activitySlug: string,
): Promise<ReservasProductItem[]> {
  const activity = await getActivityBySlug(activitySlug);
  if (!activity) return [];

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "packages",
    where: {
      and: [
        {
          activity: {
            equals: activity.id,
          },
        },
        {
          isActive: {
            equals: true,
          },
        },
      ],
    },
    sort: "sort",
    depth: 1,
    limit: 200,
    pagination: false,
  });

  return docs.map((pkg) => {
    const category =
      pkg.category && typeof pkg.category === "object" ? pkg.category : null;
    const categoryPathSlug =
      category?.slug != null
        ? getCategoryPathSlug(activitySlug, category.slug)
        : null;
    const packagePathSlug = categoryPathSlug
      ? getPackagePathSlug(activitySlug, categoryPathSlug, pkg.slug)
      : getFlatPackagePathSlug(activitySlug, pkg.slug);

    return {
      id: pkg.id,
      slug: packagePathSlug,
      name: pkg.name,
      price: formatPriceFromCents(pkg.basePriceCents),
      imageSrc: resolveMediaUrl(pkg.image),
      detailHref: buildDetailHref(
        activitySlug,
        categoryPathSlug,
        packagePathSlug,
      ),
    };
  });
}

export async function resolveReservasPackageRoute(
  activitySlug: string,
  packagePathSlug: string,
): Promise<ReservasPackageRoute | null> {
  const activity = await getActivityBySlug(activitySlug);
  if (!activity) return null;

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "packages",
    where: {
      and: [
        {
          activity: {
            equals: activity.id,
          },
        },
        {
          isActive: {
            equals: true,
          },
        },
      ],
    },
    depth: 1,
    limit: 200,
    pagination: false,
  });

  for (const pkg of docs) {
    const category =
      pkg.category && typeof pkg.category === "object" ? pkg.category : null;

    if (category?.slug) {
      const categoryPathSlug = getCategoryPathSlug(activitySlug, category.slug);
      const resolvedPackageSlug = getPackagePathSlug(
        activitySlug,
        categoryPathSlug,
        pkg.slug,
      );

      if (resolvedPackageSlug === packagePathSlug) {
        return {
          kind: "categorized",
          activitySlug,
          categoryPathSlug,
          packagePathSlug,
        };
      }

      continue;
    }

    const resolvedPackageSlug = getFlatPackagePathSlug(activitySlug, pkg.slug);
    if (resolvedPackageSlug === packagePathSlug) {
      return {
        kind: "flat",
        activitySlug,
        packagePathSlug,
      };
    }
  }

  return null;
}

export async function getReservasProductParams(): Promise<
  Array<{ slug: string; productSlug: string }>
> {
  const payload = await getPayload({ config });
  const params = new Map<string, { slug: string; productSlug: string }>();

  const { docs } = await payload.find({
    collection: "packages",
    where: {
      isActive: {
        equals: true,
      },
    },
    depth: 2,
    limit: 500,
    pagination: false,
  });

  for (const pkg of docs) {
    const activity =
      pkg.activity && typeof pkg.activity === "object" ? pkg.activity : null;
    const category =
      pkg.category && typeof pkg.category === "object" ? pkg.category : null;

    if (!activity?.slug) continue;

    const categoryPathSlug =
      category?.slug != null
        ? getCategoryPathSlug(activity.slug, category.slug)
        : null;
    const packagePathSlug = categoryPathSlug
      ? getPackagePathSlug(activity.slug, categoryPathSlug, pkg.slug)
      : getFlatPackagePathSlug(activity.slug, pkg.slug);

    const key = `${activity.slug}/${packagePathSlug}`;
    params.set(key, { slug: activity.slug, productSlug: packagePathSlug });
  }

  return [...params.values()];
}
