"use client";

import { Button, Grid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ActivityHoverCard } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import {
  INITIAL_VISIBLE_COUNT,
  type ActivityCardItem,
} from "@/lib/activities/types";

interface AdventureSectionProps {
  heading: string;
  showAllLabel: string;
  activities: ActivityCardItem[];
}

export function AdventureSection({
  heading,
  showAllLabel,
  activities,
}: AdventureSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleActivities = showAll
    ? activities
    : activities.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMore = activities.length > INITIAL_VISIBLE_COUNT;

  return (
    <Section id="actividades">
      <Container>
        <VStack gap={{ base: "6", md: "10", lg: "16" }}>
          <Text
            as="h2"
            textStyle="h2"
            fontSize={{ base: "xl", md: "2xl", lg: "display.h2" }}
            textAlign="center"
            color="fg"
            textTransform="uppercase"
          >
            {heading}
          </Text>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "4", md: "5" }}
            w="full"
          >
            {visibleActivities.map((item) => (
              <ActivityHoverCard
                key={item.id}
                imageSrc={item.imageSrc}
                imageAlt={item.title}
                tag={item.tag}
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                href={item.href}
              />
            ))}
          </Grid>

          {hasMore && !showAll ? (
            <Button
              type="button"
              onClick={() => setShowAll(true)}
              bg="primary"
              color="grayLight"
              px="8"
              py="4"
              h="auto"
              textStyle="button"
              fontSize={{ base: "md", lg: "body.lg" }}
              textTransform="uppercase"
              borderRadius="md"
              _hover={{ opacity: 0.9 }}
            >
              {showAllLabel}
            </Button>
          ) : null}
        </VStack>
      </Container>
    </Section>
  );
}
