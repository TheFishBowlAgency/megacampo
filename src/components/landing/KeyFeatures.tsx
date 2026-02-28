import { Box, Flex, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";

const FEATURES = [
  "+30 ANOS DE EXPERIÊNCIA",
  "12 MAPAS",
  "30 MINUTOS DE LISBOA",
  "+20.000 VISITANTES",
  "40 HECTARES",
];

export function KeyFeatures() {
  return (
    <Box py={{ base: "8", md: "10" }}>
      <Container>
        <Flex
          flexWrap="wrap"
          gap={{ base: "3", md: "4", lg: "5" }}
          justifyContent="center"
        >
          {FEATURES.map((label) => (
            <Box
              key={label}
              position="relative"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={{ base: "5", md: "4", lg: "3" }}
              py={{ base: "2", md: "3" }}
              minW={{ base: "160px", md: "180px", lg: "200px" }}
              minH={{ base: "50px", md: "60px", lg: "70px" }}
            >
              <Box
                position="absolute"
                inset="0"
                border="2px solid"
                borderColor="dark"
                transform="skewX(-8deg)"
                borderRadius="sm"
              />
              <Text
                fontFamily="heading.molot"
                fontSize={{ base: "xs", md: "sm", lg: "body.lg" }}
                fontWeight="normal"
                textAlign="center"
                color="dark"
                textTransform="uppercase"
                lineHeight="1.2"
                position="relative"
                zIndex="1"
              >
                {label}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
