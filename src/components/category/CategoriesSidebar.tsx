"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";

export interface CategoriesSidebarProps {
  activeSlug: string;
}

/**
 * Left sidebar listing all product categories with chevron icons.
 * Hidden on mobile (products display without sidebar).
 */
export function CategoriesSidebar({ activeSlug }: CategoriesSidebarProps) {
  return (
    <VStack align="stretch" gap="8" w={{ lg: "346px" }} flexShrink={0}>
      <Text textStyle="h3" color="fg">
        CATEGORIAS
      </Text>

      <VStack align="stretch" gap="0">
        {CATEGORIES.map((cat) => (
          <Box key={cat.slug}>
            <Box h="1px" bg="dark" />
            <Link
              href={`/reservas/${cat.slug}`}
              display="block"
              py="4"
              _hover={{ color: "primary" }}
            >
              <HStack justify="space-between" align="center">
                <Text
                  textStyle="h5"
                  color={cat.slug === activeSlug ? "primary" : "fg"}
                >
                  {cat.name}
                </Text>
                <ChevronRightIcon />
              </HStack>
            </Link>
          </Box>
        ))}
        <Box h="1px" bg="dark" />
      </VStack>
    </VStack>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="11"
      height="20"
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L10 10L1 19"
        stroke="#282828"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
