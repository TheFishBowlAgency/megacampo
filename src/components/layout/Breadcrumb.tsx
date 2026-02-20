"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation. Renders as "‹ Item1 / Item2 / Current".
 * Items with href are links; the last item is current (no link).
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <Box bg="bg.subtle" py="3">
      <Box maxW="1280px" mx="auto" px={{ base: "4", md: "6", lg: "8" }}>
        <HStack gap="1" fontSize="sm" color="fg.muted" flexWrap="wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const isFirst = i === 0;
            return (
              <HStack key={i} gap="1" as="span">
                {!isFirst && <Text as="span">/</Text>}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    _hover={{ color: "fg", textDecoration: "underline" }}
                  >
                    {item.label}
                  </Link>
                ) : isFirst && item.href ? (
                  <Link
                    href={item.href}
                    _hover={{ color: "fg", textDecoration: "underline" }}
                  >
                    ‹ {item.label}
                  </Link>
                ) : (
                  <Text as="span" color={isLast ? "fg" : "fg.muted"}>
                    {isFirst ? "‹ " : ""}
                    {item.label}
                  </Text>
                )}
              </HStack>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
}
