import type { Payload } from "payload";

import { DEFAULT_EVENT_PRICING_TABS } from "@/lib/events/defaultPricing";
import {
  DEFAULT_EVENT_ACTIVITY_CHOICES,
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
  activityChoices: DEFAULT_EVENT_ACTIVITY_CHOICES.map((choice) => ({
    title: choice.title,
    imageAlt: choice.imageAlt,
    features: choice.features.map((label) => ({ label })),
    ageNote: choice.ageNote,
    linkHref: choice.href,
  })),
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
      const needsActivityChoices = !doc.activityChoices?.length;

      if (
        needsBody ||
        needsPricing ||
        needsTestimonials ||
        needsActivityCopy ||
        needsActivityChoices ||
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
            ...(needsActivityChoices
              ? { activityChoices: seed.activityChoices }
              : {}),
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
        activityChoices: seed.activityChoices,
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
    const needsTestimonials =
      !existing.testimonials?.items?.length && testimonialIds.length > 0;
    const needsCarouselLabels =
      !existing.testimonials?.prevLabel?.trim() ||
      !existing.testimonials?.nextLabel?.trim();
    const heroCtaHref = existing.hero?.cta?.href?.trim() ?? "";
    const midCtaHref = existing.cta?.button?.href?.trim() ?? "";
    const needsHeroCtaHref =
      !heroCtaHref ||
      heroCtaHref === "/" ||
      heroCtaHref === "/#" ||
      !heroCtaHref.includes("actividades");
    const needsMidCtaHref =
      !midCtaHref ||
      midCtaHref === "/" ||
      midCtaHref === "/#" ||
      !midCtaHref.includes("actividades");

    if (
      needsTestimonials ||
      needsCarouselLabels ||
      needsHeroCtaHref ||
      needsMidCtaHref
    ) {
      await payload.updateGlobal({
        slug: "home",
        data: {
          ...(needsHeroCtaHref
            ? {
                hero: {
                  heading: existing.hero.heading,
                  description: existing.hero.description,
                  cta: {
                    label:
                      existing.hero.cta?.label || DEFAULT_HOME.hero.cta.label,
                    href: DEFAULT_HOME.hero.cta.href,
                  },
                },
              }
            : {}),
          ...(needsMidCtaHref
            ? {
                cta: {
                  heading: existing.cta?.heading || DEFAULT_HOME.cta.heading,
                  button: {
                    label:
                      existing.cta?.button?.label ||
                      DEFAULT_HOME.cta.button.label,
                    href: DEFAULT_HOME.cta.button.href,
                  },
                },
              }
            : {}),
          ...(needsTestimonials || needsCarouselLabels
            ? {
                testimonials: {
                  heading:
                    existing.testimonials?.heading ||
                    DEFAULT_HOME.testimonials.heading,
                  description:
                    existing.testimonials?.description ||
                    DEFAULT_HOME.testimonials.description,
                  items: needsTestimonials
                    ? testimonialIds
                    : existing.testimonials?.items,
                  prevLabel:
                    existing.testimonials?.prevLabel ||
                    DEFAULT_HOME.testimonials.prevLabel,
                  nextLabel:
                    existing.testimonials?.nextLabel ||
                    DEFAULT_HOME.testimonials.nextLabel,
                },
              }
            : {}),
        },
      });
      payload.logger.info("Synced home CTA / testimonials");
    } else {
      payload.logger.info("Home global already populated — events synced");
    }
    return;
  }

  await payload.updateGlobal({
    slug: "home",
    data: {
      hero: {
        heading: DEFAULT_HOME.hero.heading,
        description: DEFAULT_HOME.hero.description,
        cta: DEFAULT_HOME.hero.cta,
      },
      keyFeatures: {
        items: DEFAULT_HOME.keyFeatures.items.map((label) => ({ label })),
      },
      adventure: DEFAULT_HOME.adventure,
      maps: {
        heading: DEFAULT_HOME.maps.heading,
        description: DEFAULT_HOME.maps.description,
        cta: DEFAULT_HOME.maps.cta,
      },
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
        items: testimonialIds,
        prevLabel: DEFAULT_HOME.testimonials.prevLabel,
        nextLabel: DEFAULT_HOME.testimonials.nextLabel,
      },
      cta: DEFAULT_HOME.cta,
      faq: DEFAULT_HOME.faq,
    },
  });

  payload.logger.info("Seeded home global and events");
}
