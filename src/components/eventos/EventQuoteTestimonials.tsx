import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Container, Section } from "@/components/layout";
import type { EventQuote } from "@/lib/events/types";
import {
  DEFAULT_TESTIMONIALS,
  DEFAULT_TESTIMONIALS_HEADING,
} from "@/lib/testimonials/defaults";

type EventQuoteTestimonialsProps = {
  heading?: string;
  quotes?: EventQuote[];
};

/** Stepped body copy — Figma 24px only from xl (1920 artboard scaling). */
const BODY_STEP = {
  base: "sm",
  md: "md",
  lg: "body.md",
  xl: "body.lg",
} as const;

function Stars({ count = 5 }: { count?: number }) {
  const filled = Math.min(Math.max(count, 0), 5);

  return (
    <HStack gap="4" aria-label={`${filled} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <Box
            key={i}
            as="span"
            color={isFilled ? "primary" : "blackAlpha.300"}
            fontSize="sm"
            lineHeight="1"
            w="21px"
            textAlign="center"
            aria-hidden
          >
            {isFilled ? "★" : "☆"}
          </Box>
        );
      })}
    </HStack>
  );
}

/**
 * Featured quote + side list.
 * Type uses theme scale (`display.h2` / stepped body) so Figma 1920 sizes land at xl+.
 */
export function EventQuoteTestimonials({
  heading = DEFAULT_TESTIMONIALS_HEADING,
  quotes = DEFAULT_TESTIMONIALS,
}: EventQuoteTestimonialsProps) {
  const list = quotes.length > 0 ? quotes : DEFAULT_TESTIMONIALS;
  const featured = list.find((q) => q.featured) ?? list[0];
  const others = list.filter((q) => q !== featured);

  if (!featured) return null;

  return (
    <Section>
      <Container>
        <VStack gap={{ base: "2.5", md: "10", xl: "16" }} align="stretch">
          <Text
            as="h2"
            fontFamily="body"
            fontSize="display.h2"
            fontWeight="black"
            color="fg"
            textTransform="uppercase"
            textAlign="center"
            lineHeight="1.2"
          >
            {heading}
          </Text>

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: "2.5", md: "5" }}
            w="full"
            alignItems="stretch"
          >
            <VStack
              bg="background"
              p={{ base: "4", md: "6" }}
              gap={{ base: "4", md: "6" }}
              align="stretch"
              h="full"
            >
              <Box
                position="relative"
                w="full"
                aspectRatio={{ base: "368/200", md: "602/400" }}
                bg="gray.300"
                overflow="hidden"
              >
                {featured.imageSrc ? (
                  <Image
                    src={featured.imageSrc}
                    alt={featured.name}
                    fill
                    sizes="(max-width: 991px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
              </Box>
              <Text
                fontFamily="body"
                fontSize="display.h2"
                fontWeight="black"
                color="fg"
                textTransform="uppercase"
                lineHeight="1.1"
              >
                {featured.name}
              </Text>
              <Stars count={featured.stars ?? 5} />
              <Text
                fontFamily="body"
                fontSize={BODY_STEP}
                fontWeight="extrabold"
                color="fg"
                lineHeight="1.5"
              >
                {featured.quote}
              </Text>
            </VStack>

            <VStack gap="5" align="stretch">
              {others.map((quote) => (
                <Flex
                  key={quote.id}
                  bg="background"
                  p={{ base: "4", md: "6" }}
                  gap="6"
                  align="stretch"
                  direction="row"
                >
                  <Box
                    position="relative"
                    w={{ base: "127px", md: "190px" }}
                    h={{ base: "151px", md: "190px" }}
                    flexShrink={0}
                    bg="gray.300"
                    overflow="hidden"
                  >
                    {quote.imageSrc ? (
                      <Image
                        src={quote.imageSrc}
                        alt={quote.name}
                        fill
                        sizes="(max-width: 767px) 127px, 190px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </Box>
                  <VStack
                    align="stretch"
                    gap="4"
                    justify="flex-start"
                    flex="1"
                    minW="0"
                  >
                    <Text
                      fontFamily="body"
                      fontSize={BODY_STEP}
                      fontWeight="extrabold"
                      color="fg"
                      textTransform="uppercase"
                      lineHeight="1.2"
                    >
                      {quote.name}
                    </Text>
                    <Stars count={quote.stars ?? 5} />
                    <Text
                      fontFamily="body"
                      fontSize={BODY_STEP}
                      fontWeight="normal"
                      color="fg"
                      lineHeight="1.5"
                    >
                      {quote.quote}
                    </Text>
                  </VStack>
                </Flex>
              ))}
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
