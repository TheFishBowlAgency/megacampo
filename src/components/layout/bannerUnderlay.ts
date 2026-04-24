import { BANNER_SECTION_UNDERLAY_URL } from "@/data/bannerMedia";

/** Chakra `_before` layer: image sits behind content; keep `position="relative"` + `overflow="hidden"` on the host `Box`. */
export const bannerSectionUnderlayBefore = {
  content: '""',
  position: "absolute" as const,
  inset: 0,
  zIndex: 0,
  pointerEvents: "none" as const,
  backgroundImage: `url(${BANNER_SECTION_UNDERLAY_URL})`,
  backgroundSize: "cover",
  backgroundPosition: "center bottom",
  backgroundRepeat: "no-repeat",
};
