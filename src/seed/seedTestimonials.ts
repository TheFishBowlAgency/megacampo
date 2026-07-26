import type { Payload } from "payload";

import { DEFAULT_TESTIMONIALS } from "@/lib/testimonials/defaults";

export async function runTestimonialsSeed(payload: Payload): Promise<string[]> {
  const ids: string[] = [];
  let created = 0;

  for (const [index, seed] of DEFAULT_TESTIMONIALS.entries()) {
    const existing = await payload.find({
      collection: "testimonials",
      where: {
        name: {
          equals: seed.name,
        },
      },
      limit: 1,
      depth: 0,
    });

    if (existing.docs[0]) {
      ids.push(existing.docs[0].id);
      continue;
    }

    const createdDoc = await payload.create({
      collection: "testimonials",
      data: {
        name: seed.name,
        quote: seed.quote,
        featured: Boolean(seed.featured),
        stars: seed.stars ?? 5,
        sort: index,
        isActive: true,
      },
      overrideAccess: true,
    });
    ids.push(createdDoc.id);
    created += 1;
  }

  if (created === 0) {
    payload.logger.info("Testimonials already populated — skipped");
  } else {
    payload.logger.info(`Seeded testimonials (created ${created})`);
  }

  return ids;
}
