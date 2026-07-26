import type { Event, Media } from "@/payload-types";

import { DEFAULT_EVENTS, getDefaultEventDetail } from "./defaults";
import type { EventCardItem, EventDetail } from "./types";

function resolveMediaUrl(image: Event["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

function fallbackImage(slug: string): string | undefined {
  return DEFAULT_EVENTS.find((event) => event.slug === slug)?.imageSrc;
}

function fallbackDescription(slug: string): string | undefined {
  return DEFAULT_EVENTS.find((event) => event.slug === slug)?.description;
}

export function mapEventToCardItem(event: Event): EventCardItem {
  const slug = event.slug;

  return {
    id: event.id,
    slug,
    title: event.title.toUpperCase(),
    href: `/eventos/${slug}`,
    packagesHref: `/eventos/${slug}/pacotes`,
    imageSrc: resolveMediaUrl(event.image) ?? fallbackImage(slug),
    description: fallbackDescription(slug),
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
    body: fallback?.body ?? "",
    activityHeading:
      fallback?.activityHeading ?? "Qual a atividade certa para a tua festa?",
    activityDescription:
      fallback?.activityDescription ??
      "No Megacampo tens diferentes formatos para o teu evento. Escolhe a atividade e consulta os pacotes disponíveis.",
    reserveHref: "/#reservas",
    packagesHref: card.packagesHref,
  };
}
