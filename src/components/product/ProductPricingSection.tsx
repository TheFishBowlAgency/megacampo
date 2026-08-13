"use client";

import { Grid } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/cenarios";
import { PricingCard } from "./PricingCard";
import {
  buildFlatPackagePath,
  buildPackagePath,
} from "@/lib/catalog/packageSlugHelpers";

import type { PackageCardItem } from "@/lib/catalog/types";

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
 * Cards keep a fixed max width and center as a group when fewer than 4.
 */
export function ProductPricingSection({
  sectionTitle,
  sectionDescription,
  packages,
  activitySlug,
  categorySlug,
  reserveHref = "/#reservas",
}: ProductPricingSectionProps) {
  const mdColumnCount = Math.min(Math.max(packages.length, 1), 2);
  const lgColumnCount = Math.min(Math.max(packages.length, 1), 3);
  const xlColumnCount = Math.min(Math.max(packages.length, 1), 4);

  return (
    <Container py={{ base: "10", md: "14", lg: "16" }}>
      <SectionHeading
        title={sectionTitle}
        description={sectionDescription}
        descriptionVariant="lead"
      />
      <Grid
        templateColumns={{
          base: `repeat(${Math.min(Math.max(packages.length, 1), 2)}, minmax(0, 1fr))`,
          md: `repeat(${mdColumnCount}, minmax(0, 315px))`,
          lg: `repeat(${lgColumnCount}, minmax(0, 315px))`,
          xl: `repeat(${xlColumnCount}, minmax(0, 315px))`,
        }}
        gap={{ base: "3", md: "5", lg: "5" }}
        w={{ base: "full", md: "auto" }}
        mx="auto"
        maxW="full"
        justifyContent="center"
        alignItems="stretch"
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
