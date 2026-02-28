import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";

const HEADING = "O MAIOR PARQUE DE PAINTBALL DA PENÍNSULA IBÉRICA";
const DESCRIPTION =
  "Joga em 12 mapas cinematográficos. Quer sejas iniciante ou profissional, temos atividades para todas as idades e níveis de experiência.";

export function Hero() {
  return (
    <Box bg="bg.hero" color="grayLight" py={{ base: "16", md: "20", lg: "28" }}>
      <VStack
        gap={{ base: "8", md: "10", lg: "16" }}
        textAlign="center"
        maxW={{ base: "100%", md: "900px", lg: "1758px" }}
        mx="auto"
        px={{ base: "5", md: "8" }}
      >
        <VStack gap={{ base: "5", md: "8" }}>
          <Text
            as="h1"
            textStyle="h1.molot"
            fontSize={{
              base: "display.h1.mobile",
              md: "5rem",
              lg: "display.h1",
            }}
            lineHeight="1"
            textTransform="uppercase"
            color="grayLight"
          >
            {HEADING}
          </Text>
          <Text
            textStyle="h5"
            fontSize={{ base: "sm", md: "md", lg: "body.lg" }}
            color="grayLight"
            maxW={{ base: "400px", md: "600px", lg: "800px" }}
          >
            {DESCRIPTION}
          </Text>
        </VStack>
        <Link
          href="#reservas"
          bg="primary"
          color="grayLight"
          px="8"
          py="4"
          textStyle="button"
          fontSize={{ base: "md", lg: "body.lg" }}
          textTransform="uppercase"
          borderRadius="md"
          _hover={{ opacity: 0.9 }}
        >
          RESERVA JÁ
        </Link>
      </VStack>
    </Box>
  );
}
