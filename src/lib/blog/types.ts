export type BlogPostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageSrc?: string;
  href: string;
  body?: unknown;
};

export type BlogPostDetail = BlogPostCard & {
  body: unknown;
};
