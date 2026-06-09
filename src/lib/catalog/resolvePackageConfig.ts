export type PricingUnit = "per_person" | "per_booking";
export type CartBehavior = "inline" | "separate_line_item";
export type SelectionType = "single" | "multi";

export type TemplateOverrideType =
  | "replaceOption"
  | "excludeOption"
  | "addOption"
  | "setDefault"
  | "priceOverride";

export type PopulatedOption = {
  id: string;
  label: string;
  defaultPriceCents?: number | null;
  pricingUnit: PricingUnit;
  cartBehavior: CartBehavior;
  maxPerBooking?: number | null;
  sort?: number | null;
};

export type PopulatedOptionGroup = {
  id: string;
  title: string;
  selectionType: SelectionType;
  sort?: number | null;
};

export type PackageOptionRow = {
  option: string | PopulatedOption;
  isDefault?: boolean | null;
  priceCents: number;
};

export type ExtraGroupConfig = {
  group: string | PopulatedOptionGroup;
  sort?: number | null;
  options: PackageOptionRow[];
};

export type TemplateOverride = {
  type: TemplateOverrideType;
  group: string | PopulatedOptionGroup;
  fromOption?: string | PopulatedOption | null;
  toOption?: string | PopulatedOption | null;
  isDefault?: boolean | null;
  priceCents?: number | null;
};

export type PackageDoc = {
  id: string;
  name: string;
  slug: string;
  basePriceCents: number;
  templatePackage?: string | PackageDoc | null;
  templateOverrides?: TemplateOverride[] | null;
  extraGroupConfigs?: ExtraGroupConfig[] | null;
};

export type ResolvedPackageOption = {
  optionId: string;
  label: string;
  isDefault: boolean;
  priceCents: number;
  pricingUnit: PricingUnit;
  cartBehavior: CartBehavior;
  maxPerBooking?: number | null;
  sort: number;
};

export type ResolvedExtraGroup = {
  groupId: string;
  title: string;
  selectionType: SelectionType;
  sort: number;
  options: ResolvedPackageOption[];
};

export type ResolvedPackageConfig = {
  packageId: string;
  name: string;
  slug: string;
  basePriceCents: number;
  extraGroups: ResolvedExtraGroup[];
};

function relationId(value: string | { id: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === "string" ? value : value.id;
}

function resolveOptionMeta(option: string | PopulatedOption): PopulatedOption | null {
  if (typeof option === "string") return null;
  return option;
}

function resolveGroupMeta(group: string | PopulatedOptionGroup): PopulatedOptionGroup | null {
  if (typeof group === "string") return null;
  return group;
}

function toResolvedOption(
  row: PackageOptionRow,
  fallbackSort: number,
): ResolvedPackageOption | null {
  const meta = resolveOptionMeta(row.option);
  const optionId = relationId(row.option);

  if (!optionId || !meta) return null;

  return {
    optionId,
    label: meta.label,
    isDefault: Boolean(row.isDefault),
    priceCents: row.priceCents,
    pricingUnit: meta.pricingUnit,
    cartBehavior: meta.cartBehavior,
    maxPerBooking: meta.maxPerBooking ?? null,
    sort: meta.sort ?? fallbackSort,
  };
}

function cloneGroupConfigs(configs: ExtraGroupConfig[]): ExtraGroupConfig[] {
  return configs.map((groupConfig) => ({
    ...groupConfig,
    options: groupConfig.options.map((row) => ({ ...row })),
  }));
}

function findGroupIndex(groups: ExtraGroupConfig[], groupId: string): number {
  return groups.findIndex((groupConfig) => relationId(groupConfig.group) === groupId);
}

function applyTemplateOverrides(
  groups: ExtraGroupConfig[],
  overrides: TemplateOverride[],
): ExtraGroupConfig[] {
  const next = cloneGroupConfigs(groups);

  for (const override of overrides) {
    const groupId = relationId(override.group);
    if (!groupId) continue;

    const groupIndex = findGroupIndex(next, groupId);

    if (override.type === "addOption") {
      const toOptionId = relationId(override.toOption);
      if (!toOptionId) continue;

      if (groupIndex === -1) {
        next.push({
          group: override.group,
          sort: 0,
          options: [
            {
              option: override.toOption!,
              isDefault: override.isDefault ?? false,
              priceCents: override.priceCents ?? 0,
            },
          ],
        });
        continue;
      }

      next[groupIndex].options.push({
        option: override.toOption!,
        isDefault: override.isDefault ?? false,
        priceCents: override.priceCents ?? 0,
      });
      continue;
    }

    if (groupIndex === -1) continue;

    const fromOptionId = relationId(override.fromOption);

    switch (override.type) {
      case "excludeOption": {
        if (!fromOptionId) break;
        next[groupIndex].options = next[groupIndex].options.filter(
          (row) => relationId(row.option) !== fromOptionId,
        );
        break;
      }
      case "replaceOption": {
        if (!fromOptionId || !override.toOption) break;
        next[groupIndex].options = next[groupIndex].options.map((row) => {
          if (relationId(row.option) !== fromOptionId) return row;

          return {
            option: override.toOption!,
            isDefault: override.isDefault ?? row.isDefault ?? false,
            priceCents: override.priceCents ?? row.priceCents,
          };
        });
        break;
      }
      case "setDefault": {
        if (!fromOptionId) break;
        next[groupIndex].options = next[groupIndex].options.map((row) => ({
          ...row,
          isDefault: relationId(row.option) === fromOptionId,
        }));
        break;
      }
      case "priceOverride": {
        if (!fromOptionId || override.priceCents == null) break;
        next[groupIndex].options = next[groupIndex].options.map((row) =>
          relationId(row.option) === fromOptionId
            ? { ...row, priceCents: override.priceCents! }
            : row,
        );
        break;
      }
    }
  }

  return next;
}

function toResolvedGroups(configs: ExtraGroupConfig[]): ResolvedExtraGroup[] {
  return configs
    .map((groupConfig, index) => {
      const groupMeta = resolveGroupMeta(groupConfig.group);
      const groupId = relationId(groupConfig.group);
      if (!groupId || !groupMeta) return null;

      const options = groupConfig.options
        .map((row, optionIndex) => toResolvedOption(row, optionIndex))
        .filter((option): option is ResolvedPackageOption => option !== null)
        .sort((a, b) => a.sort - b.sort);

      return {
        groupId,
        title: groupMeta.title,
        selectionType: groupMeta.selectionType,
        sort: groupConfig.sort ?? groupMeta.sort ?? index,
        options,
      };
    })
    .filter((group): group is ResolvedExtraGroup => group !== null)
    .sort((a, b) => a.sort - b.sort);
}

export function resolvePackageConfig(
  pkg: PackageDoc,
  loadTemplate: (templateId: string) => PackageDoc | null | undefined,
  visited: Set<string> = new Set(),
): ResolvedPackageConfig {
  if (visited.has(pkg.id)) {
    throw new Error(`Circular template reference detected for package "${pkg.slug}".`);
  }

  visited.add(pkg.id);

  let groupConfigs: ExtraGroupConfig[] = [];

  const templateId = relationId(pkg.templatePackage);

  if (templateId) {
    const template = loadTemplate(templateId);
    if (!template) {
      throw new Error(
        `Template package "${templateId}" not found for package "${pkg.slug}".`,
      );
    }

    const resolvedTemplate = resolvePackageConfig(template, loadTemplate, visited);
    groupConfigs = resolvedTemplate.extraGroups.map((group) => ({
      group: {
        id: group.groupId,
        title: group.title,
        selectionType: group.selectionType,
        sort: group.sort,
      },
      sort: group.sort,
      options: group.options.map((option) => ({
        option: {
          id: option.optionId,
          label: option.label,
          pricingUnit: option.pricingUnit,
          cartBehavior: option.cartBehavior,
          maxPerBooking: option.maxPerBooking,
          sort: option.sort,
        },
        isDefault: option.isDefault,
        priceCents: option.priceCents,
      })),
    }));

    if (pkg.templateOverrides?.length) {
      groupConfigs = applyTemplateOverrides(groupConfigs, pkg.templateOverrides);
    }
  } else {
    groupConfigs = cloneGroupConfigs(pkg.extraGroupConfigs ?? []);
  }

  return {
    packageId: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    basePriceCents: pkg.basePriceCents,
    extraGroups: toResolvedGroups(groupConfigs),
  };
}

export function getEffectiveOptionPriceCents(
  packagePriceCents: number,
  optionDefaultPriceCents?: number | null,
): number {
  return packagePriceCents ?? optionDefaultPriceCents ?? 0;
}
