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

export function CartSummary({
  total,
  checkoutLabel = "FINALIZAR COMPRA",
  checkoutHref = "/checkout",
  mt = "6",
}: CartSummaryProps) {
  return (
    <Box
      bg="dark"
      color="white"
      p={{ base: "6", md: "10" }}
      borderRadius="0"
      mt={mt}
      display="flex"
      flexDirection="column"
      gap={{ base: "8", md: "14" }}
      w="full"
      maxW={{ md: "369px" }}
    >
      <HStack justify="space-between" align="center" gap="4">
        <Text
          fontWeight="extrabold"
          fontSize={{ base: "md", xl: "body.lg" }}
          color="fg.muted"
        >
          Total
        </Text>
        <Text
          fontWeight="extrabold"
          color="primary"
          fontSize={{ base: "md", xl: "body.lg" }}
        >
          {total}
        </Text>
      </HStack>
      <Button
        asChild
        width="full"
        bg="primary"
        color="grayLight"
        size="lg"
        h="60px"
        px="8"
        borderRadius="0"
        fontWeight="medium"
        textTransform="uppercase"
        fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
        _hover={{ opacity: 0.9 }}
      >
        <Link href={checkoutHref}>{checkoutLabel}</Link>
      </Button>
    </Box>
  );
}
