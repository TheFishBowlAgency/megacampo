import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { bannerSectionUnderlayBefore } from "./bannerUnderlay";
import { Container } from "./Container";

/** Standard hero height — used by default so every page gets consistent vertical rhythm. */
export const PAGE_HERO_MIN_H = {
  base: "561px",
  md: "640px",
} as const;

export type PageHeroCta = {
  label: string;
  href: string;
};

type PageHeroProps = {
  title: string;
  subtitle?: string;
  cta?: PageHeroCta;
  /** Override the hero background — defaults to "bg.hero" */
  heroBg?: string;
  /** Optional CMS / static underlay image. */
  backgroundImageSrc?: string;
  /**
   * When `backgroundImageSrc` is empty, defaults to showing plain `heroBg`.
   * Set `true` to fall back to the site banner underlay image instead.
   */
  fallbackUnderlay?: boolean;
  /** Override the title text style — defaults to "h1.molot" */
  titleTextStyle?: string;
  /**
   * Subtitle size scale. Defaults to hero/lead body sizing.
   * Short punchy lines (e.g. Cenários) can pass Maps-like `display.h3` at `xl+`.
   */
  subtitleFontSize?: React.ComponentProps<typeof Text>["fontSize"];
  /**
   * Vertical padding. Use landing-matching values for activity package heroes:
   * `{ base: "16", md: "20", lg: "24", xl: "28" }`.
   */
  py?: React.ComponentProps<typeof Box>["py"];
  /**
   * Minimum height for the hero — content is vertically centered whenever this resolves
   * to a value. Defaults to the standard hero height; pass `undefined` explicitly only if
   * a page truly needs the hero to size to its content instead.
   */
  minH?: React.ComponentProps<typeof Box>["minH"];
  /** Content alignment — cenários hero is right-aligned on desktop */
  textAlign?: React.ComponentProps<typeof VStack>["textAlign"];
  /** Horizontal alignment of the content stack */
  align?: React.ComponentProps<typeof VStack>["align"];
};

/**
 * Full-width hero for inner pages (e.g. Eventos, Como, Cenários). Dark background, centered title.
 */
export function PageHero({
  title,
  subtitle,
  cta,
  heroBg = "bg.hero",
  backgroundImageSrc,
  fallbackUnderlay = false,
  titleTextStyle = "h1.molot",
  subtitleFontSize = {
    base: "md",
    md: "lg",
    lg: "body.md",
    xl: "body.lg",
  },
  py = { base: "12", md: "16", lg: "18", xl: "20" },
  minH = PAGE_HERO_MIN_H,
  textAlign = "center",
  align = "center",
}: PageHeroProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={heroBg}
      color="grayLight"
      py={py}
      _before={bannerSectionUnderlayBefore(backgroundImageSrc, {
        fallback: fallbackUnderlay,
      })}
      {...(minH
        ? {
            minH,
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
          }
        : {})}
    >
      {/*
        Full-width row inside Container (same pattern as MapsSection):
        `align` on a w="full" stack pushes children to the right — do not
        shrink-wrap + alignSelf, which leaves a large empty inset.
      */}
      <Container position="relative" zIndex={1} w="full">
        <VStack
          w="full"
          align={align}
          textAlign={textAlign}
          gap={{ base: "4", md: "5", xl: cta ? "8" : "5" }}
        >
          <Text
            as="h1"
            textStyle={titleTextStyle}
            fontSize={{
              base: "display.h1.mobile",
              lg: "5rem",
              xl: "display.h1",
            }}
            lineHeight="1"
            textTransform="uppercase"
            whiteSpace="pre-line"
            color="grayLight"
            maxW={{ base: "100%", xl: "815px" }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              textStyle="lead"
              fontSize={subtitleFontSize}
              color="whiteAlpha.900"
              whiteSpace="pre-line"
              maxW={{ base: "100%", xl: "815px" }}
            >
              {subtitle}
            </Text>
          )}
          {cta && (
            <Link
              href={cta.href}
              bg="primary"
              color="white"
              px={{ base: "8", md: "10" }}
              py={{ base: "3", md: "4" }}
              textStyle="button"
              fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
              textTransform="uppercase"
              borderRadius="md"
              _hover={{ bg: "primary", opacity: 0.9 }}
            >
              {cta.label}
            </Link>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
