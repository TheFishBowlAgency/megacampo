import type { ResolvedPackageConfig } from "./resolvePackageConfig";

import type { PackageCardFeature } from "./types";

function isNotIncludedLabel(label: string): boolean {
  return label.trim().toLowerCase().replace(/\s+/g, " ") === "not included";
}

/** Default option labels from each extra group, used as pricing-card feature bullets. */
export function derivePackageFeatures(
  config: ResolvedPackageConfig,
): PackageCardFeature[] {
  return [...config.extraGroups]
    .sort((a, b) => a.sort - b.sort)
    .flatMap((group) => {
      const selected =
        group.options.find((option) => option.isDefault) ?? group.options[0];
      if (!selected?.label) return [];

      const optionLabel = selected.label.toUpperCase();
      const label = isNotIncludedLabel(selected.label)
        ? `${group.title.toUpperCase()}: ${optionLabel}`
        : optionLabel;

      return [{ id: group.groupId, label }];
    });
}
