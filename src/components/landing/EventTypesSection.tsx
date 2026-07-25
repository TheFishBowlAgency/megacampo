import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Link } from "@/components/ui";
import { Container, Section } from "@/components/layout";
import type { EventCardItem } from "@/lib/events/types";

type EventTypesSectionProps = {
  heading: string;
  description: string;
  cardLinkLabel: string;
  events: EventCardItem[];
};

export function EventTypesSection({
  heading,
  description,
  cardLinkLabel,
  events,
}: EventTypesSectionProps) {
  return (
    <Section id="eventos">
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
              {heading}
            </Text>
            <Text
              textStyle="h5"
              fontSize={{ base: "sm", md: "md", lg: "body.lg" }}
              color="fg"
            >
              {description}
            </Text>
          </VStack>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "3", md: "5" }}
            w="full"
          >
            {events.map((item) => (
              <VStack key={item.id} gap={{ base: "3", lg: "6" }}>
                <Box
                  position="relative"
                  w="full"
                  aspectRatio={{ base: "195/265", lg: "315/428" }}
                  bg="gray.300"
                  overflow="hidden"
                >
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="(max-width: 991px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                </Box>
                <VStack gap="1">
                  <Text
                    textStyle="h5"
                    fontSize={{ base: "xs", md: "sm", lg: "body.lg" }}
                    color="fg"
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {item.title}
                  </Text>
                  <Link
                    href={item.href}
                    fontSize={{ base: "xs", md: "sm", lg: "body.lg" }}
                    color="fg.muted"
                    _hover={{ color: "primary" }}
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
