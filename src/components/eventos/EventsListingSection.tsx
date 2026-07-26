import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Link } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import type { EventCardItem } from "@/lib/events/types";

type EventsListingSectionProps = {
  heading: string;
  cardLinkLabel: string;
  events: EventCardItem[];
};

export function EventsListingSection({
  heading,
  cardLinkLabel,
  events,
}: EventsListingSectionProps) {
  return (
    <Section py={{ base: "10", md: "14", xl: "16" }}>
      <Container>
        <VStack gap={{ base: "10", md: "12", xl: "16" }} align="stretch">
          <Text
            as="h2"
            textStyle="h2"
            fontSize="display.h2"
            color="fg"
            textTransform="uppercase"
            textAlign="center"
          >
            {heading}
          </Text>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
            }}
            columnGap={{ base: "6", md: "5", xl: "5" }}
            rowGap={{ base: "10", md: "12", xl: "16" }}
            w="full"
          >
            {events.map((event) => (
              <VStack key={event.id} as="article" align="stretch" gap="4">
                <Box
                  position="relative"
                  w="full"
                  aspectRatio="650/490"
                  bg="gray.300"
                  overflow="hidden"
                >
                  {event.imageSrc ? (
                    <Image
                      src={event.imageSrc}
                      alt={event.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                </Box>
                <VStack align="stretch" gap="3">
                  <Text
                    as="h3"
                    textStyle="h4"
                    fontSize={{ base: "xl", md: "2rem", xl: "display.h3" }}
                    color="fg"
                    textTransform="uppercase"
                  >
                    {event.title}
                  </Text>
                  {event.description ? (
                    <Text
                      color="fg"
                      fontSize={{
                        base: "sm",
                        md: "md",
                        lg: "body.md",
                        xl: "body.lg",
                      }}
                      lineHeight="1.5"
                    >
                      {event.description}
                    </Text>
                  ) : null}
                  <Link
                    href={event.href}
                    fontSize={{
                      base: "sm",
                      md: "md",
                      lg: "body.md",
                      xl: "body.lg",
                    }}
                    color="fg.muted"
                    _hover={{ color: "primary" }}
                    alignSelf="flex-start"
                  >
                    {cardLinkLabel}
                  </Link>
                </VStack>
              </VStack>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
