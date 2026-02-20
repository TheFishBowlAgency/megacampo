"use client";

import { Box, Text } from "@chakra-ui/react";

export interface CartAlertBannerProps {
  message: string;
}

/**
 * Full-width alert strip for cart page (empty or info message).
 * Uses theme primary.muted background and fg text.
 */
export function CartAlertBanner({ message }: CartAlertBannerProps) {
  return (
    <Box
      bg="primary.muted"
      color="fg"
      py="3"
      px={{ base: "4", md: "6", lg: "8" }}
    >
      <Box maxW="1280px" mx="auto">
        <Text textAlign="center" fontSize="sm" fontWeight="medium">
          {message}
        </Text>
      </Box>
    </Box>
  );
}
