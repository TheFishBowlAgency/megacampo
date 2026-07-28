import type { Payload } from "payload";

import { DEFAULT_BLOG, DEFAULT_BLOG_POSTS } from "@/lib/blog/defaults";
import { isLexicalState, textToLexical } from "@/lib/richtext/textToLexical";

async function ensureBlogGlobal(payload: Payload): Promise<void> {
  const existing = await payload.findGlobal({ slug: "blog", depth: 0 });

  if (existing.hero?.heading) {
    payload.logger.info("Blog global already populated — skipped");
    return;
  }

  await payload.updateGlobal({
    slug: "blog",
    data: {
      hero: {
        heading: DEFAULT_BLOG.heroTitle,
      },
      section: {
        heading: DEFAULT_BLOG.sectionHeading,
        cardLinkLabel: DEFAULT_BLOG.cardLinkLabel,
      },
    },
  });

  payload.logger.info("Seeded blog global");
}

export async function runBlogSeed(payload: Payload): Promise<void> {
  await ensureBlogGlobal(payload);

  let created = 0;
  let updated = 0;

  for (const [index, seed] of DEFAULT_BLOG_POSTS.entries()) {
    const lexicalBody = textToLexical(
      typeof seed.body === "string" ? seed.body : "",
    );

    const existing = await payload.find({
      collection: "posts",
      where: {
        or: [
          { slug: { equals: seed.slug } },
          { title: { equals: seed.title } },
        ],
      },
      limit: 1,
      depth: 0,
    });

    if (existing.docs[0]) {
      const doc = existing.docs[0];
      const needsBody = !isLexicalState(doc.body);
      const needsExcerpt = !doc.excerpt?.trim();
      const needsTags = !doc.tags?.length;

      if (needsBody || needsExcerpt || needsTags) {
        await payload.update({
          collection: "posts",
          id: doc.id,
          data: {
            excerpt: doc.excerpt?.trim() || seed.excerpt,
            ...(needsTags && seed.tags
              ? { tags: seed.tags.map((label) => ({ label })) }
              : {}),
            ...(needsBody ? { body: lexicalBody } : {}),
          },
          overrideAccess: true,
        });
        updated += 1;
      }
      continue;
    }

    await payload.create({
      collection: "posts",
      data: {
        title: seed.title,
        slug: seed.slug,
        excerpt: seed.excerpt,
        body: lexicalBody,
        sort: index,
        isActive: true,
        ...(seed.tags ? { tags: seed.tags.map((label) => ({ label })) } : {}),
      },
      overrideAccess: true,
    });
    created += 1;
  }

  if (created === 0 && updated === 0) {
    payload.logger.info("Blog posts already populated — skipped");
    return;
  }

  payload.logger.info(
    `Seeded blog posts (created ${created}, updated ${updated})`,
  );
}
