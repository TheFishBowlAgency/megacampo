import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { Container } from "@/components/layout";

const HEADING = "MAPAS MUNDIALMENTE FAMOSOS";
const DESCRIPTION =
  "Experiência 12 mapas em 60 hectares de cenários imersivos!";

export function MapsSection() {
  return (
    <Box bg="bg.dark" color="white" py={{ base: "12", md: "16" }}>
      <Container>
        <VStack gap="6" textAlign="center" maxW="2xl" mx="auto">
          <Text as="h2" textStyle="h2" fontSize={{ base: "2xl", md: "3rem" }}>
            {HEADING}
          </Text>
          <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.900">
            {DESCRIPTION}
          </Text>
          <Link
            href="#mapas"
            bg="primary"
            color="white"
            px="6"
            py="3"
            fontSize="lg"
            fontWeight="semibold"
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ bg: "primary.muted", color: "fg" }}
          >
            Ver mapas
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
