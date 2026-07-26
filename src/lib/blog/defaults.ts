import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

import type { BlogPostCard, BlogPostDetail } from "./types";

export const DEFAULT_BLOG_BODY =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

export const DEFAULT_BLOG_POSTS: BlogPostDetail[] = [
  {
    id: "1",
    slug: "dicas-para-o-teu-primeiro-jogo",
    title: "Dicas para o teu primeiro jogo",
    excerpt:
      "Tudo o que precisas de saber antes de entrares no campo: equipamento, regras e como tirar o máximo da experiência.",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    href: "/blog/dicas-para-o-teu-primeiro-jogo",
    body: DEFAULT_BLOG_BODY,
  },
  {
    id: "2",
    slug: "team-building-no-megacampo",
    title: "Team building no Megacampo",
    excerpt:
      "Porque é que o paintball e os jogos de cooperação funcionam tão bem para equipas de empresa.",
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    href: "/blog/team-building-no-megacampo",
    body: DEFAULT_BLOG_BODY,
  },
  {
    id: "3",
    slug: "os-nossos-12-cenarios",
    title: "Os nossos 12 cenários",
    excerpt:
      "Uma volta rápida pelos mapas mundialmente famosos espalhados por 40 hectares.",
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
    href: "/blog/os-nossos-12-cenarios",
    body: DEFAULT_BLOG_BODY,
  },
];

export const DEFAULT_BLOG = {
  heroTitle: "BLOG",
  sectionHeading: "ÚLTIMOS ARTIGOS",
  cardLinkLabel: "Ler mais",
} as const;

export function getDefaultBlogPost(slug: string): BlogPostDetail | null {
  return DEFAULT_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
}

export function toBlogPostCard(post: BlogPostDetail): BlogPostCard {
  const { body: _body, ...card } = post;
  return card;
}
