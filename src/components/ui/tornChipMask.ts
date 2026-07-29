/** Figma torn-edge chip silhouette (e.g. 554:1340) — CSS mask for peach stamps. */
export const TORN_CHIP_MASK = {
  WebkitMaskImage: "url(/images/key-feature-chip.png)",
  maskImage: "url(/images/key-feature-chip.png)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  maskMode: "alpha",
  WebkitMaskSourceType: "alpha",
} as const;

/** Como step number stamp (Figma 608:16969) — square torn-edge silhouette. */
export const STEP_NUMBER_CHIP_MASK = {
  WebkitMaskImage: "url(/images/como/step-number-chip.png)",
  maskImage: "url(/images/como/step-number-chip.png)",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  maskMode: "alpha",
  WebkitMaskSourceType: "alpha",
} as const;

/** Footer contact icon stamp (554:1077) — near-square torn-edge silhouette. */
export const FOOTER_ICON_CHIP_BG = {
  backgroundImage: "url(/images/footer-icon-chip.png)",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
} as const;

/** Activity card tag text rotation. */
export const ACTIVITY_TAG_TILT = "rotate(-5.2deg)";

/** Package pricing card name chip rotation. */
export const PRICING_TAG_TILT = "rotate(-5.2deg)";
