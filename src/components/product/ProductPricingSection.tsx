"use client";

import { Grid } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/cenarios";
import { PricingCard } from "./PricingCard";
import type { ProductData } from "@/data/products";

export interface ProductPricingSectionProps {
  sectionTitle: string;
  sectionDescription: string;
  packages: ProductData["packages"];
  reserveHref?: string;
}

/**
 * "PAINTBALL É CONNOSCO" section with pricing grid.
 */
export function ProductPricingSection({
  sectionTitle,
  sectionDescription,
  packages,
  reserveHref = "/#reservas",
}: ProductPricingSectionProps) {
  return (
    <Container py={{ base: "10", md: "14", lg: "16" }}>
      <SectionHeading title={sectionTitle} description={sectionDescription} />
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={{ base: "6", md: "6", lg: "6" }}
      >
        {packages.map((pkg) => (
          <PricingCard key={pkg.id} pkg={pkg} reserveHref={reserveHref} />
        ))}
      </Grid>
    </Container>
  );
}
