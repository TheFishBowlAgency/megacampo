"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";
import type { ProductTestimonial as ProductTestimonialType } from "@/data/products";

export interface ProductTestimonialsSectionProps {
  heading: string;
  testimonials: ProductTestimonialType[];
}

/** Stars in dark gray/black per Figma. size: "sm" for small cards, "md" for large. */
function StarRating({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const fontSize = size === "sm" ? "sm" : "lg";
  return (
    <Box display="flex" gap="0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          as="span"
          color={i < rating ? "fg" : "gray.300"}
          fontSize={fontSize}
        >
          ★
        </Box>
      ))}
    </Box>
  );
}

function CardContent({
  clientName,
  rating,
  text,
  starSize,
  nameSize,
  textSize,
}: {
  clientName: string;
  rating: number;
  text: string;
  starSize: "sm" | "md";
  nameSize: "sm" | "md" | "lg";
  textSize: "sm" | "md";
}) {
  return (
    <VStack align="stretch" gap="1" flex="1" minW="0">
      <Text
        fontWeight="bold"
        color="fg"
        textTransform="uppercase"
        fontSize={nameSize}
      >
        {clientName}
      </Text>
      <StarRating rating={rating} size={starSize} />
      <Text
        textStyle="body"
        fontSize={textSize}
        color="fg.muted"
        lineHeight="tall"
        flex="1"
        minW="0"
      >
        {text}
      </Text>
    </VStack>
  );
}

/**
 * Large testimonial (desktop left): landscape image at top, then name, stars, text.
 * Figma: rectangular image wider than tall; larger name and stars.
 */
function LargeTestimonialCard({
  clientName,
  rating,
  text,
}: ProductTestimonialType) {
  return (
    <Box
      bg="bg"
      borderRadius="lg"
      p="6"
      display="flex"
      flexDirection="column"
      gap="4"
      height="full"
    >
      <Box
        width="full"
        aspectRatio="2.2 / 1"
        borderRadius="md"
        bg="bg.subtle"
        flexShrink="0"
        aria-hidden
      />
      <CardContent
        clientName={clientName}
        rating={rating}
        text={text}
        starSize="md"
        nameSize="md"
        textSize="md"
      />
    </Box>
  );
}

/**
 * Small testimonial: horizontal — image left, content right.
 * variant "landscape" = larger horizontal image (first card on mobile); "square" = small square.
 * fillHeight: when true, card grows to fill available height (e.g. desktop right column).
 */
function SmallTestimonialCard({
  clientName,
  rating,
  text,
  variant = "square",
  fillHeight = false,
}: ProductTestimonialType & {
  variant?: "square" | "landscape";
  fillHeight?: boolean;
}) {
  const isLandscape = variant === "landscape";
  return (
    <Box
      bg="bg"
      borderRadius="lg"
      p="4"
      display="flex"
      flexDirection="row"
      gap="4"
      alignItems="flex-start"
      flex={fillHeight ? 1 : undefined}
      minH={fillHeight ? "0" : undefined}
    >
      <Box
        width={isLandscape ? { base: "24", md: "28" } : "12"}
        height={isLandscape ? { base: "16", md: "20" } : "12"}
        minWidth={isLandscape ? { base: "24", md: "28" } : "12"}
        minHeight={isLandscape ? { base: "16", md: "20" } : "12"}
        borderRadius="md"
        flexShrink="0"
        bg="bg.subtle"
        aria-hidden
      />
      <CardContent
        clientName={clientName}
        rating={rating}
        text={text}
        starSize="sm"
        nameSize="sm"
        textSize="sm"
      />
    </Box>
  );
}

/**
 * Product page testimonials per Figma nodes 215-2173 (desktop) and 215-3162 (mobile).
 * Desktop: two columns — large card left (landscape image, vertical), 3 small cards right (horizontal, square avatar).
 * Mobile: four cards stacked with white separators; first = larger landscape image, rest = square; all horizontal.
 */
export function ProductTestimonialsSection({
  heading,
  testimonials,
}: ProductTestimonialsSectionProps) {
  const featured = testimonials.find((t) => t.featured);
  const others = testimonials.filter((t) => !t.featured);

  return (
    <Section variant="subtle">
      <Container>
        <VStack gap="8" align="stretch">
          <Text
            as="h2"
            textStyle="h2"
            color="fg"
            textAlign="center"
            textTransform="uppercase"
          >
            {heading}
          </Text>

          {/* Mobile: stacked cards, first with landscape image, thin white separators between cards */}
          <Box
            display={{ base: "flex", md: "none" }}
            flexDirection="column"
            gap="0"
            w="full"
          >
            {testimonials.map((t, i) => (
              <Box
                key={t.id}
                borderBottomWidth={i < testimonials.length - 1 ? "1px" : 0}
                borderColor="white"
                pb={i < testimonials.length - 1 ? "4" : 0}
              >
                <SmallTestimonialCard
                  {...t}
                  variant={i === 0 ? "landscape" : "square"}
                />
              </Box>
            ))}
          </Box>

          {/* Tablet: 2x2 grid of small horizontal cards */}
          <Grid
            display={{ base: "none", md: "grid", lg: "none" }}
            templateColumns="1fr 1fr"
            gap="6"
            w="full"
          >
            {testimonials.map((t) => (
              <SmallTestimonialCard key={t.id} {...t} variant="square" />
            ))}
          </Grid>

          {/* Desktop: large card left (landscape, vertical), 3 small cards right fill same height */}
          <Grid
            display={{ base: "none", lg: "grid" }}
            templateColumns="1fr 1fr"
            gap="6"
            alignItems="stretch"
            w="full"
            minH="0"
          >
            {featured && (
              <Box display="flex" flexDirection="column" minH="0">
                <LargeTestimonialCard {...featured} />
              </Box>
            )}
            <VStack gap="6" align="stretch" minH="0" height="100%">
              {others.map((t) => (
                <SmallTestimonialCard
                  key={t.id}
                  {...t}
                  variant="square"
                  fillHeight
                />
              ))}
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
