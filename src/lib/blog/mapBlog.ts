import type { Blog as BlogGlobal, Media } from "@/payload-types";

import { DEFAULT_BLOG } from "./defaults";
import type { BlogCopy } from "./types";

function resolveMediaUrl(
  image: BlogGlobal["hero"]["image"],
): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapBlogGlobal(doc: BlogGlobal | null | undefined): BlogCopy {
  if (!doc) {
    return DEFAULT_BLOG;
  }

  return {
    heroTitle: doc.hero?.heading?.trim() || DEFAULT_BLOG.heroTitle,
    heroBackgroundImageSrc:
      resolveMediaUrl(doc.hero?.image) ?? DEFAULT_BLOG.heroBackgroundImageSrc,
    sectionHeading: doc.section?.heading?.trim() || DEFAULT_BLOG.sectionHeading,
    cardLinkLabel:
      doc.section?.cardLinkLabel?.trim() || DEFAULT_BLOG.cardLinkLabel,
  };
}
