import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";
import { FeatureItem } from "@/components/ui/FeatureItem";

const HEADING = "MUITO MAIS DO QUE UM CAMPO DE PAINTBALL";
const SUBHEADING =
  "Depois da batalha, há sempre espaço para descansar, comer e rir das melhores jogadas";

const FEATURES = [
  { label: "ESPAÇOS EXTERIORES AMPLOS E ZONAS VERDES", icon: <TreeIcon /> },
  { label: "ZONA DE BARBECUE", icon: <GrillIcon /> },
  { label: "BALNEÁRIOS E DUCHES", icon: <ShowerIcon /> },
  { label: "ESTACIONAMENTO GRATUITO", icon: <ParkingIcon /> },
  { label: "ÁREAS DE DESCANSO E SOMBRA", icon: <CoffeeIcon /> },
];

export function MoreThanPaintballSection() {
  return (
    <Section variant="default" id="parque">
      <Container>
        <VStack gap={{ base: "6", md: "8", lg: "16" }}>
          <VStack gap={{ base: "3", md: "4", lg: "8" }} textAlign="center">
            <Text
              as="h2"
              textStyle="h2"
              fontSize={{ base: "xl", md: "2xl", lg: "display.h2" }}
              color="fg"
              textTransform="uppercase"
            >
              {HEADING}
            </Text>
            <Text
              textStyle="h5"
              fontSize={{ base: "sm", md: "md", lg: "body.lg" }}
              color="fg"
            >
              {SUBHEADING}
            </Text>
          </VStack>

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: "6", lg: "5" }}
            w="full"
            alignItems="start"
          >
            <Box
              bg="gray.300"
              w="full"
              minH={{ base: "220px", lg: "524px" }}
              aspectRatio={{ base: "16/10", lg: "auto" }}
            />
            <VStack gap={{ base: "3", lg: "8" }} align="stretch">
              {FEATURES.map((f) => (
                <FeatureItem key={f.label} icon={f.icon} label={f.label} />
              ))}
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}

function TreeIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M25 5 L10 25 L18 25 L8 40 L42 40 L32 25 L40 25 Z" />
      <rect x="22" y="40" width="6" height="8" />
    </svg>
  );
}

function GrillIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="25" cy="22" r="14" />
      <path d="M14 30 L10 45" />
      <path d="M36 30 L40 45" />
      <path d="M25 36 L25 45" />
      <path d="M15 22 L35 22" />
    </svg>
  );
}

function ShowerIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 5 L15 15 L35 15" />
      <circle cx="35" cy="15" r="4" />
      <path d="M20 22 L20 30" />
      <path d="M25 20 L25 32" />
      <path d="M30 22 L30 30" />
      <path d="M35 24 L35 28" />
      <path d="M15 24 L15 28" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="8" width="34" height="34" rx="4" />
      <path d="M20 35 L20 15 L30 15 Q36 15 36 22 Q36 29 30 29 L20 29" />
    </svg>
  );
}

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 18 L10 38 Q10 42 14 42 L32 42 Q36 42 36 38 L36 18" />
      <path d="M36 22 L42 22 Q46 22 46 28 Q46 34 42 34 L36 34" />
      <path d="M18 8 L18 14" />
      <path d="M23 6 L23 14" />
      <path d="M28 8 L28 14" />
    </svg>
  );
}
