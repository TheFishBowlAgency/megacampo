'use client';

import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { Link, type LinkProps } from './Link';

export interface ActivityLinkCardProps extends Pick<
  LinkProps,
  'href' | 'prefetch' | 'replace' | 'scroll' | 'shallow'
> {
  imageSrc: string;
  imageAlt: string;
  tag: string;
  footerTitle: string;
  ctaLabel?: string;
  /** List copy in the peach block. Omit (or pass empty) with no `ageNote` to hide that block. */
  features?: string[];
  ageNote?: string;
  'aria-label'?: string;
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
  imageSrc,
  imageAlt,
  tag,
  footerTitle,
  ctaLabel = 'Ver pacotes',
  features,
  ageNote,
  'aria-label': ariaLabel,
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
      aria-label={ariaLabel ?? defaultAria}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={{ base: '4', md: '8' }}
      w="full"
      maxW="full"
      h="full"
      flex="1"
      minH="0"
      textDecoration="none"
      color="inherit"
      _focusVisible={{
        outline: '2px solid',
        outlineColor: 'primary',
        outlineOffset: '3px',
        borderRadius: 'sm',
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
          aspectRatio={{ base: '195/190', md: '427/310' }}
          bg="#DADADA"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 991px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          <Box
            position="absolute"
            top="10px"
            left="10px"
            zIndex="1"
            px={{ base: '2.5', md: '3' }}
            py={{ base: '1.5', md: '2' }}
            minW={{ base: '28', md: '32' }}
            bg="background"
            transform="rotate(-5.22deg)"
          >
            <Text
              fontFamily="heading.molot"
              fontSize={{ base: '20px', md: '2xl' }}
              lineHeight={{ base: '23px', md: '1' }}
              color="dark"
              textTransform="uppercase"
              textAlign="center"
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
            gap={{ base: '8', md: '12' }}
            px={{ base: '2.5', md: '8' }}
            py={{ base: '4', md: '8' }}
            bg="background"
          >
            <VStack
              align="stretch"
              flex="1"
              minH="0"
              justifyContent="flex-start"
              gap={{ base: '4', md: '6' }}
              w="full"
              maxW="full"
              mx="auto"
            >
              {features?.map((line) => (
                <HStack
                  key={line}
                  align="flex-start"
                  gap={{ base: '4', md: '8' }}
                  w="full"
                >
                  <FeatureTreeIcon />
                  <Text
                    flex="1"
                    textStyle="body"
                    fontSize={{ base: 'sm', md: 'body.lg' }}
                    lineHeight={{ base: '16px', md: '28px' }}
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
                textStyle="h5"
                fontSize={{ base: 'xl', md: 'body.lg' }}
                lineHeight={{ base: '23px', md: '28px' }}
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
          textStyle="h5"
          fontSize={{ base: 'xl', md: 'body.lg' }}
          lineHeight={{ base: '23px', md: '28px' }}
          color="fg"
          textTransform="uppercase"
          textAlign="center"
        >
          {footerTitle}
        </Text>
        <Text
          as="span"
          textStyle="body"
          fontSize={{ base: 'xs', md: 'body.lg' }}
          lineHeight={{ base: '14px', md: '28px' }}
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
      boxSize={{ base: '30px', md: '50px' }}
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
