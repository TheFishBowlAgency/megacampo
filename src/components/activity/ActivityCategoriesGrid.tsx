'use client';

import { Grid } from '@chakra-ui/react';
import { ActivityHoverCard } from '@/components/ui';
import type { PackageCategoryCardItem } from '@/lib/package-categories/types';

interface ActivityCategoriesGridProps {
  categories: PackageCategoryCardItem[];
}

export function ActivityCategoriesGrid({
  categories,
}: ActivityCategoriesGridProps) {
  const mdColumnCount = Math.min(categories.length, 2);
  const lgColumnCount = Math.min(categories.length, 4);

  return (
    <Grid
      w={{ base: 'full', md: 'auto' }}
      mx={{ md: 'auto' }}
      templateColumns={{
        base: '1fr',
        md: `repeat(${mdColumnCount}, minmax(0, 315px))`,
        lg: `repeat(${lgColumnCount}, minmax(0, 315px))`,
      }}
      gap={{ base: '6', md: '5', lg: '5' }}
      justifyContent="center"
    >
      {categories.map((category) => (
        <ActivityHoverCard
          key={category.id}
          imageSrc={category.imageSrc}
          imageAlt={category.title}
          tag={category.tag}
          title={category.title}
          subtitle={category.subtitle}
          description={category.description}
          href={category.href}
          ctaLabel="RESERVA JÁ"
        />
      ))}
    </Grid>
  );
}
