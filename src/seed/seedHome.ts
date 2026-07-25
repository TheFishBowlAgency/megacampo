import type { Payload } from "payload";

import { DEFAULT_HOME } from "@/lib/home/defaults";
import { slugify } from "@/lib/slugify";

const EVENT_SEEDS = [
  { title: "FESTAS DE ANIVERSÁRIO", sort: 0 },
  { title: "DESPEDIDA DE SOLTEIRO(A)", sort: 1 },
  { title: "EVENTO DE EMPRESA", sort: 2 },
  { title: "GRUPOS E ESCOLAS", sort: 3 },
] as const;

async function ensureEvents(payload: Payload): Promise<string[]> {
  const ids: string[] = [];

  for (const seed of EVENT_SEEDS) {
    const existing = await payload.find({
      collection: "events",
      where: {
        title: {
          equals: seed.title,
        },
      },
      limit: 1,
      depth: 0,
    });

    if (existing.docs[0]) {
      ids.push(existing.docs[0].id);
      continue;
    }

    const created = await payload.create({
      collection: "events",
      data: {
        title: seed.title,
        sort: seed.sort,
        isActive: true,
        slug: slugify(seed.title),
      },
      overrideAccess: true,
    });
    ids.push(created.id);
  }

  return ids;
}

export async function runHomeSeed(payload: Payload): Promise<void> {
  const eventIds = await ensureEvents(payload);

  const existing = await payload.findGlobal({
    slug: "home",
    depth: 0,
  });

  if (existing.hero?.heading) {
    payload.logger.info("Home global already populated — skipped");
    return;
  }

  await payload.updateGlobal({
    slug: "home",
    data: {
      hero: DEFAULT_HOME.hero,
      keyFeatures: {
        items: DEFAULT_HOME.keyFeatures.items.map((label) => ({ label })),
      },
      adventure: DEFAULT_HOME.adventure,
      maps: DEFAULT_HOME.maps,
      eventTypes: {
        heading: DEFAULT_HOME.eventTypes.heading,
        description: DEFAULT_HOME.eventTypes.description,
        cardLinkLabel: DEFAULT_HOME.eventTypes.cardLinkLabel,
        events: eventIds,
      },
      moreThanPaintball: {
        heading: DEFAULT_HOME.moreThanPaintball.heading,
        description: DEFAULT_HOME.moreThanPaintball.description,
        features: DEFAULT_HOME.moreThanPaintball.features,
      },
      safety: {
        heading: DEFAULT_HOME.safety.heading,
        description: DEFAULT_HOME.safety.description,
        items: DEFAULT_HOME.safety.items,
      },
      testimonials: {
        heading: DEFAULT_HOME.testimonials.heading,
        description: DEFAULT_HOME.testimonials.description,
      },
      cta: DEFAULT_HOME.cta,
      faq: DEFAULT_HOME.faq,
    },
  });

  payload.logger.info("Seeded home global and events");
}
