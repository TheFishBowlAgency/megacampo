import { BANNER_SECTION_UNDERLAY_URL } from "@/data/bannerMedia";

type BannerUnderlayOptions = {
  /** When no `imageUrl`, use the site banner. Default `true`. */
  fallback?: boolean;
};

/** Chakra `_before` layer: image sits behind content; keep `position="relative"` + `overflow="hidden"` on the host `Box`. */
export function bannerSectionUnderlayBefore(
  imageUrl?: string | null,
  options?: BannerUnderlayOptions,
) {
  const fallback = options?.fallback !== false;
  const url = imageUrl?.trim() || (fallback ? BANNER_SECTION_UNDERLAY_URL : "");
  if (!url) return undefined;

  return {
    content: '""',
    position: "absolute" as const,
    inset: 0,
    zIndex: 0,
    pointerEvents: "none" as const,
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
  };
}
