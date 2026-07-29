import type { Evento, Media } from "@/payload-types";

import { DEFAULT_EVENT_LISTING } from "./defaults";
import type { EventosCopy } from "./types";

function resolveMediaUrl(image: Evento["hero"]["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapEventosGlobal(doc: Evento | null | undefined): EventosCopy {
  if (!doc) {
    return DEFAULT_EVENT_LISTING;
  }

  return {
    heroTitle: doc.hero?.heading?.trim() || DEFAULT_EVENT_LISTING.heroTitle,
    heroBackgroundImageSrc:
      resolveMediaUrl(doc.hero?.image) ??
      DEFAULT_EVENT_LISTING.heroBackgroundImageSrc,
    sectionHeading:
      doc.section?.heading?.trim() || DEFAULT_EVENT_LISTING.sectionHeading,
    cardLinkLabel:
      doc.section?.cardLinkLabel?.trim() || DEFAULT_EVENT_LISTING.cardLinkLabel,
    backLabel: doc.detail?.backLabel?.trim() || DEFAULT_EVENT_LISTING.backLabel,
    shareLabel:
      doc.detail?.shareLabel?.trim() || DEFAULT_EVENT_LISTING.shareLabel,
  };
}
