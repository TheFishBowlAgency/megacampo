import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const HEADING = "Muito mais do que um campo de paintball";
const SUBHEADING =
  "Espaços de descanso, lazer e zonas verdes. Infraestruturas amplas e conceituais para uma experiência completa.";

const FEATURES = [
  "ESPAÇOS DE DESCANSO, LAZER E ZONAS VERDES",
  "INFRAESTRUTURAS AMPLAS E CONCEITUAIS",
  "CLUBE DE MEMBROS",
  "PROGRAMAS PARA EMPRESAS",
  "ESTACIONAMENTO PRIVATIVO",
  "ARMAZÉNS E BALNEÁRIOS",
];

export function MoreThanPaintballSection() {
  return (
    <Section variant="subtle" id="parque">
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "8", lg: "12" }}
          alignItems="center"
        >
          <Box
            bg="gray.200"
            borderRadius="lg"
            minH={{ base: "200px", lg: "320px" }}
            aspectRatio={{ base: "16/9", lg: "auto" }}
          />
          <VStack align="stretch" gap="6">
            <VStack align="stretch" gap="2">
              <Text as="h2" textStyle="h2" color="fg">
                {HEADING}
              </Text>
              <Text textStyle="body" color="fg.muted">
                {SUBHEADING}
              </Text>
            </VStack>
            <VStack align="stretch" gap="3">
              {FEATURES.map((label) => (
                <Box
                  key={label}
                  borderWidth="2px"
                  borderColor="primary"
                  borderRadius="md"
                  px="4"
                  py="3"
                  display="flex"
                  alignItems="center"
                  gap="3"
                  bg="white"
                >
                  <Box
                    w="6"
                    h="6"
                    bg="primary"
                    borderRadius="full"
                    flexShrink={0}
                  />
                  <Text
                    fontWeight="semibold"
                    fontSize="sm"
                    textTransform="uppercase"
                    color="fg"
                  >
                    {label}
                  </Text>
                </Box>
              ))}
            </VStack>
          </VStack>
        </Grid>
      </Container>
    </Section>
  );
}
