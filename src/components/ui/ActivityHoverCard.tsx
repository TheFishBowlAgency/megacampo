"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Link } from "./Link";
import { ACTIVITY_TAG_TILT, TORN_CHIP_MASK } from "./tornChipMask";

export interface ActivityHoverCardProps {
  /** Shown as the card background; use a path under `public/` or any URL */
  imageSrc?: string;
  /** Defaults to `title` when `imageSrc` is set */
  imageAlt?: string;
  tag: string;
  title: string;
  /** e.g. age range; shown under the title */
  subtitle: string;
  description: string;
  href: string;
  /** CTA in the hover overlay */
  ctaLabel?: string;
}

/**
 * Image card with tag badge; hover/tap reveals description and CTA.
 */
export function ActivityHoverCard({
  imageSrc,
  imageAlt,
  tag,
  title,
  subtitle,
  description,
  href,
  ctaLabel = "SABER MAIS",
}: ActivityHoverCardProps) {
  const [revealed, setRevealed] = useState(false);
  const alt = imageAlt ?? title;

  const showOverlay = useCallback(() => setRevealed(true), []);
  const hideOverlay = useCallback(() => setRevealed(false), []);

  return (
    <VStack gap={{ base: "3", lg: "6" }}>
      <Link
        href={href}
        position="relative"
        display="block"
        w="full"
        aspectRatio={{ base: "195/265", lg: "315/428" }}
        bg="gray.300"
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
        onMouseEnter={showOverlay}
        onMouseLeave={hideOverlay}
        onFocus={showOverlay}
        onBlur={hideOverlay}
        aria-label={`${title} — ${ctaLabel}`}
      >
        {imageSrc ? (
          <Box position="absolute" inset="0" overflow="hidden">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(max-width: 991px) 50vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ) : null}

        <Box
          position="absolute"
          top="10px"
          left="10px"
          zIndex="1"
          px={{ base: "3", lg: "4" }}
          py={{ base: "1.5", lg: "2" }}
          bg="bg"
          transform={ACTIVITY_TAG_TILT}
          style={TORN_CHIP_MASK}
        >
          <Text
            fontFamily="heading.molot"
            fontSize={{ base: "xs", lg: "md" }}
            color="dark"
            textTransform="uppercase"
            whiteSpace="nowrap"
          >
            {tag}
          </Text>
        </Box>

        <Box
          position="absolute"
          inset="0"
          zIndex="2"
          opacity={revealed ? 1 : 0}
          transition="opacity 0.3s"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="8"
          p="5"
          pointerEvents={revealed ? "auto" : "none"}
        >
          <Box position="absolute" inset="0" bg="dark" opacity={0.8} />

          <Text
            position="relative"
            color="grayLight"
            fontSize={{ base: "sm", lg: "md" }}
            lineHeight="1.6"
            textAlign="center"
            px="2"
          >
            {description}
          </Text>
          <Box
            position="relative"
            bg="primary"
            color="grayLight"
            px="8"
            py="4"
            textStyle="button"
            fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
            textTransform="uppercase"
            borderRadius="md"
            textAlign="center"
            mt="auto"
            mb="2"
          >
            {ctaLabel}
          </Box>
        </Box>
      </Link>

      <VStack gap="1">
        <Text
          fontSize={{ base: "md", lg: "xl", xl: "display.h3" }}
          fontWeight="extrabold"
          color="fg"
          textAlign="center"
          textTransform="uppercase"
          lineHeight="1.2"
        >
          {title}
        </Text>
        <Text
          textStyle="body"
          fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
          color="fg.muted"
          textAlign="center"
        >
          {subtitle}
        </Text>
      </VStack>
    </VStack>
  );
}
