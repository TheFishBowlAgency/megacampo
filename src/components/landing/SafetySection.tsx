import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";
import { FeatureItem } from "@/components/ui/FeatureItem";

const HEADING = "SEGURANÇA EM PRIMEIRO LUGAR";
const SUBHEADING =
  "30 anos de experiência a receber milhares de jogadores seguindo regras claras, equipamento certificado e monitores profissionais.";

const ITEMS = [
  { label: "BRIEFING DE SEGURANÇA", icon: <BriefingIcon /> },
  { label: "EQUIPAMENTO DE PROTEÇÃO VERIFICADO", icon: <ShieldIcon /> },
  { label: "MONITORES EXPERIENTES", icon: <PersonIcon /> },
  {
    label: "REGRAS AJUSTADAS À IDADE E EXPERIÊNCIA",
    icon: <RulesIcon />,
  },
];

export function SafetySection() {
  return (
    <Section>
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
            <VStack
              gap={{ base: "3", lg: "8" }}
              align="stretch"
              order={{ base: 2, lg: 1 }}
            >
              {ITEMS.map((item) => (
                <FeatureItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </VStack>
            <Box
              bg="gray.300"
              w="full"
              minH={{ base: "220px", lg: "398px" }}
              aspectRatio={{ base: "16/10", lg: "auto" }}
              order={{ base: 1, lg: 2 }}
            />
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}

function BriefingIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="10" y="6" width="30" height="38" rx="2" />
      <path d="M18 16 L32 16" />
      <path d="M18 24 L32 24" />
      <path d="M18 32 L28 32" />
      <path d="M20 2 L20 10" />
      <path d="M30 2 L30 10" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M25 4 L6 14 L6 26 Q6 40 25 48 Q44 40 44 26 L44 14 Z" />
      <path d="M18 25 L23 30 L33 20" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="25" cy="14" r="8" />
      <path d="M10 45 Q10 30 25 30 Q40 30 40 45" />
    </svg>
  );
}

function RulesIcon() {
  return (
    <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 8 L42 8 L42 42 L8 42 Z" />
      <path d="M8 8 L25 2 L42 8" />
      <path d="M16 18 L34 18" />
      <path d="M16 26 L34 26" />
      <path d="M16 34 L28 34" />
    </svg>
  );
}
