/** Figma PAINTBALL key-feature chips; reused as defaults per activity. */
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
