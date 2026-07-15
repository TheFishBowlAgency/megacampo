import config from '@payload-config';
import type { BasePayload } from 'payload';
import { getPayload } from 'payload';

import type { ProductExtra } from '@/components/product/detail/shared';
import { getActivityBySlug } from '@/lib/activities/getActivityBySlug';
import { getPackageCategoryByActivitySlug } from '@/lib/package-categories/getPackageCategories';
import type { GroupExtra, Media } from '@/payload-types';

import { formatPriceFromCents } from './formatPrice';

export type GroupExtrasResult = {
  extras: ProductExtra[];
  showSection: boolean;
};

function resolveMediaUrl(image: GroupExtra['image']): string | undefined {
  if (!image || typeof image === 'string') {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

function mapGroupExtra(doc: GroupExtra): ProductExtra {
  return {
    id: doc.id,
    name: doc.name,
    price: formatPriceFromCents(doc.priceCents ?? 0),
    imageSrc: resolveMediaUrl(doc.image),
  };
}

function hasGroupExtraAssignments(
  groupExtras: (string | GroupExtra)[] | null | undefined,
): boolean {
  return Array.isArray(groupExtras) && groupExtras.length > 0;
}

async function resolveGroupExtrasList(
  payload: BasePayload,
  groupExtras: (string | GroupExtra)[] | null | undefined,
): Promise<ProductExtra[]> {
  if (!groupExtras?.length) {
    return [];
  }

  const byId = new Map<string, GroupExtra>();
  const unresolvedIds: string[] = [];

  for (const extra of groupExtras) {
    if (typeof extra === 'string') {
      unresolvedIds.push(extra);
      continue;
    }

    if (extra && typeof extra === 'object') {
      byId.set(extra.id, extra);
    }
  }

  if (unresolvedIds.length > 0) {
    const { docs } = await payload.find({
      collection: 'group-extras',
      where: {
        id: {
          in: unresolvedIds,
        },
      },
      depth: 1,
      limit: unresolvedIds.length,
      pagination: false,
    });

    for (const doc of docs) {
      byId.set(doc.id, doc as GroupExtra);
    }
  }

  return groupExtras
    .map((extra) => {
      const id = typeof extra === 'string' ? extra : extra.id;
      return byId.get(id);
    })
    .filter(
      (extra): extra is GroupExtra =>
        extra != null && extra.isActive !== false,
    )
    .map(mapGroupExtra);
}

async function fetchCategoryGroupExtras(
  payload: BasePayload,
  categoryId: string,
): Promise<(string | GroupExtra)[] | null | undefined> {
  const { docs } = await payload.find({
    collection: 'package-categories',
    where: {
      id: {
        equals: categoryId,
      },
    },
    depth: 2,
    limit: 1,
    pagination: false,
  });

  return docs[0]?.groupExtras;
}

async function fetchActivityGroupExtras(
  payload: BasePayload,
  activityId: string,
): Promise<(string | GroupExtra)[] | null | undefined> {
  const { docs } = await payload.find({
    collection: 'activities',
    where: {
      id: {
        equals: activityId,
      },
    },
    depth: 2,
    limit: 1,
    pagination: false,
  });

  return docs[0]?.groupExtras;
}

export async function getGroupExtras(
  activitySlug: string,
  categoryPathSlug?: string | null,
): Promise<GroupExtrasResult> {
  const payload = await getPayload({ config });

  if (categoryPathSlug) {
    const category = await getPackageCategoryByActivitySlug(
      activitySlug,
      categoryPathSlug,
    );
    if (!category) {
      return { extras: [], showSection: false };
    }

    let groupExtras = await fetchCategoryGroupExtras(payload, category.id);
    let extras = await resolveGroupExtrasList(payload, groupExtras);

    if (extras.length === 0 && !hasGroupExtraAssignments(groupExtras)) {
      const activityId =
        typeof category.activity === 'string'
          ? category.activity
          : category.activity?.id;

      if (activityId) {
        groupExtras = await fetchActivityGroupExtras(payload, activityId);
        extras = await resolveGroupExtrasList(payload, groupExtras);
      }
    }

    return {
      extras,
      showSection: true,
    };
  }

  const activity = await getActivityBySlug(activitySlug);
  if (!activity) {
    return { extras: [], showSection: false };
  }

  const groupExtras = await fetchActivityGroupExtras(payload, activity.id);
  const extras = await resolveGroupExtrasList(payload, groupExtras);

  return {
    extras,
    showSection: extras.length > 0 || hasGroupExtraAssignments(groupExtras),
  };
}
