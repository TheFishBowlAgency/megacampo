import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";

export function MapsSection() {
  return (
    <Box bg="bg.hero" color="grayLight" py={{ base: "16", md: "20", lg: "28" }}>
      <VStack
        gap={{ base: "6", md: "8", lg: "16" }}
        align={{ base: "center", lg: "flex-end" }}
        maxW={{ base: "100%", md: "900px", lg: "1320px" }}
        mx="auto"
        px={{ base: "5", md: "8" }}
      >
        <VStack
          gap={{ base: "4", md: "5" }}
          align={{ base: "center", lg: "flex-end" }}
          textAlign={{ base: "center", lg: "right" }}
        >
          <Text
            as="h2"
            textStyle="h1.molot"
            fontSize={{
              base: "display.h1.mobile",
              md: "5rem",
              lg: "display.h1",
            }}
            lineHeight="1"
            textTransform="uppercase"
            color="grayLight"
            maxW={{ base: "400px", lg: "815px" }}
          >
            MAPAS MUNDIALMENTE FAMOSOS
          </Text>
          <Text
            textStyle="h4"
            fontSize={{ base: "sm", md: "lg", lg: "display.h3" }}
            color="grayLight"
          >
            Experiência 12 mapas em 40 hectares de cenários imersivos!
          </Text>
        </VStack>
        <Link
          href="/cenarios"
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
          VER MAPAS
        </Link>
      </VStack>
    </Box>
  );
}
