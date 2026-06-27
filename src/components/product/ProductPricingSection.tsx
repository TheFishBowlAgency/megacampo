'use client';

import { Grid } from '@chakra-ui/react';
import { Container } from '@/components/layout';
import { SectionHeading } from '@/components/cenarios';
import { PricingCard } from './PricingCard';
import {
  buildFlatPackagePath,
  buildPackagePath,
} from '@/lib/catalog/packageSlugHelpers';

import type { PackageCardItem } from '@/lib/catalog/types';

export interface ProductPricingSectionProps {
  sectionTitle: string;
  sectionDescription: string;
  packages: PackageCardItem[];
  activitySlug?: string;
  categorySlug?: string;
  reserveHref?: string;
}

/**
 * "PAINTBALL É CONNOSCO" section with pricing grid.
 */
export function ProductPricingSection({
  sectionTitle,
  sectionDescription,
  packages,
  activitySlug,
  categorySlug,
  reserveHref = '/#reservas',
}: ProductPricingSectionProps) {
  return (
    <Container py={{ base: '10', md: '14', lg: '16' }}>
      <SectionHeading title={sectionTitle} description={sectionDescription} />
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        gap={{ base: '2.5', md: '4', lg: '5' }}
      >
        {packages.map((pkg) => {
          const packageSlug = pkg.slug ?? pkg.id;
          const detailHref = activitySlug
            ? categorySlug
              ? buildPackagePath(activitySlug, categorySlug, packageSlug)
              : buildFlatPackagePath(activitySlug, packageSlug)
            : reserveHref;

          return <PricingCard key={pkg.id} pkg={pkg} detailHref={detailHref} />;
        })}
      </Grid>
    </Container>
  );
}
