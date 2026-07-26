import config from "@payload-config";
import { getPayload } from "payload";

import type { EventQuote } from "@/lib/events/types";

import { DEFAULT_TESTIMONIALS } from "./defaults";
import { mapTestimonialToQuote } from "./mapTestimonial";

export async function getTestimonials(): Promise<EventQuote[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "testimonials",
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

    if (docs.length === 0) return DEFAULT_TESTIMONIALS;
    return docs.map(mapTestimonialToQuote);
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}
