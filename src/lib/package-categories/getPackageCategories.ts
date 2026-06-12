import config from "@payload-config";
import { getPayload } from "payload";

import type { Media, PackageCategory } from "@/payload-types";

import {
  buildFullPackageCategorySlug,
  buildPackageCategoryPath,
  getActivitySlugFromRelation,
  getCategoryPathSlug,
} from "./slugHelpers";
import type { PackageCategoryCardItem } from "./types";

function resolveMediaUrl(image: PackageCategory["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapPackageCategoryToCardItem(
  category: PackageCategory,
): PackageCategoryCardItem {
  const activitySlug = getActivitySlugFromRelation(category.activity);
  const href = activitySlug
    ? buildPackageCategoryPath(activitySlug, category.slug)
    : `/reservas/${category.slug}`;

  return {
    id: category.id,
    title: category.title.toUpperCase(),
    tag: category.title.toUpperCase(),
    subtitle: category.minAge ?? "",
    description: category.description ?? "",
    href,
    imageSrc: resolveMediaUrl(category.image),
  };
}

export async function getPackageCategoriesByActivityId(
  activityId: string,
): Promise<PackageCategoryCardItem[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "package-categories",
    where: {
      activity: {
        equals: activityId,
      },
    },
    sort: "sort",
    depth: 1,
    limit: 100,
    pagination: false,
  });

  return docs.map(mapPackageCategoryToCardItem);
}

export async function getPackageCategoryByActivitySlug(
  activitySlug: string,
  categoryPathSlug: string,
): Promise<PackageCategory | null> {
  const payload = await getPayload({ config });

  const fullSlug = buildFullPackageCategorySlug(activitySlug, categoryPathSlug);

  const { docs } = await payload.find({
    collection: "package-categories",
    where: {
      slug: {
        equals: fullSlug,
      },
    },
    limit: 1,
    depth: 1,
    pagination: false,
  });

  return docs[0] ?? null;
}

export async function getAllPackageCategoryParams(): Promise<
  Array<{ slug: string; categorySlug: string }>
> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "package-categories",
    limit: 100,
    depth: 1,
    pagination: false,
  });

  return docs.flatMap((category) => {
    const activitySlug = getActivitySlugFromRelation(category.activity);

    if (!activitySlug) {
      return [];
    }

    return [
      {
        slug: activitySlug,
        categorySlug: getCategoryPathSlug(activitySlug, category.slug),
      },
    ];
  });
}
