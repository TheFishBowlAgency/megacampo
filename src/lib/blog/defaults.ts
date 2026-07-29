import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

import type { BlogCopy, BlogPostCard, BlogPostDetail } from "./types";

export const DEFAULT_BLOG_BODY =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

export const DEFAULT_BLOG_POSTS: BlogPostDetail[] = [
  {
    id: "1",
    slug: "dicas-para-o-teu-primeiro-jogo",
    title: "Dicas para o teu primeiro jogo",
    excerpt:
      "Tudo o que precisas de saber antes de entrares no campo: equipamento, regras e como tirar o máximo da experiência.",
    tags: ["Paintball", "Woodsball"],
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    href: "/blog/dicas-para-o-teu-primeiro-jogo",
    author: "Equipa Megacampo",
    publishedAt: "2025-01-15",
    gallery: [
      ACTIVITY_CARD_IMAGE_PAINTBALL,
      ACTIVITY_CARD_IMAGE_AIRSOFT,
      ACTIVITY_CARD_IMAGE_LASERTAG,
      ACTIVITY_CARD_IMAGE_PAINTBALL,
    ],
    body: DEFAULT_BLOG_BODY,
  },
  {
    id: "2",
    slug: "team-building-no-megacampo",
    title: "Team building no Megacampo",
    excerpt:
      "Porque é que o paintball e os jogos de cooperação funcionam tão bem para equipas de empresa.",
    tags: ["Eventos", "Empresa"],
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    href: "/blog/team-building-no-megacampo",
    author: "Equipa Megacampo",
    publishedAt: "2025-02-10",
    gallery: [
      ACTIVITY_CARD_IMAGE_AIRSOFT,
      ACTIVITY_CARD_IMAGE_PAINTBALL,
      ACTIVITY_CARD_IMAGE_LASERTAG,
      ACTIVITY_CARD_IMAGE_AIRSOFT,
    ],
    body: DEFAULT_BLOG_BODY,
  },
  {
    id: "3",
    slug: "os-nossos-12-cenarios",
    title: "Os nossos 12 cenários",
    excerpt:
      "Uma volta rápida pelos mapas mundialmente famosos espalhados por 40 hectares.",
    tags: ["Cenários", "Parque"],
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
    href: "/blog/os-nossos-12-cenarios",
    author: "Equipa Megacampo",
    publishedAt: "2025-03-01",
    gallery: [
      ACTIVITY_CARD_IMAGE_LASERTAG,
      ACTIVITY_CARD_IMAGE_PAINTBALL,
      ACTIVITY_CARD_IMAGE_AIRSOFT,
      ACTIVITY_CARD_IMAGE_LASERTAG,
    ],
    body: DEFAULT_BLOG_BODY,
  },
];

export const DEFAULT_BLOG: BlogCopy = {
  heroTitle: "BLOG",
  sectionHeading: "BLOG",
  cardLinkLabel: "Ver mais",
};

export function getDefaultBlogPost(slug: string): BlogPostDetail | null {
  return DEFAULT_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function toBlogPostCard(post: BlogPostDetail): BlogPostCard {
  const { body: _body, ...card } = post;
  return card;
}
