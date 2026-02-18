"use client";

import { Text, VStack } from "@chakra-ui/react";

export interface SectionHeadingProps {
  title: string;
  description?: string;
}

/**
 * Reusable section heading block: centered title + optional description.
 */
export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <VStack
      gap={{ base: "2", md: "3" }}
      textAlign="center"
      maxW="2xl"
      mx="auto"
      mb={{ base: "8", md: "10" }}
    >
      <Text
        as="h2"
        textStyle="h2"
        fontSize={{ base: "xl", md: "2rem", lg: "3rem" }}
        color="fg"
        textTransform="uppercase"
      >
        {title}
      </Text>
      {description && (
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="fg.muted"
          lineHeight="1.5"
        >
          {description}
        </Text>
      )}
    </VStack>
  );
}
