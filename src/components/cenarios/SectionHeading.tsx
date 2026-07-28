"use client";

import { Text, VStack } from "@chakra-ui/react";

export interface SectionHeadingProps {
  title: string;
  description?: string;
  descriptionVariant?: "muted" | "lead";
}

/**
 * Centered section title + optional description.
 * Uses theme scale so Figma 1920 sizes (48 / 24) apply from xl, not laptop md/lg.
 */
export function SectionHeading({
  title,
  description,
  descriptionVariant = "muted",
}: SectionHeadingProps) {
  return (
    <VStack
      gap={{ base: "4", lg: "6", xl: "8" }}
      textAlign="center"
      maxW="3xl"
      mx="auto"
      mb={{ base: "8", lg: "10", xl: "16" }}
    >
      <Text
        as="h2"
        fontFamily="body"
        fontSize="display.h2"
        fontWeight="black"
        lineHeight="1.2"
        color="fg"
        textTransform="uppercase"
      >
        {title}
      </Text>
      {description && (
        <Text
          fontFamily="body"
          fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
          fontWeight={descriptionVariant === "lead" ? "extrabold" : "normal"}
          color={descriptionVariant === "lead" ? "fg" : "fg.muted"}
          lineHeight="1.5"
        >
          {description}
        </Text>
      )}
    </VStack>
  );
}
