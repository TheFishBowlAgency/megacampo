"use client";

import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const DEFAULT_HEADING = "MILHARES DE CLIENTES APROVAM O MEGACAMPO";
const DEFAULT_SUBHEADING =
  "Para muitos jogadores, a melhor experiência de paintball que já viveram.";

type TestimonialsSectionProps = {
  heading?: string;
  subheading?: string;
};

export function TestimonialsSection({
  heading = DEFAULT_HEADING,
  subheading = DEFAULT_SUBHEADING,
}: TestimonialsSectionProps = {}) {
  return (
    <Section variant="default">
      <Container>
        <VStack gap={{ base: "6", md: "8", lg: "16" }}>
          <VStack gap={{ base: "3", md: "4", lg: "8" }} textAlign="center">
            <Text
              as="h2"
              textStyle="h2"
              fontSize={{ base: "xl", md: "2xl", lg: "display.h2" }}
              color="fg"
              textTransform="uppercase"
            >
              {heading}
            </Text>
            <Text
              textStyle="h5"
              fontSize={{ base: "sm", md: "md", lg: "body.lg" }}
              color="fg"
            >
              {subheading}
            </Text>
          </VStack>

          <Box w="full" position="relative">
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: "4", md: "5" }}
              w="full"
            >
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  bg="gray.300"
                  w="full"
                  aspectRatio="315/428"
                  display={{
                    base: i > 1 ? "none" : "block",
                    md: i > 2 ? "none" : "block",
                    lg: "block",
                  }}
                />
              ))}
            </Grid>

            <HStack
              justify={{ base: "center", lg: "space-between" }}
              mt={{ base: "6", lg: "0" }}
              gap="4"
              position={{ lg: "absolute" }}
              top={{ lg: "50%" }}
              left={{ lg: "0" }}
              right={{ lg: "0" }}
              transform={{ lg: "translateY(-50%)" }}
              px={{ lg: "0" }}
              pointerEvents="none"
            >
              <Box
                as="button"
                aria-label="Anterior"
                w={{ base: "40px", lg: "60px" }}
                h={{ base: "40px", lg: "60px" }}
                border="2px solid"
                borderColor="dark"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                pointerEvents="auto"
                _hover={{ bg: "gray.100" }}
              >
                <ChevronLeftIcon />
              </Box>
              <Box
                as="button"
                aria-label="Seguinte"
                w={{ base: "40px", lg: "60px" }}
                h={{ base: "40px", lg: "60px" }}
                border="2px solid"
                borderColor="dark"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                pointerEvents="auto"
                _hover={{ bg: "gray.100" }}
              >
                <ChevronRightIcon />
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Section>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 33 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M33 10H3M3 10L13 1M3 10L13 19" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="12"
      viewBox="0 0 33 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M0 10H30M30 10L20 1M30 10L20 19" />
    </svg>
  );
}
