import { notFound } from "next/navigation";
import { ActivityIntermediateContent } from "@/components/activity";
import { ActivityPackagesPageContent } from "@/components/product";
import {
  getActivityBySlug,
  getAllActivitySlugs,
} from "@/lib/activities/getActivityBySlug";
import { resolveActivityHighlights } from "@/lib/activities/landingDefaults";
import { getUncategorizedPackagesByActivityId } from "@/lib/catalog/getPackagesByCategory";
import { getPackageCategoriesByActivityId } from "@/lib/package-categories/getPackageCategories";
import { getTestimonials } from "@/lib/testimonials/getTestimonials";
import { getRequestLocale } from "@/i18n/site";
import type { Media } from "@/payload-types";

export interface ActivityPageProps {
  params: Promise<{ slug: string }>;
}

function resolveMediaUrl(
  image: string | Media | null | undefined,
): string | undefined {
  if (!image || typeof image === "string") return undefined;
  return image.url ?? undefined;
}

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();

  const categories = await getPackageCategoriesByActivityId(activity.id);

  // Intermediate step: pick a category (e.g. Paintball Group)
  if (categories.length > 0) {
    return (
      <ActivityIntermediateContent
        title={activity.title}
        description={activity.description}
        categories={categories}
      />
    );
  }

  // Flat activities with no categories: go straight to packages marketing
  const locale = await getRequestLocale();
  const [packages, testimonials] = await Promise.all([
    getUncategorizedPackagesByActivityId(activity.id, slug),
    getTestimonials(locale),
  ]);

  return (
    <ActivityPackagesPageContent
      title={activity.title}
      description={activity.description}
      highlights={resolveActivityHighlights(slug, activity.highlights)}
      heroBackgroundImageSrc={resolveMediaUrl(activity.image)}
      packages={packages}
      activitySlug={slug}
      testimonials={testimonials}
    />
  );
}
