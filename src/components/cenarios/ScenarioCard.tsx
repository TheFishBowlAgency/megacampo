"use client";

import { Box, Link, Text, VStack } from "@chakra-ui/react";

export interface ScenarioCardProps {
  /** Scenario/map name (e.g. "IRAQUE", "WILD WEST") */
  name: string;
  /** Optional image URL; placeholder shown if not provided */
  imageSrc?: string;
  /** Link for "Ver mais" and card click. Defaults to # */
  href?: string;
}

/**
 * Card for a scenario/map: image area with orange name tag overlay, name and "Ver mais" link.
 * Reusable across Cenários page and elsewhere.
 */
export function ScenarioCard({
  name,
  imageSrc,
  href = "#",
}: ScenarioCardProps) {
  return (
    <VStack align="stretch" gap="3" as="article">
      <Box
        position="relative"
        aspectRatio="4/3"
        bg="bg.subtle"
        borderRadius="md"
        overflow="hidden"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box width="100%" height="100%" bg="gray.200" />
        )}
        <Box
          position="absolute"
          top="0"
          left="0"
          bg="primary"
          color="white"
          px="3"
          py="2"
          borderBottomRightRadius="md"
          textTransform="uppercase"
          fontWeight="bold"
          fontSize={{ base: "sm", md: "md" }}
          letterSpacing="wider"
        >
          {name}
        </Box>
      </Box>
      <VStack align="stretch" gap="1">
        <Text
          as="h3"
          textStyle="h5"
          color="fg"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {name}
        </Text>
        <Link
          href={href}
          fontSize="sm"
          color="fg.muted"
          _hover={{ color: "primary" }}
          alignSelf="flex-start"
        >
          Ver mais
        </Link>
      </VStack>
    </VStack>
  );
}
