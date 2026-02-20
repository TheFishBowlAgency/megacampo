import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { Container } from "@/components/layout";

export type CTASectionProps = {
  heading?: string;
  buttonText?: string;
  href?: string;
};

const DEFAULT_HEADING = "Pronto para uma aventura?";
const DEFAULT_BUTTON = "Reservas já";
const DEFAULT_HREF = "/#reservas";

export function CTASection({
  heading = DEFAULT_HEADING,
  buttonText = DEFAULT_BUTTON,
  href = DEFAULT_HREF,
}: CTASectionProps = {}) {
  return (
    <Box bg="primary" color="white" py={{ base: "12", md: "16" }}>
      <Container>
        <VStack gap="6" textAlign="center">
          <Text
            as="h2"
            textStyle="h2"
            fontSize={{ base: "2xl", md: "3rem" }}
            textTransform="uppercase"
          >
            {heading}
          </Text>
          <Link
            href={href}
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
            {buttonText}
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
