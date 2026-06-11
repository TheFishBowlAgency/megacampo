import config from "@payload-config";
import { getPayload } from "payload";

import type { Activity } from "@/payload-types";

export async function getActivityBySlug(
  slug: string,
): Promise<Activity | null> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "activities",
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
  });

  return docs[0] ?? null;
}

export async function getAllActivitySlugs(): Promise<string[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "activities",
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 100,
    depth: 0,
    pagination: false,
  });

  return docs.map((activity) => activity.slug);
}
