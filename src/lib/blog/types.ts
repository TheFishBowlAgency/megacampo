export type BlogCopy = {
  heroTitle: string;
  heroBackgroundImageSrc?: string;
  sectionHeading: string;
  cardLinkLabel: string;
};

export type BlogPostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags?: string[];
  imageSrc?: string;
  href: string;
  body?: unknown;
  author?: string;
  publishedAt?: string;
  gallery?: string[];
};

export type BlogPostDetail = BlogPostCard & {
  body: unknown;
};
