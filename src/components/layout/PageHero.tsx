import { Box, Text, VStack } from "@chakra-ui/react";
import { Container } from "./Container";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

/**
 * Full-width hero for inner pages (e.g. Eventos). Dark background, centered title.
 */
export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <Box bg="bg.dark" color="white" py={{ base: "12", md: "16", lg: "20" }}>
      <Container>
        <VStack
          gap={{ base: "4", md: "6" }}
          textAlign="center"
          maxW="4xl"
          mx="auto"
        >
          <Text
            as="h1"
            textStyle="h1.anton"
            fontSize={{ base: "2.5rem", md: "4rem", lg: "5rem" }}
            lineHeight="1"
            textTransform="uppercase"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              textStyle="body"
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.900"
              maxW="2xl"
            >
              {subtitle}
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
