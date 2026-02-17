import { Box, Grid, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";

const FEATURES = [
  "+20 ANOS DE EXPERIÊNCIA",
  "MAPA DE AÇÃO",
  "CENÁRIOS ÚNICOS",
  "EQUIPAMENTO INCLUÍDO",
  "SEGURANÇA EM PRIMEIRO",
];

export function KeyFeatures() {
  return (
    <Box bg="white" py={{ base: "8", md: "10" }}>
      <Container>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap="4"
        >
          {FEATURES.map((label) => (
            <Box
              key={label}
              borderWidth="2px"
              borderColor="primary"
              borderRadius="md"
              p="4"
              textAlign="center"
              _hover={{ bg: "primary.muted" }}
            >
              <Text
                fontWeight="bold"
                fontSize={{ base: "xs", md: "sm" }}
                textTransform="uppercase"
                letterSpacing="wider"
                color="fg"
              >
                {label}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
