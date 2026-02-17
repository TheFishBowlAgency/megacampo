import { Box, Link, Text, VStack } from "@chakra-ui/react";
import { Container } from "@/components/layout";

const HEADING = "Pronto para uma aventura?";

export function CTASection() {
  return (
    <Box bg="primary" color="white" py={{ base: "12", md: "16" }}>
      <Container>
        <VStack gap="6" textAlign="center">
          <Text as="h2" textStyle="h2" fontSize={{ base: "2xl", md: "3rem" }}>
            {HEADING}
          </Text>
          <Link
            href="#reservas"
            bg="fg"
            color="white"
            px="8"
            py="4"
            fontSize="lg"
            fontWeight="semibold"
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ bg: "gray.700", color: "white" }}
          >
            Reservas já
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
