"use client";

import { Box, Text } from "@chakra-ui/react";

export interface CartAlertBannerProps {
  message: string;
}

export function CartAlertBanner({ message }: CartAlertBannerProps) {
  return (
    <Box
      bg="primary.muted"
      color="primary"
      py={{ base: "4", md: "5" }}
      px={{ base: "4", md: "6", lg: "8", xl: "300px" }}
    >
      <Box maxW="1320px" mx="auto">
        <Text
          textAlign="left"
          fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
          fontWeight="extrabold"
          fontFamily="body"
        >
          {message}
        </Text>
      </Box>
    </Box>
  );
}
