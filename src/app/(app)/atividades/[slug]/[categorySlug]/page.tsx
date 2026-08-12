import { notFound } from "next/navigation";
import {
  ActivityPackagesPageContent,
  PackageDetailContent,
} from "@/components/product";
import { getActivityBySlug } from "@/lib/activities/getActivityBySlug";
import { resolveActivityHighlights } from "@/lib/activities/landingDefaults";
import {
  getAllActivitySegmentParams,
  resolveActivitySegment,
} from "@/lib/catalog/getPackageBySlug";
import { getGroupExtras } from "@/lib/catalog";
import { getPackagesByCategoryId } from "@/lib/catalog/getPackagesByCategory";
import { getCategoryPathSlug } from "@/lib/package-categories/slugHelpers";
import { getTestimonials } from "@/lib/testimonials/getTestimonials";
import { getRequestLocale } from "@/i18n/site";
import type { Media } from "@/payload-types";

export interface ActivitySegmentPageProps {
  params: Promise<{ slug: string; categorySlug: string }>;
}

export const dynamic = "force-dynamic";

function resolveMediaUrl(
  image: string | Media | null | undefined,
): string | undefined {
  if (!image || typeof image === "string") return undefined;
  return image.url ?? undefined;
}

export async function generateStaticParams() {
  return getAllActivitySegmentParams();
}

export default async function ActivitySegmentPage({
  params,
}: ActivitySegmentPageProps) {
  const { slug, categorySlug: segment } = await params;
  const resolution = await resolveActivitySegment(slug, segment);
  if (!resolution) notFound();

  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();

  if (resolution.type === "package") {
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
        categoryLabel={activity.title}
        description={activity.description ?? undefined}
        highlights={packageData.highlights}
        backHref={`/atividades/${slug}`}
        backLabel="Voltar às Reservas"
      />
    );
  }

  const { category } = resolution;

  const categoryPathSlug = getCategoryPathSlug(slug, category.slug);
  const locale = await getRequestLocale();
  const [packages, testimonials] = await Promise.all([
    getPackagesByCategoryId(category.id, {
      activitySlug: slug,
      categoryPathSlug,
    }),
    getTestimonials(locale),
  ]);

  return (
    <ActivityPackagesPageContent
      title={activity.title}
      heroTitle={category.title}
      description={category.description ?? activity.description}
      highlights={resolveActivityHighlights(
        slug,
        category.highlights,
        activity.highlights,
      )}
      heroBackgroundImageSrc={
        resolveMediaUrl(category.image) ?? resolveMediaUrl(activity.image)
      }
      packages={packages}
      activitySlug={slug}
      categorySlug={categoryPathSlug}
      testimonials={testimonials}
    />
  );
}
