"use client";

import { Box, Text, VStack } from "@chakra-ui/react";

export interface PageHeroProps {
  /** Main title, can be multi-line (split by \n or pass array) */
  title: string | string[];
  /** Subtitle below the title */
  subtitle?: string;
}

/**
 * Reusable full-width hero section with dark background, centered title and optional subtitle.
 * Used on Cenários and other inner pages.
 */
export function PageHero({ title, subtitle }: PageHeroProps) {
  const lines = Array.isArray(title)
    ? title
    : title.split("\n").filter(Boolean);

  return (
    <Box bg="bg.dark" color="white" py={{ base: "12", md: "16", lg: "20" }}>
      <VStack
        gap={{ base: "3", md: "4" }}
        textAlign="center"
        maxW="3xl"
        mx="auto"
        px={{ base: "4", md: "6" }}
      >
        <Text
          as="h1"
          fontFamily="heading"
          fontSize={{ base: "2.5rem", sm: "3rem", md: "4rem", lg: "4.5rem" }}
          fontWeight="normal"
          lineHeight="1"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {lines.map((line, i) => (
            <Box key={i} as="span" display="block">
              {line}
            </Box>
          ))}
        </Text>
        {subtitle && (
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.900"
            lineHeight="1.4"
          >
            {subtitle}
          </Text>
        )}
      </VStack>
    </Box>
  );
}
