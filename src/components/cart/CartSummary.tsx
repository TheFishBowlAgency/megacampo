"use client";

import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui";

export interface CartSummaryProps {
  total: string;
  checkoutLabel?: string;
  checkoutHref?: string;
  /** Optional margin-top override (e.g. for mobile layout) */
  mt?: string | number;
}

/**
 * Order summary strip: total and checkout CTA.
 */
export function CartSummary({
  total,
  checkoutLabel = "FINALIZAR COMPRA",
  checkoutHref = "/checkout",
  mt = "6",
}: CartSummaryProps) {
  return (
    <Box
      bg="bg.dark"
      color="white"
      p={{ base: "5", md: "6" }}
      borderRadius="lg"
      mt={mt}
    >
      <HStack justify="space-between" flexWrap="wrap" gap="4" mb="4">
        <Text fontWeight="bold" textTransform="uppercase" fontSize="lg">
          Total
        </Text>
        <Text fontWeight="bold" color="primary" fontSize="xl">
          {total}
        </Text>
      </HStack>
      <Button
        asChild
        width="full"
        bg="primary"
        color="white"
        size="lg"
        fontWeight="bold"
        textTransform="uppercase"
        _hover={{ bg: "primary.muted", color: "fg" }}
      >
        <Link href={checkoutHref}>{checkoutLabel}</Link>
      </Button>
    </Box>
  );
}
