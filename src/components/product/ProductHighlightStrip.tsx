"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import type { ProductHighlight as ProductHighlightType } from "@/data/products";

function HighlightBadge({ label }: { label: string }) {
  return (
    <Box
      position="relative"
      borderWidth="3px"
      borderColor="primary"
      borderRadius="lg"
      px={{ base: "5", md: "6", lg: "10" }}
      py={{ base: "3", md: "4", lg: "5" }}
      textAlign="center"
      minW={{ base: "140px", md: "160px", lg: "180px" }}
    >
      <Text
        fontFamily="heading.molot"
        fontSize={{ base: "sm", md: "md", lg: "body.lg" }}
        color="fg"
        textTransform="uppercase"
        lineHeight="1.2"
      >
        {label}
      </Text>
    </Box>
  );
}

export interface ProductHighlightStripProps {
  highlights: ProductHighlightType[];
}

export function ProductHighlightStrip({
  highlights,
}: ProductHighlightStripProps) {
  return (
    <Box py={{ base: "6", md: "10", lg: "12" }}>
      <Container>
        <Flex
          justify="center"
          align="center"
          gap={{ base: "4", md: "6", lg: "12" }}
          flexWrap="wrap"
        >
          {highlights.map(({ label }) => (
            <HighlightBadge key={label} label={label} />
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
