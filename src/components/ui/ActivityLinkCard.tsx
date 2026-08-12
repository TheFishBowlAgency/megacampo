"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { PRICING_TAG_TILT, TORN_CHIP_MASK } from "@/components/ui/tornChipMask";
import { Link, type LinkProps } from "./Link";

export interface ActivityLinkCardProps extends Pick<
  LinkProps,
  "href" | "prefetch" | "replace" | "scroll" | "shallow" | "onClick"
> {
  imageSrc: string;
  imageAlt: string;
  tag: string;
  footerTitle: string;
  ctaLabel?: string;
  /** List copy in the peach block. Omit (or pass empty) with no `ageNote` to hide that block. */
  features?: string[];
  ageNote?: string;
  "aria-label"?: string;
}

function hasDetailBlock(features?: string[], ageNote?: string) {
  const hasFeatures = Boolean(features?.length);
  const hasAge = Boolean(ageNote?.trim());
  return hasFeatures || hasAge;
}

/**
 * Activity promo card: image + optional feature list, full card is one link.
 * Omit `features` and `ageNote` for the compact variant (image, badge, footer only).
 */
export function ActivityLinkCard({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  onClick,
  imageSrc,
  imageAlt,
  tag,
  footerTitle,
  ctaLabel = "Ver pacotes",
  features,
  ageNote,
  "aria-label": ariaLabel,
}: ActivityLinkCardProps) {
  const showDetail = hasDetailBlock(features, ageNote);
  const defaultAria = `${footerTitle} — ${ctaLabel}`;

  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      onClick={onClick}
      aria-label={ariaLabel ?? defaultAria}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap="8"
      w="full"
      maxW="full"
      h="full"
      flex="1"
      minH="0"
      textDecoration="none"
      color="inherit"
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "primary",
        outlineOffset: "3px",
        borderRadius: "sm",
      }}
    >
      <Box
        w="full"
        overflow="hidden"
        flex="1"
        minH="0"
        display="flex"
        flexDirection="column"
      >
        <Box
          position="relative"
          w="full"
          flexShrink={0}
          aspectRatio={{ base: "195/190", lg: "427/310" }}
          bg="#DADADA"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 991px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
          <Box
            position="absolute"
            top={{ base: "10px", md: "10px" }}
            left={{ base: "10px", md: "10px" }}
            zIndex="1"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            maxW="calc(100% - 20px)"
            minH={{ base: "30px", lg: "40px" }}
            px={{ base: "2.5", lg: "4.5" }}
            py={{ base: "1.5", lg: "2.5" }}
            bg="primary"
            transform={PRICING_TAG_TILT}
            style={TORN_CHIP_MASK}
          >
            <Text
              fontFamily="heading.molot"
              fontSize={{ base: "xl", lg: "xl", xl: "2xl" }}
              lineHeight="1"
              color="dark"
              textTransform="uppercase"
              textAlign="center"
              whiteSpace="nowrap"
            >
              {tag}
            </Text>
          </Box>
        </Box>

        {showDetail ? (
          <VStack
            align="stretch"
            flex="1"
            minH="0"
            gap={{ base: "8", lg: "12" }}
            px={{ base: "2.5", lg: "8" }}
            py={{ base: "4", lg: "8" }}
            bg="background"
          >
            <VStack
              align="stretch"
              flex="1"
              minH="0"
              justifyContent="flex-start"
              gap={{ base: "4", lg: "6" }}
              w="full"
              maxW="full"
              mx="auto"
            >
              {features?.map((line) => (
                <HStack
                  key={line}
                  align="flex-start"
                  gap={{ base: "4", lg: "8" }}
                  w="full"
                >
                  <FeatureTreeIcon />
                  <Text
                    flex="1"
                    textStyle="body"
                    fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
                    lineHeight={{ base: "1.15", lg: "1.2", xl: "1.17" }}
                    color="dark"
                  >
                    {line}
                  </Text>
                </HStack>
              ))}
            </VStack>
            {ageNote?.trim() ? (
              <Text
                flexShrink={0}
                fontSize={{ base: "xl", lg: "body.md", xl: "body.lg" }}
                fontWeight="extrabold"
                lineHeight="1.2"
                color="dark"
                textAlign="center"
              >
                {ageNote.trim()}
              </Text>
            ) : null}
          </VStack>
        ) : null}
      </Box>

      <VStack gap="2" align="center" w="full" flexShrink={0}>
        <Text
          as="span"
          fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
          fontWeight="extrabold"
          lineHeight="1.2"
          color="fg"
          textTransform="uppercase"
          textAlign="center"
        >
          {footerTitle}
        </Text>
        <Text
          as="span"
          fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
          lineHeight="1.2"
          color="fg.muted"
          textAlign="center"
        >
          {ctaLabel}
        </Text>
      </VStack>
    </Link>
  );
}

function FeatureTreeIcon() {
  return (
    <Box
      flexShrink={0}
      boxSize={{ base: "30px", lg: "40px", xl: "50px" }}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      rounded="full"
      borderWidth="2.5px"
      borderColor="dark"
      color="dark"
      aria-hidden
    >
      <Box as="span" display="block" w="55%" h="55%" mt="-0.5">
        <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
          <path d="M12 3L6 14h4v7h4v-7h4L12 3z" />
        </svg>
      </Box>
    </Box>
  );
}
