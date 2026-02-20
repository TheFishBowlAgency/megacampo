import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { Container } from "./Container";

export type PageHeroCta = {
  label: string;
  href: string;
};

type PageHeroProps = {
  title: string;
  subtitle?: string;
  /** Optional primary CTA button below subtitle */
  cta?: PageHeroCta;
};

/**
 * Full-width hero for inner pages (e.g. Eventos, Como). Dark background, centered title.
 */
export function PageHero({ title, subtitle, cta }: PageHeroProps) {
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
          {cta && (
            <Link
              href={cta.href}
              bg="primary"
              color="white"
              px={{ base: "8", md: "10" }}
              py={{ base: "3", md: "4" }}
              textStyle="button"
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
