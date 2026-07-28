export const DEFAULT_ACTIVITY_FEATURES: Record<string, string[]> = {
  paintball: ["12 MAPAS", "QUALIFIED MARSHALL", "3.5 HOURS"],
  "soft-paintball": ["12 MAPAS", "QUALIFIED MARSHALL", "3.5 HOURS"],
  airsoft: ["12 MAPAS", "QUALIFIED MARSHALL", "3.5 HOURS"],
  "laser-tag": ["12 MAPAS", "QUALIFIED MARSHALL", "3.5 HOURS"],
  lasertag: ["12 MAPAS", "QUALIFIED MARSHALL", "3.5 HOURS"],
};

export const FALLBACK_ACTIVITY_FEATURES = [
  "12 MAPAS",
  "QUALIFIED MARSHALL",
  "3.5 HOURS",
];

export function getActivityFeatures(slug: string): string[] {
  return DEFAULT_ACTIVITY_FEATURES[slug] ?? FALLBACK_ACTIVITY_FEATURES;
}

type HighlightRow = { label?: string | null } | null | undefined;

/** Prefer CMS highlight labels; fall back to seed defaults for the activity slug. */
export function resolveActivityHighlights(
  slug: string,
  ...sources: Array<HighlightRow[] | null | undefined>
): string[] {
  for (const source of sources) {
    const labels =
      source
        ?.map((item) => item?.label?.trim())
        .filter((label): label is string => Boolean(label)) ?? [];
    if (labels.length > 0) return labels;
  }
  return getActivityFeatures(slug);
}
