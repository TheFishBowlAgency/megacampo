"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { ProductPackage } from "@/data/products";

export interface PricingCardProps {
  pkg: ProductPackage;
  reserveHref?: string;
}

/**
 * Pricing package card matching Figma design: dark bg, orange ribbon banner
 * with rotated package name (Molot font), price, features, and CTA.
 */
export function PricingCard({
  pkg,
  reserveHref = "/#reservas",
}: PricingCardProps) {
  return (
    <Box
      as="article"
      bg="dark"
      borderRadius="sm"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      h="full"
      pt={{ base: "4", lg: "8" }}
      pb={{ base: "8", lg: "16" }}
      px={{ base: "2.5", lg: "8" }}
      overflow="hidden"
    >
      <VStack gap={{ base: "6", lg: "12" }} align="center" w="full">
        {/* Orange ribbon banner with rotated package name */}
        <Box py={{ base: "2", lg: "3" }}>
          <Box
            bg="primary"
            px={{ base: "4", lg: "8" }}
            py={{ base: "1.5", lg: "3" }}
            borderRadius="md"
            transform="rotate(-5.22deg)"
          >
            <Text
              fontFamily="heading.molot"
              fontSize={{ base: "xl", lg: "3rem" }}
              color="dark"
              textAlign="center"
              whiteSpace="nowrap"
              lineHeight="1"
            >
              {pkg.name}
            </Text>
          </Box>
        </Box>

        {/* Price */}
        <VStack gap="2" align="center">
          <Text
            fontSize={{ base: "2xl", lg: "3rem" }}
            fontWeight="black"
            color="white"
            lineHeight="1"
          >
            {pkg.price}€
          </Text>
          <Text
            fontSize={{ base: "sm", lg: "body.lg" }}
            color="white"
            opacity={0.5}
          >
            {pkg.perPersonLabel ?? "Por pessoa"}
          </Text>
        </VStack>

        {/* Dashed separator */}
        <Box
          w="full"
          borderBottomWidth="1px"
          borderStyle="dashed"
          borderColor="whiteAlpha.400"
        />

        {/* Popular badge + features */}
        <VStack gap={{ base: "4", lg: "6" }} align="center" w="full">
          {pkg.popular && (
            <Box
              bg={{ base: "primary.muted", lg: "bg.subtle" }}
              px={{ base: "4", lg: "8" }}
              py="2"
              borderRadius="md"
            >
              <Text
                fontSize={{ base: "sm", lg: "body.lg" }}
                fontWeight="medium"
                color="primary"
                textTransform="uppercase"
                whiteSpace="nowrap"
              >
                O MAIS POPULAR
              </Text>
            </Box>
          )}
          {pkg.features.map((feature) => (
            <Text
              key={feature}
              fontSize={{ base: "sm", lg: "body.lg" }}
              fontWeight="extrabold"
              color="white"
              opacity={0.5}
              textAlign="center"
              textTransform="uppercase"
            >
              {feature}
            </Text>
          ))}
        </VStack>
      </VStack>

      {/* CTA button */}
      <Link
        href={reserveHref}
        bg="primary"
        color="white"
        fontWeight="medium"
        textTransform="uppercase"
        fontSize={{ base: "sm", lg: "body.lg" }}
        px="8"
        py="4"
        borderRadius="md"
        boxShadow="0px 5px 16px 0px rgba(0,0,0,0.22)"
        mt={{ base: "8", lg: "12" }}
        _hover={{ opacity: 0.9 }}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
      >
        {pkg.ctaLabel ?? "RESERVA JÁ"}
      </Link>
    </Box>
  );
}
