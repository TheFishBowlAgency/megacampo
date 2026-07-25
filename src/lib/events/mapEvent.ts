import type { Event, Media } from "@/payload-types";

import type { EventCardItem } from "./types";

function resolveMediaUrl(image: Event["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapEventToCardItem(event: Event): EventCardItem {
  return {
    id: event.id,
    title: event.title.toUpperCase(),
    href: `/eventos/${event.slug}`,
    imageSrc: resolveMediaUrl(event.image),
  };
}
