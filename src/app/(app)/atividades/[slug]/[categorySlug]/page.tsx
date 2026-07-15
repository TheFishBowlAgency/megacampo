import { notFound } from 'next/navigation';
import {
  ActivityPackagesPageContent,
  PackageDetailContent,
} from '@/components/product';
import { getActivityBySlug } from '@/lib/activities/getActivityBySlug';
import {
  getAllActivitySegmentParams,
  resolveActivitySegment,
} from '@/lib/catalog/getPackageBySlug';
import { getGroupExtras } from '@/lib/catalog';
import { getPackagesByCategoryId } from '@/lib/catalog/getPackagesByCategory';
import { getCategoryPathSlug } from '@/lib/package-categories/slugHelpers';

export interface ActivitySegmentPageProps {
  params: Promise<{ slug: string; categorySlug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return getAllActivitySegmentParams();
}

export default async function ActivitySegmentPage({
  params,
}: ActivitySegmentPageProps) {
  const { slug, categorySlug: segment } = await params;
  const resolution = await resolveActivitySegment(slug, segment);
  if (!resolution) notFound();

  if (resolution.type === 'package') {
    const { package: packageData } = resolution;
    const { extras, showSection } = await getGroupExtras(slug);

    return (
      <PackageDetailContent
        key={packageData.id}
        packageId={packageData.id}
        name={packageData.name}
        basePriceCents={packageData.config.basePriceCents}
        imageSrc={packageData.imageSrc}
        extraGroups={packageData.config.extraGroups}
        extras={extras}
        showGroupExtrasSection={showSection}
        backHref={`/atividades/${slug}`}
        backLabel="Voltar às Reservas"
      />
    );
  }

  const { category } = resolution;
  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();

  const categoryPathSlug = getCategoryPathSlug(slug, category.slug);
  const packages = await getPackagesByCategoryId(category.id, {
    activitySlug: slug,
    categoryPathSlug,
  });

  return (
    <ActivityPackagesPageContent
      title={category.title}
      description={category.description ?? activity.description}
      packages={packages}
      activitySlug={slug}
      categorySlug={categoryPathSlug}
    />
  );
}
