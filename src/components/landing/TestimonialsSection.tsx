import { Box, Grid, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const DEFAULT_HEADING = "Milhares de clientes aprovam o Megacampo";
const DEFAULT_SUBHEADING = "Descubra o que dizem quem já viveu a aventura.";

type TestimonialsSectionProps = {
  heading?: string;
  subheading?: string;
};

export function TestimonialsSection({
  heading = DEFAULT_HEADING,
  subheading = DEFAULT_SUBHEADING,
}: TestimonialsSectionProps = {}) {
  return (
    <Section variant="subtle">
      <Container>
        <VStack gap="8">
          <VStack gap="2" textAlign="center">
            <Text as="h2" textStyle="h2" color="fg">
              {heading}
            </Text>
            <Text textStyle="body" color="fg.muted" maxW="xl">
              {subheading}
            </Text>
          </VStack>
          <Box w="full" position="relative">
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
              gap="4"
              w="full"
            >
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  bg="white"
                  borderRadius="lg"
                  minH="120px"
                  borderWidth="1px"
                  borderColor="gray.200"
                />
              ))}
            </Grid>
            <HStack justify="center" mt="6" gap="2">
              <IconButton
                aria-label="Anterior"
                variant="outline"
                size="sm"
                colorPalette="primary"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="Seguinte"
                variant="outline"
                size="sm"
                colorPalette="primary"
              >
                <ChevronRightIcon />
              </IconButton>
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
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
