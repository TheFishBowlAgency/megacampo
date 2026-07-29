import type { Media, Post } from "@/payload-types";

import { textToLexical } from "@/lib/richtext/textToLexical";

import { DEFAULT_BLOG_BODY, getDefaultBlogPost } from "./defaults";
import type { BlogPostCard, BlogPostDetail } from "./types";

function resolveMediaUrl(image: Post["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

function resolveBody(post: Post, fallback: string): unknown {
  const body = post.body as unknown;
  if (body && typeof body === "object" && "root" in body) {
    return body;
  }
  if (typeof body === "string" && body.trim()) {
    return textToLexical(body);
  }
  return textToLexical(fallback || DEFAULT_BLOG_BODY);
}

export function mapPostToCard(post: Post): BlogPostCard {
  const fallback = getDefaultBlogPost(post.slug);

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt?.trim() || fallback?.excerpt || "",
    tags:
      post.tags
        ?.map((tag) => tag.label?.trim())
        .filter((label): label is string => Boolean(label)) ??
      fallback?.tags ??
      [],
    imageSrc: resolveMediaUrl(post.image) ?? fallback?.imageSrc,
    href: `/blog/${post.slug}`,
  };
}

export function mapPostToDetail(post: Post): BlogPostDetail {
  const card = mapPostToCard(post);
  const fallback = getDefaultBlogPost(post.slug);

  return {
    ...card,
    author: fallback?.author ?? "Equipa Megacampo",
    publishedAt:
      (typeof post.updatedAt === "string" && post.updatedAt) ||
      (typeof post.createdAt === "string" && post.createdAt) ||
      fallback?.publishedAt,
    gallery: fallback?.gallery,
    body: resolveBody(
      post,
      typeof fallback?.body === "string" ? fallback.body : DEFAULT_BLOG_BODY,
    ),
  };
}
