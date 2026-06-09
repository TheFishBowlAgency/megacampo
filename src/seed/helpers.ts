export function euroToCents(amount: number): number {
  return Math.round(amount * 100);
}

export type OptionRef = {
  optionKey: string;
  priceEur: number;
  default?: boolean;
};

export type GroupConfig = {
  groupKey: string;
  sort: number;
  options: OptionRef[];
};

export type TemplateOverrideDef =
  | {
      type: "replaceOption";
      groupKey: string;
      fromOptionKey: string;
      toOptionKey: string;
      isDefault?: boolean;
      priceEur?: number;
    }
  | {
      type: "excludeOption";
      groupKey: string;
      fromOptionKey: string;
    }
  | {
      type: "addOption";
      groupKey: string;
      toOptionKey: string;
      isDefault?: boolean;
      priceEur?: number;
    }
  | {
      type: "setDefault";
      groupKey: string;
      fromOptionKey: string;
    }
  | {
      type: "priceOverride";
      groupKey: string;
      fromOptionKey: string;
      priceEur: number;
    };

export type PackageDef = {
  key: string;
  activityKey: string;
  categoryKey?: string;
  name: string;
  basePriceEur: number;
  sort: number;
  templateKey?: string;
  templateOverrides?: TemplateOverrideDef[];
  extraGroups?: GroupConfig[];
};

export type OptionGroupDef = {
  key: string;
  title: string;
  sort: number;
};

export type OptionDef = {
  key: string;
  groupKey: string;
  label: string;
  sort: number;
  pricingUnit?: "per_person" | "per_booking";
  cartBehavior?: "inline" | "separate_line_item";
  defaultPriceEur?: number;
};

export type ActivityDef = {
  key: string;
  title: string;
  sort: number;
};

export type CategoryDef = {
  key: string;
  activityKey: string;
  title: string;
  sort: number;
};

export function group(
  groupKey: string,
  sort: number,
  options: OptionRef[],
): GroupConfig {
  return { groupKey, sort, options };
}

export function opt(
  optionKey: string,
  priceEur: number,
  options?: { default?: boolean },
): OptionRef {
  return { optionKey, priceEur, default: options?.default };
}
