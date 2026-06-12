import config from "@payload-config";
import { getPayload } from "payload";

import type { Activity, Media } from "@/payload-types";

import type { ActivityCardItem } from "./types";

function resolveMediaUrl(image: Activity["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapActivityToCardItem(activity: Activity): ActivityCardItem {
  return {
    id: activity.id,
    title: activity.title.toUpperCase(),
    tag: activity.title.toUpperCase(),
    subtitle: "",
    description: activity.description ?? "",
    href: `/atividades/${activity.slug}`,
    imageSrc: resolveMediaUrl(activity.image),
  };
}

export async function getActivities(): Promise<ActivityCardItem[]> {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: "activities",
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: "sort",
    depth: 1,
    limit: 100,
    pagination: false,
  });

  return docs.map(mapActivityToCardItem);
}
