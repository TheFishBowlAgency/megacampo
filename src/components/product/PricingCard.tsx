"use client";

import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { ProductPackage } from "@/data/products";

export interface PricingCardProps {
  pkg: ProductPackage;
  /** Optional reservation URL; defaults to /#reservas */
  reserveHref?: string;
}

/**
 * Single pricing package card: orange banner, price, features, CTA.
 * Reusable on product page and elsewhere.
 */
export function PricingCard({
  pkg,
  reserveHref = "/#reservas",
}: PricingCardProps) {
  return (
    <Box
      as="article"
      bg="bg.dark"
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      position="relative"
      display="flex"
      flexDirection="column"
      minH={{ base: "auto", md: "420px" }}
    >
      {pkg.popular && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          py="1.5"
          px="3"
          borderBottomWidth="1px"
          borderColor="whiteAlpha.300"
          textAlign="center"
          zIndex="1"
        >
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            color="white"
            letterSpacing="wider"
          >
            O MAIS POPULAR
          </Text>
        </Box>
      )}
      <Box
        bg="primary"
        color="white"
        py="3"
        px="4"
        textAlign="center"
        mt={pkg.popular ? "8" : "0"}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize={{ base: "md", lg: "lg" }}
          letterSpacing="wider"
        >
          {pkg.name}
        </Text>
      </Box>
      <VStack
        p={{ base: "5", md: "6" }}
        flex="1"
        align="stretch"
        gap="4"
        justifyContent="space-between"
      >
        <Box>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="white"
          >
            {pkg.price}€
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            {pkg.perPersonLabel ?? "Por pessoa"}
          </Text>
        </Box>
        <VStack align="stretch" gap="2" flex="1">
          {pkg.features.map((feature) => (
            <Text
              key={feature}
              fontSize="sm"
              color="whiteAlpha.900"
              lineHeight="tall"
            >
              {feature}
            </Text>
          ))}
        </VStack>
        <Button
          asChild
          width="full"
          bg="primary"
          color="white"
          fontWeight="bold"
          textTransform="uppercase"
          size="lg"
          _hover={{ bg: "primary.muted", color: "fg" }}
        >
          <Link href={reserveHref}>{pkg.ctaLabel ?? "RESERVA JÁ"}</Link>
        </Button>
      </VStack>
    </Box>
  );
}
