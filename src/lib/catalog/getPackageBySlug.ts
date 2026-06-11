import config from "@payload-config";
import { getPayload } from "payload";

import type { Media, Package, PackageCategory } from "@/payload-types";
import { getProductBySlug } from "@/data/products";
import { slugify } from "@/lib/slugify";
import { getPackageCategoryByActivitySlug } from "@/lib/package-categories/getPackageCategories";
import { getCategoryPathSlug } from "@/lib/package-categories/slugHelpers";

import { formatPriceFromCents } from "./formatPrice";
import {
  buildFullPackageSlug,
  getPackagePathSlug,
} from "./packageSlugHelpers";
import {
  resolvePackageConfig,
  type PackageDoc,
  type ResolvedPackageConfig,
} from "./resolvePackageConfig";

export type PackageDetailData = {
  id: string;
  name: string;
  slug: string;
  price: string;
  imageSrc?: string;
  config: ResolvedPackageConfig;
  category: PackageCategory;
};

function resolveMediaUrl(image: Package["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

function toPackageDoc(pkg: Package): PackageDoc {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    basePriceCents: pkg.basePriceCents,
    templatePackage: pkg.templatePackage ?? null,
    templateOverrides: pkg.templateOverrides ?? null,
    extraGroupConfigs: pkg.extraGroupConfigs ?? null,
  };
}

async function loadPackageTemplates(
  rootPackage: Package,
): Promise<Map<string, PackageDoc>> {
  const payload = await getPayload({ config });
  const byId = new Map<string, PackageDoc>();
  const pending = new Set<string>();

  const queueTemplate = (value: Package["templatePackage"]) => {
    if (!value) return;
    const id = typeof value === "string" ? value : value.id;
    pending.add(id);
  };

  queueTemplate(rootPackage.templatePackage);

  while (pending.size > 0) {
    const batch = [...pending];
    pending.clear();

    const { docs } = await payload.find({
      collection: "packages",
      where: {
        id: {
          in: batch,
        },
      },
      depth: 3,
      limit: batch.length,
      pagination: false,
    });

    for (const doc of docs) {
      byId.set(doc.id, toPackageDoc(doc));
      queueTemplate(doc.templatePackage);
    }
  }

  return byId;
}

function parsePriceToCents(price: string): number {
  const normalized = price.replace(",", ".");
  return Math.round(Number.parseFloat(normalized) * 100);
}

function buildFallbackPackageDetail(
  activitySlug: string,
  categoryPathSlug: string,
  packagePathSlug: string,
  category: PackageCategory,
): PackageDetailData | null {
  const product = getProductBySlug(activitySlug);
  if (!product) return null;

  const fallbackPackage = product.packages.find(
    (pkg) => (pkg.slug ?? pkg.id) === packagePathSlug,
  );
  if (!fallbackPackage) return null;

  return {
    id: fallbackPackage.id,
    name: fallbackPackage.name,
    slug: packagePathSlug,
    price: fallbackPackage.price,
    config: {
      packageId: fallbackPackage.id,
      name: fallbackPackage.name,
      slug: packagePathSlug,
      basePriceCents: parsePriceToCents(fallbackPackage.price),
      extraGroups: [],
    },
    category,
  };
}

export async function getPackageByActivityCategorySlug(
  activitySlug: string,
  categoryPathSlug: string,
  packagePathSlug: string,
): Promise<PackageDetailData | null> {
  const category = await getPackageCategoryByActivitySlug(
    activitySlug,
    categoryPathSlug,
  );
  if (!category) return null;

  const fullPackageSlug = buildFullPackageSlug(
    activitySlug,
    categoryPathSlug,
    packagePathSlug,
  );

  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "packages",
    where: {
      and: [
        {
          slug: {
            equals: fullPackageSlug,
          },
        },
        {
          isActive: {
            equals: true,
          },
        },
      ],
    },
    depth: 3,
    limit: 1,
    pagination: false,
  });

  const pkg = docs[0];
  if (!pkg) {
    return buildFallbackPackageDetail(
      activitySlug,
      categoryPathSlug,
      packagePathSlug,
      category,
    );
  }

  const templates = await loadPackageTemplates(pkg);
  const resolvedConfig = resolvePackageConfig(toPackageDoc(pkg), (templateId) =>
    templates.get(templateId),
  );

  return {
    id: pkg.id,
    name: pkg.name,
    slug: getPackagePathSlug(activitySlug, categoryPathSlug, pkg.slug),
    price: formatPriceFromCents(pkg.basePriceCents),
    imageSrc: resolveMediaUrl(pkg.image),
    config: resolvedConfig,
    category,
  };
}

export async function getAllPackageParams(): Promise<
  Array<{ slug: string; categorySlug: string; packageSlug: string }>
> {
  const payload = await getPayload({ config });
  const params = new Map<string, { slug: string; categorySlug: string; packageSlug: string }>();

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

    if (!activity?.slug || !category?.slug) {
      continue;
    }

    const categoryPathSlug = getCategoryPathSlug(activity.slug, category.slug);
    const packageSlug = getPackagePathSlug(
      activity.slug,
      categoryPathSlug,
      pkg.slug,
    );
    const key = `${activity.slug}/${categoryPathSlug}/${packageSlug}`;

    params.set(key, {
      slug: activity.slug,
      categorySlug: categoryPathSlug,
      packageSlug,
    });
  }

  const { docs: categories } = await payload.find({
    collection: "package-categories",
    depth: 1,
    limit: 100,
    pagination: false,
  });

  for (const category of categories) {
    const activity =
      category.activity && typeof category.activity === "object"
        ? category.activity
        : null;
    if (!activity?.slug) continue;

    const product = getProductBySlug(activity.slug);
    if (!product) continue;

    const categoryPathSlug = getCategoryPathSlug(activity.slug, category.slug);

    for (const pkg of product.packages) {
      const packageSlug = pkg.slug ?? slugify(pkg.id);
      const key = `${activity.slug}/${categoryPathSlug}/${packageSlug}`;
      if (!params.has(key)) {
        params.set(key, {
          slug: activity.slug,
          categorySlug: categoryPathSlug,
          packageSlug,
        });
      }
    }
  }

  return [...params.values()];
}

export function getFallbackPackagePathSlug(packageId: string, name: string): string {
  return slugify(packageId) || slugify(name);
}
