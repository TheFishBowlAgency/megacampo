import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const HEADING = "Segurança em primeiro lugar";
const SUBHEADING =
  "Monitorização e segurança em todas as atividades. Equipamento de proteção atualizado e vigilância permanente.";

const ITEMS = [
  "MONITORIZAÇÃO E SEGURANÇA",
  "EQUIPAMENTO DE PROTEÇÃO ATUALIZADO",
  "VIGILÂNCIA PERMANENTE",
  "PARQUE AUTOMÓVEL PRIVATIVO E SEGURO",
];

export function SafetySection() {
  return (
    <Section>
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: "8", lg: "12" }}
          alignItems="center"
        >
          <VStack align="stretch" gap="4" order={{ base: 2, lg: 1 }}>
            <VStack align="stretch" gap="2">
              <Text as="h2" textStyle="h2" color="fg">
                {HEADING}
              </Text>
              <Text textStyle="body" color="fg.muted">
                {SUBHEADING}
              </Text>
            </VStack>
            <VStack align="stretch" gap="3">
              {ITEMS.map((label) => (
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
          <Box
            order={{ base: 1, lg: 2 }}
            bg="gray.200"
            borderRadius="lg"
            minH={{ base: "200px", lg: "320px" }}
            aspectRatio={{ base: "16/9", lg: "auto" }}
          />
        </Grid>
      </Container>
    </Section>
  );
}
