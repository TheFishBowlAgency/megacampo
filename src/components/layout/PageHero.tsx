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
  cta?: PageHeroCta;
  /** Override the hero background — defaults to "bg.dark" */
  heroBg?: string;
  /** Override the title text style — defaults to "h1.anton" */
  titleTextStyle?: string;
  /** Minimum height for the hero — when set, content is vertically centered */
  minH?: React.ComponentProps<typeof Box>["minH"];
};

/**
 * Full-width hero for inner pages (e.g. Eventos, Como). Dark background, centered title.
 */
export function PageHero({
  title,
  subtitle,
  cta,
  heroBg = "bg.dark",
  titleTextStyle = "h1.anton",
  minH,
}: PageHeroProps) {
  return (
    <Box
      bg={heroBg}
      color="white"
      py={{ base: "12", md: "16", lg: "20" }}
      {...(minH
        ? {
            minH,
            display: "flex",
            flexDirection: "column" as const,
            justifyContent: "center",
          }
        : {})}
    >
      <Container>
        <VStack
          gap={{ base: "4", md: "8" }}
          textAlign="center"
          maxW="4xl"
          mx="auto"
        >
          <Text
            as="h1"
            textStyle={titleTextStyle}
            fontSize={{ base: "2.5rem", md: "4rem", lg: "5rem" }}
            lineHeight="1"
            textTransform="uppercase"
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              textStyle="h5"
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
