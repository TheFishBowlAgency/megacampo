import config from "@payload-config";
import { getPayload } from "payload";

import { getDefaultEventDetail } from "./defaults";
import { mapEventToDetail } from "./mapEvent";
import type { EventDetail } from "./types";

export async function getEventBySlug(
  slug: string,
): Promise<EventDetail | null> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "events",
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            isActive: {
              equals: true,
            },
          },
        ],
      },
      limit: 1,
      depth: 1,
      pagination: false,
    });

    if (docs[0]) {
      return mapEventToDetail(docs[0]);
    }
  } catch {
    // fall through to defaults
  }

  return getDefaultEventDetail(slug);
}
