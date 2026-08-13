import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

import type { EventQuote } from "@/lib/events/types";

export const DEFAULT_TESTIMONIALS_HEADING = "O que dizem os nossos clientes?";

export const DEFAULT_TESTIMONIALS: EventQuote[] = [
  {
    id: "mariana",
    name: "MARIANA",
    quote:
      "This paintball field is simply incredible! Everything is well thought out, incredible scenarios and plenty of space to run and hide. The vibe is top-notch, the staff is super chill and gets everyone into the game right from the start, even those who have never played before. 5/5 stars. I recommend it without a doubt!",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    featured: true,
    stars: 5,
  },
  {
    id: "joao",
    name: "JOÃO",
    quote:
      "Cenários sensacionais e uma equipa claramente focada em proporcionar uma experiência de paintball de alta qualidade.",
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
    stars: 5,
  },
  {
    id: "sondre",
    name: "SONDRE",
    quote:
      "Absolutely amazing stagparty! We were a group of 14 guys, and it couldn't have been better. 5/5 stars. Definitely coming back!",
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    stars: 5,
  },
  {
    id: "marjo",
    name: "MARJO",
    quote:
      "Cenários, material, staff, instalações incríveis. Tudo foi fantástico. Já joguei em muitos sítios e este é de outro planeta.",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    stars: 5,
  },
];
