import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Container, Section } from "@/components/layout";
import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

type Quote = {
  name: string;
  quote: string;
  imageSrc: string;
  featured?: boolean;
  stars?: number;
};

const QUOTES: Quote[] = [
  {
    name: "MARIANA",
    quote:
      "This paintball field is simply incredible! Everything is well thought out, incredible scenarios and plenty of space to run and hide. The vibe is top-notch, the staff is super chill and gets everyone into the game right from the start, even those who have never played before. 5/5 stars. I recommend it without a doubt!",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    featured: true,
    stars: 5,
  },
  {
    name: "JOÃO",
    quote:
      "Cenários sensacionais e uma equipa claramente focada em proporcionar uma experiência de paintball de alta qualidade.",
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
  },
  {
    name: "SONDRE",
    quote:
      "Absolutely amazing stagparty! We were a group of 14 guys, and it couldn't have been better. 5/5 stars. Definitely coming back!",
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
  },
  {
    name: "MARJO",
    quote:
      "Cenários, material, staff, instalações incríveis. Tudo foi fantástico. Já joguei em muitos sítios e este é de outro planeta.",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
  },
];

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

export function EventQuoteTestimonials() {
  const featured = QUOTES.find((q) => q.featured) ?? QUOTES[0];
  const others = QUOTES.filter((q) => q !== featured);

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
            O que dizem os nossos clientes?
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
                <Image
                  src={featured.imageSrc}
                  alt={featured.name}
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
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
                  key={quote.name}
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
                    <Image
                      src={quote.imageSrc}
                      alt={quote.name}
                      fill
                      sizes="190px"
                      style={{ objectFit: "cover" }}
                    />
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
