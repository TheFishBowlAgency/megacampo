import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { Container } from "@/components/layout";

export type CTASectionProps = {
  heading?: string;
  buttonText?: string;
  href?: string;
};

const DEFAULT_HEADING = "PRONTO PARA UMA AVENTURA?";
const DEFAULT_BUTTON = "RESERVA JÁ";
const DEFAULT_HREF = "/#reservas";

export function CTASection({
  heading = DEFAULT_HEADING,
  buttonText = DEFAULT_BUTTON,
  href = DEFAULT_HREF,
}: CTASectionProps = {}) {
  return (
    <Box bg="primary" py={{ base: "10", md: "12", lg: "14", xl: "16" }}>
      <Container>
        <VStack
          gap={{ base: "5", md: "6", lg: "6", xl: "8" }}
          textAlign="center"
        >
          <Text
            as="h2"
            textStyle="h2"
            fontSize="display.h2"
            color="fg"
            textTransform="uppercase"
          >
            {heading}
          </Text>
          <Link
            href={href}
            bg="dark"
            color="grayLight"
            px="8"
            py="4"
            textStyle="button"
            fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ opacity: 0.9 }}
          >
            {buttonText}
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
