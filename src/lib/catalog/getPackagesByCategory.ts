import config from "@payload-config";
import { getPayload } from "payload";

import type { ProductPackage } from "@/data/products";
import type { Package } from "@/payload-types";
import { slugify } from "@/lib/slugify";

import { formatPriceFromCents } from "./formatPrice";
import { getPackagePathSlug } from "./packageSlugHelpers";

function findFallbackPackage(
  fallbackPackages: ProductPackage[],
  cmsPackage: Package,
): ProductPackage | undefined {
  const nameKey = slugify(cmsPackage.name);

  return fallbackPackages.find(
    (item) =>
      item.id === nameKey ||
      slugify(item.name) === nameKey ||
      item.name.toLowerCase() === cmsPackage.name.toLowerCase(),
  );
}

export function mapPackageToProductPackage(
  pkg: Package,
  fallbackPackages: ProductPackage[] = [],
  slugContext?: {
    activitySlug: string;
    categoryPathSlug: string;
  },
): ProductPackage {
  const fallback =
    findFallbackPackage(fallbackPackages, pkg) ?? fallbackPackages[0];
  const pathSlug = slugContext
    ? getPackagePathSlug(
        slugContext.activitySlug,
        slugContext.categoryPathSlug,
        pkg.slug,
      )
    : fallback?.slug ?? slugify(pkg.name);

  return {
    id: pkg.id,
    slug: pathSlug,
    name: pkg.name.toUpperCase(),
    price: formatPriceFromCents(pkg.basePriceCents),
    perPersonLabel: fallback?.perPersonLabel,
    popular: fallback?.popular,
    features: fallback?.features ?? [],
    ctaLabel: fallback?.ctaLabel,
  };
}

export async function getPackagesByCategoryId(
  categoryId: string,
  fallbackPackages: ProductPackage[] = [],
  slugContext?: {
    activitySlug: string;
    categoryPathSlug: string;
  },
): Promise<ProductPackage[]> {
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
    depth: 0,
    limit: 100,
    pagination: false,
  });

  if (docs.length === 0) {
    return fallbackPackages;
  }

  return docs.map((doc) =>
    mapPackageToProductPackage(doc, fallbackPackages, slugContext),
  );
}
