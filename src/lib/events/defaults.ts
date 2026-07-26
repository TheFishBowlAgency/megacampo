import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

import { DEFAULT_EVENT_PRICING_TABS } from "./defaultPricing";
import type { EventCardItem, EventDetail } from "./types";
import {
  DEFAULT_TESTIMONIALS,
  DEFAULT_TESTIMONIALS_HEADING,
} from "@/lib/testimonials/defaults";

export const DEFAULT_EVENT_CARD_DESCRIPTION =
  "De aniversários a grandes eventos de empresa, temos experiências à medida para o teu grupo!";

export const DEFAULT_EVENT_BODY =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

function eventCard(
  slug: string,
  title: string,
  imageSrc: string,
): EventCardItem {
  return {
    id: slug,
    slug,
    title,
    href: `/eventos/${slug}`,
    packagesHref: `/eventos/${slug}/pacotes`,
    imageSrc,
    description: DEFAULT_EVENT_CARD_DESCRIPTION,
  };
}

export const DEFAULT_EVENTS: EventCardItem[] = [
  eventCard(
    "festas-de-aniversario",
    "FESTAS DE ANIVERSÁRIO",
    ACTIVITY_CARD_IMAGE_LASERTAG,
  ),
  eventCard(
    "despedida-de-solteiro-a",
    "DESPEDIDA DE SOLTEIRO(A)",
    ACTIVITY_CARD_IMAGE_PAINTBALL,
  ),
  eventCard(
    "evento-de-empresa",
    "EVENTO DE EMPRESA",
    ACTIVITY_CARD_IMAGE_AIRSOFT,
  ),
  eventCard(
    "grupos-e-escolas",
    "GRUPOS E ESCOLAS",
    ACTIVITY_CARD_IMAGE_PAINTBALL,
  ),
];

export const DEFAULT_EVENT_LISTING = {
  heroTitle: "EVENTOS",
  sectionHeading: "EVENTOS",
  cardLinkLabel: "Ver mais",
} as const;

export function getDefaultEventDetail(slug: string): EventDetail | null {
  const card = DEFAULT_EVENTS.find((event) => event.slug === slug);
  if (!card) return null;

  return {
    id: card.id,
    slug: card.slug,
    title: card.title,
    imageSrc: card.imageSrc,
    description: card.description ?? DEFAULT_EVENT_CARD_DESCRIPTION,
    body: DEFAULT_EVENT_BODY,
    activityHeading: "Qual a atividade certa para a tua festa?",
    activityDescription:
      "No Megacampo tens diferentes formatos para o teu evento: desde paintball a jogos de cooperação. Escolhe a atividade e consulta os pacotes disponíveis.",
    reserveHref: "/#reservas",
    packagesHref: card.packagesHref,
    pricingTabs: DEFAULT_EVENT_PRICING_TABS,
    testimonialsHeading: DEFAULT_TESTIMONIALS_HEADING,
    testimonials: DEFAULT_TESTIMONIALS,
  };
}
