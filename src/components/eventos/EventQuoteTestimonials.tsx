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

function Stars({ count = 5 }: { count?: number }) {
  return (
    <HStack gap="1" aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} as="span" color="dark" fontSize="sm" lineHeight="1">
          ★
        </Box>
      ))}
    </HStack>
  );
}

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
        <VStack gap={{ base: "8", md: "10", xl: "12" }} align="stretch">
          <Text
            as="h2"
            textStyle="h2"
            fontSize="display.h2"
            color="fg"
            textTransform="uppercase"
            textAlign="center"
          >
            {heading}
          </Text>

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: "5", md: "6" }}
            w="full"
            alignItems="stretch"
          >
            <VStack
              bg="background"
              p={{ base: "5", md: "6" }}
              gap={{ base: "4", md: "5" }}
              align="stretch"
              h="full"
            >
              <Box
                position="relative"
                w="full"
                aspectRatio="602/400"
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
                fontSize={{ base: "2xl", md: "3rem" }}
                fontWeight="extrabold"
                color="fg"
                textTransform="uppercase"
                lineHeight="1.1"
              >
                {featured.name}
              </Text>
              <Stars count={featured.stars ?? 5} />
              <Text
                fontSize={{ base: "sm", md: "md", xl: "body.lg" }}
                fontWeight="extrabold"
                color="fg"
                lineHeight="1.5"
              >
                {featured.quote}
              </Text>
            </VStack>

            <VStack gap={{ base: "5", md: "6" }} align="stretch">
              {others.map((quote) => (
                <Flex
                  key={quote.id}
                  bg="background"
                  p={{ base: "4", md: "5" }}
                  gap={{ base: "4", md: "6" }}
                  align="stretch"
                  direction={{ base: "column", sm: "row" }}
                >
                  <Box
                    position="relative"
                    w={{ base: "full", sm: "190px" }}
                    flexShrink={0}
                    aspectRatio="1"
                    bg="gray.300"
                    overflow="hidden"
                  >
                    {quote.imageSrc ? (
                      <Image
                        src={quote.imageSrc}
                        alt={quote.name}
                        fill
                        sizes="190px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </Box>
                  <VStack align="stretch" gap="2" justify="center" flex="1">
                    <Text
                      fontSize={{ base: "md", xl: "body.lg" }}
                      fontWeight="extrabold"
                      color="fg"
                      textTransform="uppercase"
                    >
                      {quote.name}
                    </Text>
                    <Text
                      fontSize={{ base: "sm", md: "md", xl: "body.lg" }}
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
