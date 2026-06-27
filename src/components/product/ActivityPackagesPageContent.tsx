import { Header } from '@/components/header';
import { Footer } from '@/components/landing';
import { PageHero } from '@/components/layout';
import { ProductPricingSection } from '@/components/product/ProductPricingSection';
import type { PackageCardItem } from '@/lib/catalog/types';

export interface ActivityPackagesPageContentProps {
  title: string;
  description?: string | null;
  packages: PackageCardItem[];
  activitySlug: string;
  /** When set, package cards link to the 3-level atividades path. */
  categorySlug?: string;
}

/**
 * Package listing layout shared by category pages (e.g. Paintball Group)
 * and flat activities without an intermediate category (e.g. Airsoft).
 */
export function ActivityPackagesPageContent({
  title,
  description,
  packages,
  activitySlug,
  categorySlug,
}: ActivityPackagesPageContentProps) {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--chakra-colors-gray-light)' }}>
        <PageHero
          title={title}
          heroBg="bg.hero"
          titleTextStyle="h1.molot"
          minH={{ base: '300px', md: '400px', lg: '560px' }}
        />
        <ProductPricingSection
          sectionTitle={title}
          sectionDescription={description ?? ''}
          packages={packages}
          activitySlug={activitySlug}
          categorySlug={categorySlug}
        />
        <Footer />
      </main>
    </>
  );
}
