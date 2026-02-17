import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { Container } from "@/components/layout";

const HEADING = "O MAIOR PARQUE DE PAINTBALL DA PENÍNSULA IBÉRICA";
const DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";

export function Hero() {
  return (
    <Box bg="bg.dark" color="white" py={{ base: "12", md: "16", lg: "20" }}>
      <Container>
        <VStack
          gap={{ base: "6", md: "8" }}
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
            {HEADING}
          </Text>
          <Text
            textStyle="body"
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.900"
            maxW="2xl"
          >
            {DESCRIPTION}
          </Text>
          <Link
            href="#reservas"
            bg="primary"
            color="white"
            px="8"
            py="4"
            fontSize="lg"
            fontWeight="semibold"
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ bg: "primary.muted", color: "fg" }}
          >
            Reservas já
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
