import { mapEventToCardItem } from "@/lib/events/mapEvent";
import type { EventCardItem } from "@/lib/events/types";
import { mapTestimonialToQuote } from "@/lib/testimonials/mapTestimonial";
import type { Event, Home, Media, Testimonial } from "@/payload-types";

import { DEFAULT_HOME, EVENT_IMAGE_FALLBACKS } from "./defaults";
import type {
  GalleryImage,
  HomeContent,
  ParkFeatureIcon,
  SafetyIcon,
} from "./types";

function resolveMediaUrl(
  image: string | Media | null | undefined,
): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return image.url ?? undefined;
}

function mapEventCards(
  events: Home["eventTypes"]["events"] | undefined,
): EventCardItem[] {
  if (!Array.isArray(events) || events.length === 0) {
    return DEFAULT_HOME.eventTypes.events;
  }

  const cards = events
    .filter((item): item is Event => typeof item === "object" && item !== null)
    .filter((item) => item.isActive !== false)
    .map((item) => {
      const card = mapEventToCardItem(item);
      return {
        ...card,
        imageSrc:
          card.imageSrc ??
          EVENT_IMAGE_FALLBACKS[item.slug] ??
          DEFAULT_HOME.eventTypes.events[0]?.imageSrc,
      };
    });

  return cards.length > 0 ? cards : DEFAULT_HOME.eventTypes.events;
}

const PARK_ICONS: ParkFeatureIcon[] = [
  "tree",
  "grill",
  "shower",
  "parking",
  "coffee",
];

const SAFETY_ICONS: SafetyIcon[] = ["briefing", "shield", "person", "rules"];

function isParkIcon(value: unknown): value is ParkFeatureIcon {
  return (
    typeof value === "string" && PARK_ICONS.includes(value as ParkFeatureIcon)
  );
}

function isSafetyIcon(value: unknown): value is SafetyIcon {
  return (
    typeof value === "string" && SAFETY_ICONS.includes(value as SafetyIcon)
  );
}

function mapGalleryImages(
  images: Home["testimonials"]["images"] | undefined,
  heading: string,
): GalleryImage[] {
  return (
    images
      ?.map((item) => {
        const src = resolveMediaUrl(item?.image);
        if (!src) return null;
        return {
          src,
          alt: item?.alt?.trim() || heading || "Megacampo",
        };
      })
      .filter((item): item is GalleryImage => item !== null) ?? []
  );
}

function mapTestimonialImages(
  items: Home["testimonials"]["items"] | undefined,
): GalleryImage[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter(
      (item): item is Testimonial =>
        typeof item === "object" && item !== null && item.isActive !== false,
    )
    .map((item) => {
      const quote = mapTestimonialToQuote(item);
      if (!quote.imageSrc) return null;
      return {
        src: quote.imageSrc,
        alt: quote.name,
      };
    })
    .filter((item): item is GalleryImage => item !== null);
}

export function mapHomeGlobal(doc: Home | null | undefined): HomeContent {
  if (!doc) {
    return DEFAULT_HOME;
  }

  const keyFeatureItems =
    doc.keyFeatures?.items
      ?.map((item) => item?.label?.trim())
      .filter((label): label is string => Boolean(label)) ?? [];

  const parkFeatures =
    doc.moreThanPaintball?.features
      ?.filter((item) => item?.label && isParkIcon(item.icon))
      .map((item) => ({
        label: item.label!,
        icon: item.icon as ParkFeatureIcon,
      })) ?? [];

  const safetyItems =
    doc.safety?.items
      ?.filter((item) => item?.label && isSafetyIcon(item.icon))
      .map((item) => ({
        label: item.label!,
        icon: item.icon as SafetyIcon,
      })) ?? [];

  const testimonialsHeading =
    doc.testimonials?.heading?.trim() || DEFAULT_HOME.testimonials.heading;
  const manualGallery = mapGalleryImages(
    doc.testimonials?.images,
    testimonialsHeading,
  );
  const relationshipGallery = mapTestimonialImages(doc.testimonials?.items);
  const testimonialImages =
    manualGallery.length > 0
      ? manualGallery
      : relationshipGallery.length > 0
        ? relationshipGallery
        : DEFAULT_HOME.testimonials.images;

  const faqItems =
    doc.faq?.items
      ?.filter((item) => item?.question && item?.answer)
      .map((item) => ({
        question: item.question!,
        answer: item.answer!,
      })) ?? [];

  return {
    hero: {
      heading: doc.hero?.heading?.trim() || DEFAULT_HOME.hero.heading,
      description:
        doc.hero?.description?.trim() || DEFAULT_HOME.hero.description,
      cta: {
        label: doc.hero?.cta?.label?.trim() || DEFAULT_HOME.hero.cta.label,
        href: doc.hero?.cta?.href?.trim() || DEFAULT_HOME.hero.cta.href,
      },
      backgroundImageSrc:
        resolveMediaUrl(doc.hero?.image) ||
        DEFAULT_HOME.hero.backgroundImageSrc,
    },
    keyFeatures: {
      items:
        keyFeatureItems.length > 0
          ? keyFeatureItems
          : DEFAULT_HOME.keyFeatures.items,
    },
    adventure: {
      heading: doc.adventure?.heading?.trim() || DEFAULT_HOME.adventure.heading,
      showAllLabel:
        doc.adventure?.showAllLabel?.trim() ||
        DEFAULT_HOME.adventure.showAllLabel,
    },
    maps: {
      heading: doc.maps?.heading?.trim() || DEFAULT_HOME.maps.heading,
      description:
        doc.maps?.description?.trim() || DEFAULT_HOME.maps.description,
      cta: {
        label: doc.maps?.cta?.label?.trim() || DEFAULT_HOME.maps.cta.label,
        href: doc.maps?.cta?.href?.trim() || DEFAULT_HOME.maps.cta.href,
      },
      backgroundImageSrc:
        resolveMediaUrl(doc.maps?.image) ||
        DEFAULT_HOME.maps.backgroundImageSrc,
    },
    eventTypes: {
      heading:
        doc.eventTypes?.heading?.trim() || DEFAULT_HOME.eventTypes.heading,
      description:
        doc.eventTypes?.description?.trim() ||
        DEFAULT_HOME.eventTypes.description,
      cardLinkLabel:
        doc.eventTypes?.cardLinkLabel?.trim() ||
        DEFAULT_HOME.eventTypes.cardLinkLabel,
      events: mapEventCards(doc.eventTypes?.events),
    },
    moreThanPaintball: {
      heading:
        doc.moreThanPaintball?.heading?.trim() ||
        DEFAULT_HOME.moreThanPaintball.heading,
      description:
        doc.moreThanPaintball?.description?.trim() ||
        DEFAULT_HOME.moreThanPaintball.description,
      imageSrc:
        resolveMediaUrl(doc.moreThanPaintball?.image) ||
        DEFAULT_HOME.moreThanPaintball.imageSrc,
      features:
        parkFeatures.length > 0
          ? parkFeatures
          : DEFAULT_HOME.moreThanPaintball.features,
    },
    safety: {
      heading: doc.safety?.heading?.trim() || DEFAULT_HOME.safety.heading,
      description:
        doc.safety?.description?.trim() || DEFAULT_HOME.safety.description,
      imageSrc:
        resolveMediaUrl(doc.safety?.image) || DEFAULT_HOME.safety.imageSrc,
      items: safetyItems.length > 0 ? safetyItems : DEFAULT_HOME.safety.items,
    },
    testimonials: {
      heading: testimonialsHeading,
      description:
        doc.testimonials?.description?.trim() ||
        DEFAULT_HOME.testimonials.description,
      images: testimonialImages,
      prevLabel:
        doc.testimonials?.prevLabel?.trim() ||
        DEFAULT_HOME.testimonials.prevLabel,
      nextLabel:
        doc.testimonials?.nextLabel?.trim() ||
        DEFAULT_HOME.testimonials.nextLabel,
    },
    cta: {
      heading: doc.cta?.heading?.trim() || DEFAULT_HOME.cta.heading,
      button: {
        label: doc.cta?.button?.label?.trim() || DEFAULT_HOME.cta.button.label,
        href: doc.cta?.button?.href?.trim() || DEFAULT_HOME.cta.button.href,
      },
    },
    faq: {
      heading: doc.faq?.heading?.trim() || DEFAULT_HOME.faq.heading,
      items: faqItems.length > 0 ? faqItems : DEFAULT_HOME.faq.items,
    },
  };
}
