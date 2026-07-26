import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { CTASection, FAQSection, Footer } from "@/components/landing";
import { Container, Section } from "@/components/layout";
import { Link } from "@/components/ui";
import type { EventDetail } from "@/lib/events/types";

import { ShareButton } from "./ShareButton";

type EventSimpleDetailContentProps = {
  event: EventDetail;
};

export function EventSimpleDetailContent({
  event,
}: EventSimpleDetailContentProps) {
  return (
    <main>
      <Section py={{ base: "10", md: "14", xl: "16" }}>
        <Container>
          <VStack gap="10" align="stretch">
            <Link
              href="/eventos"
              color="fg.muted"
              fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
              _hover={{ color: "primary" }}
              alignSelf="flex-start"
            >
              ← Voltar a Eventos
            </Link>

            <Flex
              direction={{ base: "column", lg: "row" }}
              gap={{ base: "10", lg: "12", xl: "16" }}
              align="stretch"
            >
              <Box
                position="relative"
                w={{ base: "full", lg: "520px" }}
                flexShrink={0}
                aspectRatio={{ base: "4/3", lg: "520/700" }}
                bg="gray.300"
                overflow="hidden"
              >
                {event.imageSrc ? (
                  <Image
                    src={event.imageSrc}
                    alt={event.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 520px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : null}
              </Box>

              <VStack
                align="stretch"
                gap={{ base: "8", md: "10", xl: "12" }}
                flex="1"
                minW={0}
                maxW={{ lg: "740px" }}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  gap="4"
                  wrap="wrap"
                >
                  <Text
                    as="h1"
                    fontSize={{ base: "xl", md: "2rem" }}
                    fontWeight="extrabold"
                    color="fg"
                    textTransform="uppercase"
                    lineHeight="1.2"
                  >
                    {event.title}
                  </Text>
                  <ShareButton title={event.title} />
                </Flex>

                <VStack align="stretch" gap="8">
                  <Text
                    color="fg"
                    fontSize={{
                      base: "sm",
                      md: "md",
                      lg: "body.md",
                      xl: "body.lg",
                    }}
                    lineHeight="1.6"
                  >
                    {event.description}
                  </Text>
                  <Text
                    color="fg"
                    fontSize={{
                      base: "sm",
                      md: "md",
                      lg: "body.md",
                      xl: "body.lg",
                    }}
                    lineHeight="1.6"
                  >
                    {event.body}
                  </Text>
                </VStack>

                <Link
                  href={event.reserveHref}
                  bg="primary"
                  color="grayLight"
                  px="8"
                  py="4"
                  textStyle="button"
                  fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
                  textTransform="uppercase"
                  alignSelf="flex-start"
                  _hover={{ opacity: 0.9 }}
                >
                  Reserva já
                </Link>
              </VStack>
            </Flex>
          </VStack>
        </Container>
      </Section>

      <CTASection href={event.reserveHref} />
      <FAQSection id="faq-eventos" heading="Perguntas frequentes" />
      <Footer />
    </main>
  );
}
