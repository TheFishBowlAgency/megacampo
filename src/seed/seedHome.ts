import type { Payload } from "payload";

import { DEFAULT_EVENT_PRICING_TABS } from "@/lib/events/defaultPricing";
import {
  DEFAULT_EVENT_BODY,
  DEFAULT_EVENT_CARD_DESCRIPTION,
  DEFAULT_EVENTS,
} from "@/lib/events/defaults";
import { DEFAULT_HOME } from "@/lib/home/defaults";
import { isLexicalState, textToLexical } from "@/lib/richtext/textToLexical";
import { slugify } from "@/lib/slugify";
import { DEFAULT_TESTIMONIALS_HEADING } from "@/lib/testimonials/defaults";

import { runTestimonialsSeed } from "./seedTestimonials";

const EVENT_SEEDS = DEFAULT_EVENTS.map((event, index) => ({
  title: event.title,
  slug: event.slug,
  sort: index,
  description: event.description ?? DEFAULT_EVENT_CARD_DESCRIPTION,
  body: textToLexical(DEFAULT_EVENT_BODY),
  activityHeading: "Qual a atividade certa para a tua festa?",
  activityDescription:
    "No Megacampo tens diferentes formatos para o teu evento: desde paintball a jogos de cooperação. Escolhe a atividade e consulta os pacotes disponíveis.",
  testimonialsHeading: DEFAULT_TESTIMONIALS_HEADING,
  pricingTabs: DEFAULT_EVENT_PRICING_TABS.map((tab) => ({
    label: tab.label,
    packages: tab.packages.map((pkg) => ({
      name: pkg.name,
      price: pkg.price,
      popular: Boolean(pkg.popular),
      features: pkg.features.map((label) => ({ label })),
    })),
  })),
}));

async function ensureEvents(
  payload: Payload,
  testimonialIds: string[],
): Promise<string[]> {
  const ids: string[] = [];

  for (const seed of EVENT_SEEDS) {
    const existing = await payload.find({
      collection: "events",
      where: {
        or: [
          { title: { equals: seed.title } },
          { slug: { equals: seed.slug } },
        ],
      },
      limit: 1,
      depth: 0,
    });

    if (existing.docs[0]) {
      const doc = existing.docs[0];
      const needsBody = !isLexicalState(doc.body);
      const needsPricing = !doc.pricingTabs?.length;
      const needsTestimonials = !doc.testimonials?.length;
      const needsActivityCopy =
        !doc.activityHeading?.trim() || !doc.activityDescription?.trim();

      if (
        needsBody ||
        needsPricing ||
        needsTestimonials ||
        needsActivityCopy ||
        !doc.description?.trim()
      ) {
        await payload.update({
          collection: "events",
          id: doc.id,
          data: {
            description: doc.description?.trim() || seed.description,
            ...(needsBody ? { body: seed.body } : {}),
            ...(needsPricing ? { pricingTabs: seed.pricingTabs } : {}),
            ...(needsTestimonials ? { testimonials: testimonialIds } : {}),
            ...(needsActivityCopy
              ? {
                  activityHeading: seed.activityHeading,
                  activityDescription: seed.activityDescription,
                  testimonialsHeading: seed.testimonialsHeading,
                }
              : {}),
          },
          overrideAccess: true,
        });
      }

      ids.push(doc.id);
      continue;
    }

    const created = await payload.create({
      collection: "events",
      data: {
        title: seed.title,
        slug: seed.slug || slugify(seed.title),
        sort: seed.sort,
        isActive: true,
        description: seed.description,
        body: seed.body,
        activityHeading: seed.activityHeading,
        activityDescription: seed.activityDescription,
        pricingTabs: seed.pricingTabs,
        testimonialsHeading: seed.testimonialsHeading,
        testimonials: testimonialIds,
      },
      overrideAccess: true,
    });
    ids.push(created.id);
  }

  return ids;
}

export async function runHomeSeed(payload: Payload): Promise<void> {
  const testimonialIds = await runTestimonialsSeed(payload);
  const eventIds = await ensureEvents(payload, testimonialIds);

  const existing = await payload.findGlobal({
    slug: "home",
    depth: 0,
  });

  if (existing.hero?.heading) {
    payload.logger.info("Home global already populated — events synced");
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
