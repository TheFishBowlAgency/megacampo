import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";
import { ActivityLinkCard } from "@/components/ui";
import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";

const ACTIVITIES = [
  {
    id: "paintball",
    title: "PAINTBALL",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    imageAlt: "Jogadores de paintball em cenário ao ar livre",
    features: [
      "Ideal para equipas jovens e competitivas",
      "Mais intensidade e adrenalina",
      "Ótimo para “quebrar o gelo”",
    ],
    minAge: "+10 anos",
  },
  {
    id: "soft-paintball",
    title: "SOFT PAINTBALL",
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    imageAlt: "Equipa em atividade de soft paintball",
    features: [
      "Menos impacto, mesma dinâmica de jogo",
      "Bom para grupos mistos/menos habituados a atividades radicais",
      "Excelente equilíbrio entre conforto",
    ],
    minAge: "+8 anos",
  },
  {
    id: "cooperacao",
    title: "JOGOS DE COOPERAÇÃO",
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
    imageAlt: "Grupo em jogos de equipa e cooperação",
    features: [
      "Foco em comunicação, liderança e estratégia",
      "Ideal para equipas com diferentes idades",
      "Perfeito quando o objetivo é team building",
    ],
    minAge: "+10 anos",
  },
];

const DEFAULT_HEADING = "Qual a atividade certa para a tua festa?";
const DEFAULT_SUBHEADING =
  "No Megacampo tens diferentes formatos para o teu evento de empresa: desde paintball a jogos de cooperação. Escolhe a atividade e consulta os pacotes disponíveis.";

type ActivityChoiceSectionProps = {
  heading?: string;
  description?: string;
};

export function ActivityChoiceSection({
  heading = DEFAULT_HEADING,
  description = DEFAULT_SUBHEADING,
}: ActivityChoiceSectionProps = {}) {
  return (
    <Section>
      <Container>
        <VStack gap={{ base: "8", md: "10", lg: "12" }} align="stretch">
          <VStack gap="2" textAlign="center">
            <Text as="h2" textStyle="h2" fontSize="display.h2" color="fg">
              {heading}
            </Text>
            <Text
              textStyle="body"
              color="fg.muted"
              maxW="2xl"
              mx="auto"
              fontSize={{ base: "md", md: "body.md", xl: "body.lg" }}
            >
              {description}
            </Text>
          </VStack>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: "4", md: "6" }}
            w="full"
            alignItems="stretch"
          >
            {ACTIVITIES.map((activity) => (
              <Box
                key={activity.id}
                as="article"
                h="full"
                minH="0"
                display="flex"
                flexDirection="column"
              >
                <ActivityLinkCard
                  href="#pacotes"
                  imageSrc={activity.imageSrc}
                  imageAlt={activity.imageAlt}
                  tag={activity.title}
                  footerTitle={activity.title}
                  features={activity.features}
                  ageNote={activity.minAge}
                />
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
