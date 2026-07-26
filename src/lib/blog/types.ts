export type BlogPostCard = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  imageSrc?: string;
  href: string;
  body?: string;
};

export type BlogPostDetail = BlogPostCard & {
  body: string;
};
