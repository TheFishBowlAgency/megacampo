import config from "@payload-config";
import { getPayload } from "payload";

import type { Media, Package, PackageCategory } from "@/payload-types";
import { getActivityBySlug } from "@/lib/activities/getActivityBySlug";
import { getPackageCategoryByActivitySlug } from "@/lib/package-categories/getPackageCategories";
import { getCategoryPathSlug } from "@/lib/package-categories/slugHelpers";

import { formatPriceFromCents } from "./formatPrice";
import { loadPackageTemplates } from "./loadPackageTemplates";
import { toPackageDoc } from "./packageDoc";
import {
  buildFlatFullPackageSlug,
  buildFullPackageSlug,
  getFlatPackagePathSlug,
  getPackagePathSlug,
} from "./packageSlugHelpers";
import {
  resolvePackageConfig,
  type ResolvedPackageConfig,
} from "./resolvePackageConfig";

export type PackageDetailData = {
  id: string;
  name: string;
  slug: string;
  price: string;
  imageSrc?: string;
  config: ResolvedPackageConfig;
  category?: PackageCategory | null;
  /** Included items for the detail “Incluído na atividade” tab. */
  highlights: string[];
};

function resolveMediaUrl(image: Package["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

async function buildPackageDetailData(
  pkg: Package,
  activitySlug: string,
  pathSlug: string,
  category?: PackageCategory | null,
): Promise<PackageDetailData> {
  const templates = await loadPackageTemplates(pkg);
  const resolvedConfig = resolvePackageConfig(toPackageDoc(pkg), (templateId) =>
    templates.get(templateId),
  );

  return {
    id: pkg.id,
    name: pkg.name,
    slug: pathSlug,
    price: formatPriceFromCents(pkg.basePriceCents),
    imageSrc: resolveMediaUrl(pkg.image),
    config: resolvedConfig,
    category,
    highlights:
      pkg.highlights
        ?.map((item) => item.label?.trim())
        .filter((label): label is string => Boolean(label)) ?? [],
  };
}

export async function getPackageByActivitySlug(
  activitySlug: string,
  packagePathSlug: string,
): Promise<PackageDetailData | null> {
  const activity = await getActivityBySlug(activitySlug);
  if (!activity) return null;

  const fullPackageSlug = buildFlatFullPackageSlug(
    activitySlug,
    packagePathSlug,
  );

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
  if (!pkg) return null;

  const hasCategory =
    pkg.category != null &&
    (typeof pkg.category === "string" ? pkg.category.length > 0 : true);
  if (hasCategory) return null;

  return buildPackageDetailData(
    pkg,
    activitySlug,
    getFlatPackagePathSlug(activitySlug, pkg.slug),
    null,
  );
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
  if (!pkg) return null;

  return buildPackageDetailData(
    pkg,
    activitySlug,
    getPackagePathSlug(activitySlug, categoryPathSlug, pkg.slug),
    category,
  );
}

export type ActivitySegmentResolution =
  | { type: "category"; category: PackageCategory }
  | { type: "package"; package: PackageDetailData };

export async function resolveActivitySegment(
  activitySlug: string,
  segment: string,
): Promise<ActivitySegmentResolution | null> {
  const activity = await getActivityBySlug(activitySlug);
  if (!activity) return null;

  const category = await getPackageCategoryByActivitySlug(
    activitySlug,
    segment,
  );
  if (category) {
    return { type: "category", category };
  }

  const pkg = await getPackageByActivitySlug(activitySlug, segment);
  if (pkg) {
    return { type: "package", package: pkg };
  }

  return null;
}

export async function getAllFlatPackageParams(): Promise<
  Array<{ slug: string; categorySlug: string }>
> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "packages",
    where: {
      isActive: {
        equals: true,
      },
    },
    depth: 1,
    limit: 500,
    pagination: false,
  });

  return docs.flatMap((pkg) => {
    if (pkg.category) return [];

    const activity =
      pkg.activity && typeof pkg.activity === "object" ? pkg.activity : null;
    if (!activity?.slug) return [];

    const packagePathSlug = getFlatPackagePathSlug(activity.slug, pkg.slug);

    return [
      {
        slug: activity.slug,
        categorySlug: packagePathSlug,
      },
    ];
  });
}

export async function getAllActivitySegmentParams(): Promise<
  Array<{ slug: string; categorySlug: string }>
> {
  const payload = await getPayload({ config });

  const { docs: categories } = await payload.find({
    collection: "package-categories",
    limit: 100,
    depth: 1,
    pagination: false,
  });

  const categoryParams = categories.flatMap((category) => {
    const activity =
      category.activity && typeof category.activity === "object"
        ? category.activity
        : null;

    if (!activity?.slug) return [];

    return [
      {
        slug: activity.slug,
        categorySlug: getCategoryPathSlug(activity.slug, category.slug),
      },
    ];
  });

  const flatParams = await getAllFlatPackageParams();

  return [...categoryParams, ...flatParams];
}

export async function getAllPackageParams(): Promise<
  Array<{ slug: string; categorySlug: string; packageSlug: string }>
> {
  const payload = await getPayload({ config });
  const params = new Map<
    string,
    { slug: string; categorySlug: string; packageSlug: string }
  >();

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

  return [...params.values()];
}
