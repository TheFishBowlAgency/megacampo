import config from "@payload-config";
import { getPayload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { localeQuery } from "@/lib/site/localeQuery";

import { getDefaultEventDetail } from "./defaults";
import { mapEventToDetail } from "./mapEvent";
import type { EventDetail } from "./types";

export async function getEventBySlug(
  slug: string,
  locale: SiteLocale,
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
      depth: 2,
      pagination: false,
      ...localeQuery(locale),
    });

    if (docs[0]) {
      return mapEventToDetail(docs[0]);
    }
  } catch {
    // fall through to defaults
  }

  return getDefaultEventDetail(slug);
}
