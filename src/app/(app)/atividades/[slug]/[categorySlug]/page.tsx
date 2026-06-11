import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { FAQSection, Footer } from '@/components/landing';
import { PageHero } from '@/components/layout';
import {
  ProductHighlightStrip,
  ProductPricingSection,
  ProductTestimonialsSection,
} from '@/components/product';
import { getProductBySlug } from '@/data/products';
import {
  getAllPackageCategoryParams,
  getPackageCategoryByActivitySlug,
} from '@/lib/package-categories/getPackageCategories';
import { getCategoryPathSlug } from '@/lib/package-categories/slugHelpers';
import { getPackagesByCategoryId } from '@/lib/catalog/getPackagesByCategory';

export interface PackageCategoryPageProps {
  params: Promise<{ slug: string; categorySlug: string }>;
}

export async function generateStaticParams() {
  return getAllPackageCategoryParams();
}

export default async function PackageCategoryPage({
  params,
}: PackageCategoryPageProps) {
  const { slug, categorySlug } = await params;
  const category = await getPackageCategoryByActivitySlug(slug, categorySlug);
  if (!category) notFound();

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const packages = await getPackagesByCategoryId(
    category.id,
    product.packages,
    {
      activitySlug: slug,
      categoryPathSlug: getCategoryPathSlug(slug, category.slug),
    },
  );

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--chakra-colors-gray-light)' }}>
        <PageHero
          title={category.title}
          heroBg="bg.hero"
          titleTextStyle="h1.molot"
          minH={{ base: '300px', md: '400px', lg: '560px' }}
        />
        <ProductHighlightStrip highlights={product.highlights} />
        <ProductPricingSection
          sectionTitle={product.sectionTitle}
          sectionDescription={product.sectionDescription}
          packages={packages}
          activitySlug={slug}
          categorySlug={getCategoryPathSlug(slug, category.slug)}
        />
        <ProductTestimonialsSection
          heading={product.testimonialsHeading}
          testimonials={product.testimonials}
        />
        <FAQSection
          id="faq"
          heading={product.faqHeading}
          variant="subtle"
          items={product.faqItems}
        />
        <Footer />
      </main>
    </>
  );
}
