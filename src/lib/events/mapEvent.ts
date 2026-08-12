import type { Event, Media, Testimonial } from "@/payload-types";

import { DEFAULT_EVENT_PRICING_TABS } from "./defaultPricing";
import {
  DEFAULT_EVENT_ACTIVITY_CHOICES,
  DEFAULT_EVENT_BODY,
  DEFAULT_EVENT_RESERVE_HREF,
  DEFAULT_EVENT_RESERVE_LABEL,
  DEFAULT_EVENTS,
  getDefaultEventDetail,
} from "./defaults";
import type {
  EventActivityChoice,
  EventCardItem,
  EventDetail,
  EventPricingPackage,
  EventPricingTab,
  EventQuote,
} from "./types";
import { textToLexical } from "@/lib/richtext/textToLexical";
import {
  DEFAULT_TESTIMONIALS,
  DEFAULT_TESTIMONIALS_HEADING,
} from "@/lib/testimonials/defaults";
import { mapTestimonialToQuote } from "@/lib/testimonials/mapTestimonial";

function resolveMediaUrl(
  image: (string | null) | Media | undefined,
): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return image.url ?? undefined;
}

function fallbackImage(slug: string): string | undefined {
  return DEFAULT_EVENTS.find((event) => event.slug === slug)?.imageSrc;
}

function fallbackDescription(slug: string): string | undefined {
  return DEFAULT_EVENTS.find((event) => event.slug === slug)?.description;
}

function mapPricingTabs(event: Event): EventPricingTab[] {
  const tabs = event.pricingTabs ?? [];
  if (tabs.length === 0) return DEFAULT_EVENT_PRICING_TABS;

  const mapped = tabs.map((tab, tabIndex) => {
    const packages: EventPricingPackage[] = (tab.packages ?? []).map(
      (pkg, pkgIndex) => ({
        id: pkg.id ?? `${tabIndex}-${pkgIndex}`,
        name: (pkg.name ?? "").toUpperCase(),
        price: pkg.price ?? "",
        popular: Boolean(pkg.popular),
        features: (pkg.features ?? [])
          .map((f) => f.label?.trim())
          .filter((label): label is string => Boolean(label))
          .map((label) => label.toUpperCase()),
      }),
    );

    return {
      id: tab.id ?? `tab-${tabIndex}`,
      label: (tab.label ?? "").toUpperCase(),
      packages,
    };
  });

  const fallbackPackages =
    mapped.find((tab) => tab.packages.length > 0)?.packages ??
    DEFAULT_EVENT_PRICING_TABS[0]?.packages ??
    [];

  return mapped.map((tab) => ({
    ...tab,
    packages: tab.packages.length > 0 ? tab.packages : fallbackPackages,
  }));
}

function mapEventTestimonials(event: Event): EventQuote[] {
  const related = event.testimonials;
  if (!related?.length) return DEFAULT_TESTIMONIALS;

  const quotes = related
    .map((item) => {
      if (!item || typeof item === "string") return null;
      return mapTestimonialToQuote(item as Testimonial);
    })
    .filter((quote): quote is EventQuote => Boolean(quote));

  return quotes.length > 0 ? quotes : DEFAULT_TESTIMONIALS;
}

function resolveBody(event: Event, fallbackBody: string): unknown {
  const body = event.body as unknown;
  if (body && typeof body === "object" && "root" in body) {
    return body;
  }
  if (typeof body === "string" && body.trim()) {
    return textToLexical(body);
  }
  return textToLexical(fallbackBody || DEFAULT_EVENT_BODY);
}

function mapActivityChoices(event: Event): EventActivityChoice[] {
  const choices = event.activityChoices ?? [];
  if (choices.length === 0) return DEFAULT_EVENT_ACTIVITY_CHOICES;

  const mapped: EventActivityChoice[] = [];

  choices.forEach((choice, index) => {
    const title = choice.title?.trim();
    const imageSrc = resolveMediaUrl(choice.image);
    if (!title || !imageSrc) return;

    const fallback =
      DEFAULT_EVENT_ACTIVITY_CHOICES[index] ??
      DEFAULT_EVENT_ACTIVITY_CHOICES[0];

    const matchedDefault =
      DEFAULT_EVENT_ACTIVITY_CHOICES.find(
        (item) => item.title === title.toUpperCase(),
      ) ?? fallback;

    const tabId = matchedDefault?.id ?? choice.id ?? `activity-${index}`;
    const rawHref = choice.linkHref?.trim();
    const href = rawHref && rawHref !== "#pacotes" ? rawHref : `#pacotes`;

    mapped.push({
      id: tabId,
      title: title.toUpperCase(),
      imageSrc,
      imageAlt: choice.imageAlt?.trim() || matchedDefault.imageAlt || title,
      features: (choice.features ?? [])
        .map((feature) => feature.label?.trim())
        .filter((label): label is string => Boolean(label)),
      ...(choice.ageNote?.trim() ? { ageNote: choice.ageNote.trim() } : {}),
      href,
    });
  });

  return mapped.length > 0 ? mapped : DEFAULT_EVENT_ACTIVITY_CHOICES;
}

export function mapEventToCardItem(event: Event): EventCardItem {
  const slug = event.slug;
  const cmsDescription = event.description?.trim();

  return {
    id: event.id,
    slug,
    title: event.title.toUpperCase(),
    href: `/eventos/${slug}`,
    packagesHref: `/eventos/${slug}/pacotes`,
    imageSrc: resolveMediaUrl(event.image) ?? fallbackImage(slug),
    description: cmsDescription || fallbackDescription(slug),
  };
}

export function mapEventToDetail(event: Event): EventDetail {
  const fallback = getDefaultEventDetail(event.slug);
  const card = mapEventToCardItem(event);

  return {
    id: event.id,
    slug: event.slug,
    title: event.title.toUpperCase(),
    imageSrc: card.imageSrc,
    description: card.description ?? fallback?.description ?? "",
    body: resolveBody(event, (fallback?.body as string) ?? DEFAULT_EVENT_BODY),
    activityHeading:
      event.activityHeading?.trim() ||
      fallback?.activityHeading ||
      "Qual a atividade certa para a tua festa?",
    activityDescription:
      event.activityDescription?.trim() ||
      fallback?.activityDescription ||
      "No Megacampo tens diferentes formatos para o teu evento. Escolhe a atividade e consulta os pacotes disponíveis.",
    activityChoices: mapActivityChoices(event),
    reserveHref:
      event.reserveHref?.trim() ||
      fallback?.reserveHref ||
      DEFAULT_EVENT_RESERVE_HREF,
    reserveLabel:
      event.reserveLabel?.trim() ||
      fallback?.reserveLabel ||
      DEFAULT_EVENT_RESERVE_LABEL,
    packagesHref: card.packagesHref,
    pricingTabs: mapPricingTabs(event),
    testimonialsHeading:
      event.testimonialsHeading?.trim() ||
      fallback?.testimonialsHeading ||
      DEFAULT_TESTIMONIALS_HEADING,
    testimonials: mapEventTestimonials(event),
  };
}
