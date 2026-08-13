"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";
import { ActivityLinkCard } from "@/components/ui";
import { DEFAULT_EVENT_ACTIVITY_CHOICES } from "@/lib/events/defaults";
import type { EventActivityChoice } from "@/lib/events/types";

const DEFAULT_HEADING = "Qual a atividade certa para a tua festa?";
const DEFAULT_SUBHEADING =
  "No Megacampo tens diferentes formatos para o teu evento de empresa: desde paintball a jogos de cooperação. Escolhe a atividade e consulta os pacotes disponíveis.";

type ActivityChoiceSectionProps = {
  heading?: string;
  description?: string;
  activities?: EventActivityChoice[];
  onActivitySelect?: (activity: EventActivityChoice) => void;
};

export function ActivityChoiceSection({
  heading = DEFAULT_HEADING,
  description = DEFAULT_SUBHEADING,
  activities = DEFAULT_EVENT_ACTIVITY_CHOICES,
  onActivitySelect,
}: ActivityChoiceSectionProps = {}) {
  return (
    <Section>
      <Container>
        <VStack gap={{ base: "10", md: "12", xl: "16" }} align="stretch">
          <VStack
            gap={{ base: "4", md: "8" }}
            textAlign="center"
            maxW={{ md: "777px" }}
            mx="auto"
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
            <Text
              textStyle="body"
              color="fg"
              fontWeight="extrabold"
              fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
              lineHeight="1.5"
            >
              {description}
            </Text>
          </VStack>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            columnGap={{ base: "2.5", md: "5" }}
            rowGap={{ base: "8", md: "10", xl: "12" }}
            w="full"
            alignItems="stretch"
          >
            {activities.map((activity) => (
              <Box
                key={activity.id}
                as="article"
                h="full"
                minH="0"
                display="flex"
                flexDirection="column"
              >
                <ActivityLinkCard
                  href={activity.href}
                  imageSrc={activity.imageSrc}
                  imageAlt={activity.imageAlt}
                  tag={activity.title}
                  footerTitle={activity.title}
                  features={activity.features}
                  ageNote={activity.ageNote}
                  onClick={() => onActivitySelect?.(activity)}
                />
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
