import { DEFAULT_BLOG, DEFAULT_BLOG_POSTS } from "./defaults";
import type { BlogPostCard, BlogPostDetail } from "./types";

const DEFAULT_BODY =
  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

export function getBlogPosts(): BlogPostCard[] {
  return DEFAULT_BLOG_POSTS;
}

export function getBlogCopy() {
  return DEFAULT_BLOG;
}

export function getBlogPostBySlug(slug: string): BlogPostDetail | null {
  const post = DEFAULT_BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) return null;

  return {
    ...post,
    body: DEFAULT_BODY,
  };
}

export function getAllBlogSlugs(): string[] {
  return DEFAULT_BLOG_POSTS.map((post) => post.slug);
}
