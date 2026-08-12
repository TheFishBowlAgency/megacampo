"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Link } from "@/components/ui";
import {
  ACTIVITY_TAG_TILT,
  TORN_CHIP_MASK,
} from "@/components/ui/tornChipMask";

export interface ScenarioCardProps {
  /** Scenario/map name (e.g. "IRAQUE", "WILD WEST") */
  name: string;
  /** Optional image URL; placeholder shown if not provided */
  imageSrc?: string;
  /** Link for the whole card. Defaults to # */
  href?: string;
  /** Optional CTA under the title. Omit to hide (maps page). */
  linkLabel?: string;
}

/**
 * Scenario/map card — matches Figma Cenários cards (608:17538 desktop / 608:17821 mobile).
 * Whole card is one link. Torn-edge chip matches activity cards.
 */
export function ScenarioCard({
  name,
  imageSrc,
  href = "#",
  linkLabel,
}: ScenarioCardProps) {
  return (
    <Link
      href={href}
      aria-label={linkLabel ? `${name} — ${linkLabel}` : name}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={{ base: "4", lg: "6", xl: "8" }}
      w="full"
      textDecoration="none"
      color="inherit"
      _hover={{ textDecoration: "none" }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "primary",
        outlineOffset: "3px",
        borderRadius: "sm",
      }}
    >
      {/* Image + chip: chip sits outside overflow so torn edges aren’t clipped */}
      <Box
        position="relative"
        w="full"
        aspectRatio={{ base: "195/190", lg: "427/428" }}
      >
        <Box position="absolute" inset="0" bg="#DADADA" overflow="hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </Box>

        <Box
          position="absolute"
          top="10px"
          left="10px"
          zIndex={1}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          minH={{ base: "30px", xl: "40px" }}
          px={{ base: "2.5", lg: "3", xl: "4" }}
          py={{ base: "1.5", lg: "2" }}
          bg="background"
          transform={ACTIVITY_TAG_TILT}
          style={TORN_CHIP_MASK}
        >
          <Text
            fontFamily="heading.molot"
            fontSize={{ base: "xl", lg: "xl", xl: "body.lg" }}
            lineHeight="1"
            color="dark"
            textTransform="uppercase"
            textAlign="center"
            whiteSpace="nowrap"
          >
            {name}
          </Text>
        </Box>
      </Box>

      <VStack align="center" gap="2" textAlign="center">
        <Text
          as="h3"
          fontFamily="body"
          fontSize={{ base: "xl", lg: "xl", xl: "body.lg" }}
          fontWeight="extrabold"
          lineHeight="1.2"
          color="dark"
          textTransform="uppercase"
        >
          {name}
        </Text>
        {linkLabel ? (
          <Text
            fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
            lineHeight="1.2"
            color="grayMid"
          >
            {linkLabel}
          </Text>
        ) : null}
      </VStack>
    </Link>
  );
}
