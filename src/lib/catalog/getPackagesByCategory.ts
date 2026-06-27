import config from "@payload-config";
import { getPayload } from "payload";

import type { Package } from "@/payload-types";
import { slugify } from "@/lib/slugify";

import { derivePackageFeatures } from "./derivePackageFeatures";
import { formatPriceFromCents } from "./formatPrice";
import { loadPackageTemplates } from "./loadPackageTemplates";
import { toPackageDoc } from "./packageDoc";
import {
  getFlatPackagePathSlug,
  getPackagePathSlug,
} from "./packageSlugHelpers";
import { resolvePackageConfig } from "./resolvePackageConfig";
import type { PackageCardItem } from "./types";

export async function mapPackageToCardItem(
  pkg: Package,
  slugContext: {
    activitySlug: string;
    categoryPathSlug?: string;
  },
): Promise<PackageCardItem> {
  const templates = await loadPackageTemplates(pkg);
  const resolvedConfig = resolvePackageConfig(toPackageDoc(pkg), (templateId) =>
    templates.get(templateId),
  );

  const pathSlug = slugContext.categoryPathSlug
    ? getPackagePathSlug(
        slugContext.activitySlug,
        slugContext.categoryPathSlug,
        pkg.slug,
      )
    : getFlatPackagePathSlug(slugContext.activitySlug, pkg.slug);

  return {
    id: pkg.id,
    slug: pathSlug,
    name: pkg.name.toUpperCase(),
    price: formatPriceFromCents(pkg.basePriceCents),
    perPersonLabel: "Por pessoa",
    features: derivePackageFeatures(resolvedConfig),
    ctaLabel: "RESERVA JÁ",
  };
}

export async function getPackagesByCategoryId(
  categoryId: string,
  slugContext: {
    activitySlug: string;
    categoryPathSlug: string;
  },
): Promise<PackageCardItem[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "packages",
    where: {
      and: [
        {
          category: {
            equals: categoryId,
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
    depth: 3,
    limit: 100,
    pagination: false,
  });

  return Promise.all(docs.map((doc) => mapPackageToCardItem(doc, slugContext)));
}

export async function getUncategorizedPackagesByActivityId(
  activityId: string,
  activitySlug: string,
): Promise<PackageCardItem[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "packages",
    where: {
      and: [
        {
          activity: {
            equals: activityId,
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
    depth: 3,
    limit: 100,
    pagination: false,
  });

  const uncategorized = docs.filter((doc) => !doc.category);

  return Promise.all(
    uncategorized.map((doc) =>
      mapPackageToCardItem(doc, { activitySlug }),
    ),
  );
}

export function getFallbackPackagePathSlug(
  packageId: string,
  name: string,
): string {
  return slugify(packageId) || slugify(name);
}
