"use client";

import { Box, Grid, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import type { ProductHighlight as ProductHighlightType } from "@/data/products";

export interface ProductHighlightStripProps {
  highlights: ProductHighlightType[];
}

/**
 * Strip of highlight boxes below the hero (e.g. "12 MAPAS", "30 MIN DE LASER").
 * Uses theme primary/offset for background.
 */
export function ProductHighlightStrip({
  highlights,
}: ProductHighlightStripProps) {
  return (
    <Box bg="bg" py={{ base: "6", md: "8" }}>
      <Container>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={{ base: "4", md: "6" }}
        >
          {highlights.map(({ label }) => (
            <Box
              key={label}
              bg="primary.muted"
              color="fg"
              borderRadius="md"
              py={{ base: "5", md: "6" }}
              px={{ base: "5", md: "6" }}
              textAlign="center"
            >
              <Text
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                fontSize={{ base: "sm", md: "md" }}
              >
                {label}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
