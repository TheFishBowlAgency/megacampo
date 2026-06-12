import { notFound } from 'next/navigation';
import { PackageDetailContent } from '@/components/product/PackageDetailContent';
import { getCategoryBySlug } from '@/data/categories';
import {
  getPackageByActivityCategorySlug,
  getAllPackageParams,
} from '@/lib/catalog';
import { buildPackageCategoryPath } from '@/lib/package-categories/slugHelpers';
import { getPackageCategoryByActivitySlug } from '@/lib/package-categories/getPackageCategories';

export interface PackagePageProps {
  params: Promise<{ slug: string; categorySlug: string; packageSlug: string }>;
}

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

  const paintballCategory = getCategoryBySlug('paintball');
  const extras = paintballCategory?.extras ?? [];

  return (
    <PackageDetailContent
      packageId={packageData.id}
      name={packageData.name}
      basePriceCents={packageData.config.basePriceCents}
      imageSrc={packageData.imageSrc}
      extraGroups={packageData.config.extraGroups}
      extras={extras}
      backHref={buildPackageCategoryPath(slug, category.slug)}
      backLabel="Voltar às Reservas"
    />
  );
}
