import config from "@payload-config";
import { getPayload } from "payload";

import { DEFAULT_EVENT_LISTING, DEFAULT_EVENTS } from "./defaults";
import { mapEventToCardItem } from "./mapEvent";
import { mapEventosGlobal } from "./mapEventos";
import type { EventCardItem, EventosCopy } from "./types";

export async function getEventsCopy(): Promise<EventosCopy> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({ slug: "eventos", depth: 1 });
    return mapEventosGlobal(doc);
  } catch {
    return DEFAULT_EVENT_LISTING;
  }
}

export async function getEvents(): Promise<EventCardItem[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "events",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "sort",
      limit: 50,
      depth: 1,
      pagination: false,
    });

    if (docs.length === 0) {
      return DEFAULT_EVENTS;
    }

    return docs.map(mapEventToCardItem);
  } catch {
    return DEFAULT_EVENTS;
  }
}

export async function getAllEventSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "events",
      where: {
        isActive: {
          equals: true,
        },
      },
      limit: 100,
      depth: 0,
      pagination: false,
    });

    const slugs = docs.map((event) => event.slug);
    if (slugs.length > 0) return slugs;
  } catch {
    // fall through to defaults
  }

  return DEFAULT_EVENTS.map((event) => event.slug);
}
