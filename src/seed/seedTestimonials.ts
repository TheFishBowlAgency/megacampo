import type { Payload } from "payload";

import { DEFAULT_TESTIMONIALS } from "@/lib/testimonials/defaults";

export async function runTestimonialsSeed(payload: Payload): Promise<string[]> {
  const ids: string[] = [];
  let created = 0;
  let updated = 0;

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

    const stars = seed.stars ?? 5;

    if (existing.docs[0]) {
      await payload.update({
        collection: "testimonials",
        id: existing.docs[0].id,
        data: {
          quote: seed.quote,
          featured: Boolean(seed.featured),
          stars,
          sort: index,
          isActive: true,
        },
        overrideAccess: true,
      });
      ids.push(existing.docs[0].id);
      updated += 1;
      continue;
    }

    const createdDoc = await payload.create({
      collection: "testimonials",
      data: {
        name: seed.name,
        quote: seed.quote,
        featured: Boolean(seed.featured),
        stars,
        sort: index,
        isActive: true,
      },
      overrideAccess: true,
    });
    ids.push(createdDoc.id);
    created += 1;
  }

  payload.logger.info(
    `Testimonials seed — created ${created}, updated ${updated}`,
  );

  return ids;
}
