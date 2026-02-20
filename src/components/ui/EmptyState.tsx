"use client";

import { Box, Text, VStack } from "@chakra-ui/react";

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * Reusable empty state: icon, title, subtitle, and optional CTA.
 */
export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <VStack
      gap={{ base: "5", md: "6" }}
      py={{ base: "12", md: "16", lg: "20" }}
      textAlign="center"
      maxW="md"
      mx="auto"
    >
      <Box
        color="fg.muted"
        fontSize={{ base: "4rem", md: "5rem" }}
        lineHeight="1"
      >
        {icon}
      </Box>
      <Text as="h2" textStyle="h3" color="fg">
        {title}
      </Text>
      {subtitle && (
        <Text textStyle="body" fontSize="md" color="fg.muted">
          {subtitle}
        </Text>
      )}
      {action}
    </VStack>
  );
}
