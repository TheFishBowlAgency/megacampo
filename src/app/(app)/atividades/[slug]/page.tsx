import { notFound } from "next/navigation";
import { ActivityIntermediateContent } from "@/components/activity";
import { ActivityPackagesPageContent } from "@/components/product";
import {
  getActivityBySlug,
  getAllActivitySlugs,
} from "@/lib/activities/getActivityBySlug";
import { getUncategorizedPackagesByActivityId } from "@/lib/catalog/getPackagesByCategory";
import { getPackageCategoriesByActivityId } from "@/lib/package-categories/getPackageCategories";
import { getTestimonials } from "@/lib/testimonials/getTestimonials";

export interface ActivityPageProps {
  params: Promise<{ slug: string }>;
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
  const [packages, testimonials] = await Promise.all([
    getUncategorizedPackagesByActivityId(activity.id, slug),
    getTestimonials(),
  ]);

  return (
    <ActivityPackagesPageContent
      title={activity.title}
      description={activity.description}
      packages={packages}
      activitySlug={slug}
      testimonials={testimonials}
    />
  );
}
