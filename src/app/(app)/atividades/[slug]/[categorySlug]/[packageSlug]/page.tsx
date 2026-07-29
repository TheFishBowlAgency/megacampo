import { notFound } from "next/navigation";
import { PackageDetailContent } from "@/components/product/PackageDetailContent";
import {
  getPackageByActivityCategorySlug,
  getAllPackageParams,
  getGroupExtras,
} from "@/lib/catalog";
import { buildPackageCategoryPath } from "@/lib/package-categories/slugHelpers";
import { getPackageCategoryByActivitySlug } from "@/lib/package-categories/getPackageCategories";

export interface PackagePageProps {
  params: Promise<{ slug: string; categorySlug: string; packageSlug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return getAllPackageParams();
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { slug, categorySlug, packageSlug } = await params;
  const packageData = await getPackageByActivityCategorySlug(
    slug,
    categorySlug,
    packageSlug,
  );
  if (!packageData) notFound();

  const category = await getPackageCategoryByActivitySlug(slug, categorySlug);
  if (!category) notFound();

  const { extras, showSection } = await getGroupExtras(slug, categorySlug);

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
      categoryLabel={category.title}
      description={category.description?.trim() || undefined}
      highlights={packageData.highlights}
      backHref={buildPackageCategoryPath(slug, category.slug)}
      backLabel="Voltar às Reservas"
    />
  );
}
