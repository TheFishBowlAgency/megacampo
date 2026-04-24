'use client';

import { Box, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { Link } from './Link';

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
 * Image card with tag badge; hover reveals description and CTA button.
 */
export function ActivityHoverCard({
  imageSrc,
  imageAlt,
  tag,
  title,
  subtitle,
  description,
  href,
  ctaLabel = 'SABER MAIS',
}: ActivityHoverCardProps) {
  const [hovered, setHovered] = useState(false);
  const alt = imageAlt ?? title;

  return (
    <VStack gap={{ base: '3', lg: '6' }}>
      <Box
        position="relative"
        w="full"
        aspectRatio={{ base: '195/265', lg: '315/428' }}
        bg="gray.300"
        overflow="hidden"
        cursor="pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {imageSrc ? (
          <Box position="absolute" inset="0" overflow="hidden">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes="(max-width: 991px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        ) : null}

        <Box
          position="absolute"
          top="10px"
          left="10px"
          zIndex="2"
          px="3"
          py="1.5"
          bg="primary"
          transform="skewX(-5deg)"
          borderRadius="sm"
        >
          <Text
            fontFamily="heading.molot"
            fontSize={{ base: 'xs', lg: 'md' }}
            color="dark"
            textTransform="uppercase"
            transform="skewX(5deg)"
          >
            {tag}
          </Text>
        </Box>

        <Box
          position="absolute"
          inset="0"
          bg="blackAlpha.800"
          opacity={hovered ? 1 : 0}
          transition="opacity 0.3s"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="5"
          zIndex="1"
        >
          <Text
            color="grayLight"
            fontSize={{ base: 'sm', lg: 'md' }}
            lineHeight="1.6"
          >
            {description}
          </Text>
          <Link
            href={href}
            bg="primary"
            color="grayLight"
            px="8"
            py="4"
            textStyle="button"
            fontSize={{ base: 'sm', lg: 'body.lg' }}
            textTransform="uppercase"
            borderRadius="md"
            textAlign="center"
            _hover={{ opacity: 0.9 }}
            alignSelf="center"
          >
            {ctaLabel}
          </Link>
        </Box>
      </Box>

      <VStack gap="1">
        <Text
          textStyle="h3"
          fontSize={{ base: 'md', lg: 'display.h3' }}
          color="fg"
          textAlign="center"
          textTransform="uppercase"
        >
          {title}
        </Text>
        <Text
          textStyle="body"
          fontSize={{ base: 'sm', lg: 'body.lg' }}
          color="fg.muted"
          textAlign="center"
        >
          {subtitle}
        </Text>
      </VStack>
    </VStack>
  );
}
