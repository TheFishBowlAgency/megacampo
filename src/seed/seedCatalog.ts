import type { Payload } from "payload";
import type { MongooseAdapter } from "@payloadcms/db-mongodb";

import type { Package } from "@/payload-types";
import { joinSlugParts, slugify } from "@/lib/slugify";

import {
  euroToCents,
  type GroupConfig,
  type PackageDef,
  type TemplateOverrideDef,
} from "./helpers";
import {
  ACTIVITIES,
  CATEGORIES,
  OPTION_GROUPS,
  OPTIONS,
} from "./optionCatalog";
import { PACKAGES } from "./packageCatalog";
import {
  ACTIVITY_GROUP_EXTRA_KEYS,
  CATEGORY_GROUP_EXTRA_KEYS,
  GROUP_EXTRAS,
} from "./groupExtrasCatalog";

const CATALOG_COLLECTIONS = [
  "packages",
  "package-categories",
  "group-extras",
  "options",
  "option-groups",
  "activities",
] as const;

type IdMap = Map<string, string>;

function buildExtraGroupConfigs(
  groups: GroupConfig[],
  optionIds: IdMap,
  groupIds: IdMap,
) {
  return groups.map((groupConfig) => ({
    group: groupIds.get(groupConfig.groupKey)!,
    sort: groupConfig.sort,
    options: groupConfig.options.map((row) => ({
      option: optionIds.get(row.optionKey)!,
      isDefault: row.default ?? false,
      priceCents: euroToCents(row.priceEur),
      priceEur: row.priceEur,
    })),
  }));
}

function buildTemplateOverrides(
  overrides: TemplateOverrideDef[],
  optionIds: IdMap,
  groupIds: IdMap,
) {
  return overrides.map((override) => {
    const base = {
      type: override.type,
      group: groupIds.get(override.groupKey)!,
    };

    switch (override.type) {
      case "replaceOption":
        return {
          ...base,
          fromOption: optionIds.get(override.fromOptionKey)!,
          toOption: optionIds.get(override.toOptionKey)!,
          ...(override.isDefault != null
            ? { isDefault: override.isDefault }
            : {}),
          ...(override.priceEur != null
            ? { priceCents: euroToCents(override.priceEur) }
            : {}),
        };
      case "excludeOption":
        return {
          ...base,
          fromOption: optionIds.get(override.fromOptionKey)!,
        };
      case "addOption":
        return {
          ...base,
          toOption: optionIds.get(override.toOptionKey)!,
          ...(override.isDefault != null
            ? { isDefault: override.isDefault }
            : {}),
          ...(override.priceEur != null
            ? { priceCents: euroToCents(override.priceEur) }
            : {}),
        };
      case "setDefault":
        return {
          ...base,
          fromOption: optionIds.get(override.fromOptionKey)!,
        };
      case "priceOverride":
        return {
          ...base,
          fromOption: optionIds.get(override.fromOptionKey)!,
          priceCents: euroToCents(override.priceEur),
        };
    }
  });
}

async function wipeCatalog(payload: Payload): Promise<void> {
  const connection = (payload.db as MongooseAdapter).connection;

  for (const collection of CATALOG_COLLECTIONS) {
    try {
      if (connection?.db) {
        await connection.db.dropCollection(collection);
        console.log(`  ${collection}: dropped`);
        continue;
      }
    } catch (error) {
      const code = (error as { code?: number }).code;
      if (code !== 26) {
        throw error;
      }
      console.log(`  ${collection}: already absent`);
      continue;
    }

    const existing = await payload.find({
      collection,
      limit: 500,
      depth: 0,
      pagination: false,
    });

    if (existing.docs.length === 0) {
      console.log(`  ${collection}: already empty`);
      continue;
    }

    await payload.delete({
      collection,
      where: {
        id: {
          in: existing.docs.map((doc) => doc.id),
        },
      },
    });

    console.log(`  ${collection}: deleted ${existing.docs.length}`);
  }
}

async function seedCatalog(payload: Payload): Promise<void> {
  const activityIds: IdMap = new Map();
  const categoryIds: IdMap = new Map();
  const groupExtraIds: IdMap = new Map();
  const groupIds: IdMap = new Map();
  const optionIds: IdMap = new Map();
  const packageIds: IdMap = new Map();

  console.log("Creating option groups...");
  for (const groupDef of OPTION_GROUPS) {
    const doc = await payload.create({
      collection: "option-groups",
      data: {
        title: groupDef.title,
        selectionType: "single",
        sort: groupDef.sort,
      },
      overrideAccess: true,
    });
    groupIds.set(groupDef.key, doc.id);
  }

  console.log("Creating options...");
  for (const optionDef of OPTIONS) {
    const doc = await payload.create({
      collection: "options",
      data: {
        group: groupIds.get(optionDef.groupKey)!,
        label: optionDef.label,
        pricingUnit: optionDef.pricingUnit ?? "per_person",
        cartBehavior: optionDef.cartBehavior ?? "inline",
        ...(optionDef.defaultPriceEur != null
          ? { defaultPriceCents: euroToCents(optionDef.defaultPriceEur) }
          : {}),
        sort: optionDef.sort,
      },
      overrideAccess: true,
    });
    optionIds.set(optionDef.key, doc.id);
  }

  console.log("Creating activities...");
  for (const activityDef of ACTIVITIES) {
    const doc = await payload.create({
      collection: "activities",
      draft: false,
      data: {
        title: activityDef.title,
        slug: slugify(activityDef.title),
        sort: activityDef.sort,
        isActive: true,
        highlights: (activityDef.highlights ?? []).map((label) => ({ label })),
      },
      overrideAccess: true,
    });
    activityIds.set(activityDef.key, doc.id);
  }

  const activitySlugs = new Map(
    ACTIVITIES.map((activity) => [activity.key, slugify(activity.title)]),
  );

  console.log("Creating group extras...");
  for (const extraDef of GROUP_EXTRAS) {
    const doc = await payload.create({
      collection: "group-extras",
      draft: false,
      data: {
        name: extraDef.name,
        slug: extraDef.key,
        priceCents: euroToCents(extraDef.priceEur),
        priceEur: extraDef.priceEur,
        sort: extraDef.sort,
        isActive: true,
      },
      overrideAccess: true,
    });
    groupExtraIds.set(extraDef.key, doc.id);
  }

  function resolveGroupExtraIds(keys: string[]): string[] {
    return keys
      .map((key) => groupExtraIds.get(key))
      .filter((id): id is string => Boolean(id));
  }

  console.log("Creating package categories...");
  for (const categoryDef of CATEGORIES) {
    const doc = await payload.create({
      collection: "package-categories",
      draft: false,
      data: {
        activity: activityIds.get(categoryDef.activityKey)!,
        title: categoryDef.title,
        slug: joinSlugParts(
          activitySlugs.get(categoryDef.activityKey),
          slugify(categoryDef.title),
        ),
        sort: categoryDef.sort,
        highlights: (categoryDef.highlights ?? []).map((label) => ({ label })),
        groupExtras: resolveGroupExtraIds(
          CATEGORY_GROUP_EXTRA_KEYS[categoryDef.key] ?? [],
        ),
      },
      overrideAccess: true,
    });
    categoryIds.set(categoryDef.key, doc.id);
  }

  const categorySlugs = new Map(
    CATEGORIES.map((category) => [
      category.key,
      joinSlugParts(
        activitySlugs.get(category.activityKey),
        slugify(category.title),
      ),
    ]),
  );

  const basePackages = PACKAGES.filter((pkg) => !pkg.templateKey);
  const derivedPackages = PACKAGES.filter((pkg) => pkg.templateKey);

  async function createPackage(pkg: PackageDef): Promise<void> {
    const data: Omit<Package, "id" | "updatedAt" | "createdAt"> = {
      activity: activityIds.get(pkg.activityKey)!,
      name: pkg.name,
      slug: joinSlugParts(
        activitySlugs.get(pkg.activityKey),
        pkg.categoryKey ? categorySlugs.get(pkg.categoryKey) : null,
        slugify(pkg.name),
      ),
      basePriceCents: euroToCents(pkg.basePriceEur),
      basePriceEur: pkg.basePriceEur,
      isActive: true,
      sort: pkg.sort,
    };

    if (pkg.categoryKey) {
      data.category = categoryIds.get(pkg.categoryKey)!;
    }

    if (pkg.templateKey) {
      data.templatePackage = packageIds.get(pkg.templateKey)!;
      if (pkg.templateOverrides?.length) {
        data.templateOverrides = buildTemplateOverrides(
          pkg.templateOverrides,
          optionIds,
          groupIds,
        );
      }
    } else if (pkg.extraGroups?.length) {
      data.extraGroupConfigs = buildExtraGroupConfigs(
        pkg.extraGroups,
        optionIds,
        groupIds,
      );
    }

    const doc = await payload.create({
      collection: "packages",
      draft: false,
      data,
      overrideAccess: true,
    });

    packageIds.set(pkg.key, doc.id);
  }

  console.log("Creating base packages...");
  for (const pkg of basePackages) {
    await createPackage(pkg);
  }

  console.log("Creating derived packages...");
  for (const pkg of derivedPackages) {
    await createPackage(pkg);
  }

  console.log("Assigning group extras to activities...");
  for (const [activityKey, extraKeys] of Object.entries(
    ACTIVITY_GROUP_EXTRA_KEYS,
  )) {
    const activityId = activityIds.get(activityKey);
    if (!activityId) continue;

    await payload.update({
      collection: "activities",
      id: activityId,
      data: {
        groupExtras: resolveGroupExtraIds(extraKeys),
      },
      overrideAccess: true,
    });
  }

  console.log(
    `Done: ${ACTIVITIES.length} activities, ${CATEGORIES.length} categories, ${GROUP_EXTRAS.length} group extras, ${OPTION_GROUPS.length} option groups, ${OPTIONS.length} options, ${PACKAGES.length} packages.`,
  );
}

export async function runCatalogSeed(payload: Payload): Promise<void> {
  console.log("Wiping catalog collections...");
  await wipeCatalog(payload);
  console.log("Seeding catalog...");
  await seedCatalog(payload);
}
