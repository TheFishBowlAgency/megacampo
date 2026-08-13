import config from "@payload-config";
import { getPayload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { localeQuery } from "@/lib/site/localeQuery";

import {
  DEFAULT_BLOG,
  DEFAULT_BLOG_POSTS,
  getDefaultBlogPost,
  toBlogPostCard,
} from "./defaults";
import { mapBlogGlobal } from "./mapBlog";
import { mapPostToCard, mapPostToDetail } from "./mapPost";
import type { BlogCopy, BlogPostCard, BlogPostDetail } from "./types";

export async function getBlogCopy(locale: SiteLocale): Promise<BlogCopy> {
  try {
    const payload = await getPayload({ config });
    const doc = await payload.findGlobal({
      slug: "blog",
      depth: 1,
      ...localeQuery(locale),
    });
    return mapBlogGlobal(doc);
  } catch {
    return DEFAULT_BLOG;
  }
}

export async function getBlogPosts(
  locale: SiteLocale,
): Promise<BlogPostCard[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "sort",
      limit: 50,
      depth: 1,
      pagination: false,
      ...localeQuery(locale),
    });

    if (docs.length === 0) {
      return DEFAULT_BLOG_POSTS.map(toBlogPostCard);
    }

    return docs.map(mapPostToCard);
  } catch {
    return DEFAULT_BLOG_POSTS.map(toBlogPostCard);
  }
}

export async function getBlogPostBySlug(
  slug: string,
  locale: SiteLocale,
): Promise<BlogPostDetail | null> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            isActive: {
              equals: true,
            },
          },
        ],
      },
      limit: 1,
      depth: 1,
      pagination: false,
      ...localeQuery(locale),
    });

    if (docs[0]) {
      return mapPostToDetail(docs[0]);
    }
  } catch {
    // fall through to defaults
  }

  return getDefaultBlogPost(slug);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "posts",
      where: {
        isActive: {
          equals: true,
        },
      },
      limit: 100,
      depth: 0,
      pagination: false,
    });

    const slugs = docs.map((post) => post.slug);
    if (slugs.length > 0) return slugs;
  } catch {
    // fall through to defaults
  }

  return DEFAULT_BLOG_POSTS.map((post) => post.slug);
}
