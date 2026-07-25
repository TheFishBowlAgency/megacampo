import type { Payload } from "payload";

import { DEFAULT_CENARIOS, DEFAULT_SCENARIOS } from "@/lib/cenarios/defaults";
import { slugify } from "@/lib/slugify";

async function ensureScenarios(payload: Payload): Promise<void> {
  let created = 0;

  for (const [index, seed] of DEFAULT_SCENARIOS.entries()) {
    const slug = slugify(seed.title);
    const existing = await payload.find({
      collection: "scenarios",
      where: {
        or: [{ title: { equals: seed.title } }, { slug: { equals: slug } }],
      },
      limit: 1,
      depth: 0,
    });

    if (existing.docs[0]) {
      continue;
    }

    await payload.create({
      collection: "scenarios",
      data: {
        title: seed.title,
        sort: index,
        isActive: true,
        slug,
      },
      overrideAccess: true,
    });
    created += 1;
  }

  if (created > 0) {
    payload.logger.info(`Seeded ${created} scenarios`);
  }
}

export async function runCenariosSeed(payload: Payload): Promise<void> {
  await ensureScenarios(payload);

  const existing = await payload.findGlobal({
    slug: "cenarios",
    depth: 0,
  });

  if (existing.hero?.heading) {
    payload.logger.info("Cenarios global already populated — skipped");
    return;
  }

  await payload.updateGlobal({
    slug: "cenarios",
    data: {
      hero: DEFAULT_CENARIOS.hero,
      section: DEFAULT_CENARIOS.section,
    },
  });

  payload.logger.info("Seeded cenarios global");
}
