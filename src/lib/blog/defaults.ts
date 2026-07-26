import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

import type { BlogPostCard } from "./types";

export const DEFAULT_BLOG_POSTS: BlogPostCard[] = [
  {
    id: "1",
    slug: "dicas-para-o-teu-primeiro-jogo",
    title: "Dicas para o teu primeiro jogo",
    excerpt:
      "Tudo o que precisas de saber antes de entrares no campo: equipamento, regras e como tirar o máximo da experiência.",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    href: "/blog/dicas-para-o-teu-primeiro-jogo",
  },
  {
    id: "2",
    slug: "team-building-no-megacampo",
    title: "Team building no Megacampo",
    excerpt:
      "Porque é que o paintball e os jogos de cooperação funcionam tão bem para equipas de empresa.",
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    href: "/blog/team-building-no-megacampo",
  },
  {
    id: "3",
    slug: "os-nossos-12-cenarios",
    title: "Os nossos 12 cenários",
    excerpt:
      "Uma volta rápida pelos mapas mundialmente famosos espalhados por 40 hectares.",
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
    href: "/blog/os-nossos-12-cenarios",
  },
];

export const DEFAULT_BLOG = {
  heroTitle: "BLOG",
  sectionHeading: "ÚLTIMOS ARTIGOS",
  cardLinkLabel: "Ler mais",
} as const;
