"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { PRICING_TAG_TILT, TORN_CHIP_MASK } from "@/components/ui/tornChipMask";
import { useSiteLocale } from "@/providers";
import type { PackageCardItem } from "@/lib/catalog/types";

export interface PricingCardProps {
  pkg: PackageCardItem;
  detailHref?: string;
}

/**
 * Dark pricing card — torn tilted name chip, centered content, cream popular badge.
 */
export function PricingCard({
  pkg,
  detailHref = "/#reservas",
}: PricingCardProps) {
  const { copy } = useSiteLocale();

  return (
    <Box
      as="article"
      bg="dark"
      color="grayLight"
      borderRadius="4px"
      w="full"
      minW="0"
      px={{ base: "5", lg: "8" }}
      pt={{ base: "6", lg: "8" }}
      pb={{ base: "8", lg: "16" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      gap={{ base: "6", lg: "12" }}
      minH={{ base: "auto", xl: "900px" }}
      h="full"
      textAlign="center"
    >
      <VStack align="center" gap={{ base: "6", lg: "12" }} flex="1" w="full">
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          maxW="full"
          px={{ base: "3", lg: "5" }}
          py={{ base: "1.5", lg: "2.5" }}
          bg="primary"
          transform={PRICING_TAG_TILT}
          style={TORN_CHIP_MASK}
        >
          <Text
            fontFamily="heading.molot"
            fontSize={{ base: "md", lg: "xl", xl: "2xl" }}
            fontWeight="normal"
            lineHeight="1"
            color="dark"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            {pkg.name}
          </Text>
        </Box>

        <VStack gap="2" align="center">
          <Text
            fontFamily="body"
            fontSize={{ base: "xl", lg: "2xl", xl: "3rem" }}
            fontWeight="black"
            color="grayLight"
            lineHeight="1"
          >
            {pkg.price}€
          </Text>
          <Text
            className="notranslate"
            translate="no"
            fontFamily="body"
            fontSize={{ base: "xs", lg: "sm", xl: "body.md" }}
            fontWeight="normal"
            color="grayLight"
            opacity={0.5}
          >
            {pkg.perPersonLabel ?? copy.package.perPerson}
          </Text>
        </VStack>

        <Box h="1px" w="full" bg="grayLight" />

        <VStack align="center" gap={{ base: "4", lg: "6" }} flex="1" w="full">
          {pkg.popular ? (
            <Box
              bg="offset"
              px={{ base: "3", lg: "4" }}
              py={{ base: "1.5", lg: "2" }}
              borderRadius="md"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                className="notranslate"
                translate="no"
                fontFamily="body"
                fontSize={{ base: "xs", lg: "sm", xl: "md" }}
                fontWeight="medium"
                color="primary"
                textTransform="uppercase"
                lineHeight="1.2"
              >
                {copy.package.mostPopular}
              </Text>
            </Box>
          ) : null}
          {pkg.features.map((feature) => (
            <Text
              key={feature.id}
              fontFamily="body"
              fontSize={{ base: "xs", lg: "body.md", xl: "body.lg" }}
              fontWeight="extrabold"
              color="grayLight"
              opacity={0.5}
              textTransform="uppercase"
              lineHeight="1.2"
              textAlign="center"
            >
              {feature.label}
            </Text>
          ))}
        </VStack>
      </VStack>

      <Link
        className="notranslate"
        translate="no"
        href={detailHref}
        bg="primary"
        color="grayLight"
        px={{ base: "6", lg: "8" }}
        py={{ base: "3", lg: "4" }}
        fontFamily="body"
        fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
        fontWeight="medium"
        lineHeight="1.3"
        textTransform="uppercase"
        textAlign="center"
        borderRadius="md"
        _hover={{ opacity: 0.9 }}
      >
        {pkg.ctaLabel ?? copy.package.reserve}
      </Link>
    </Box>
  );
}
