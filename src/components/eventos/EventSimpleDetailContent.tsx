import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { CTASection, FAQSection, Footer } from "@/components/landing";
import type { FAQItem } from "@/components/landing/FAQSection";
import { Container, Section } from "@/components/layout";
import { ChevronLeftIcon } from "@/components/product/detail/shared";
import { Link } from "@/components/ui";
import { RichTextContent } from "@/components/ui/RichTextContent";
import type { EventDetail, EventosCopy } from "@/lib/events/types";
import { DEFAULT_EVENT_LISTING } from "@/lib/events/defaults";

import { ShareButton } from "./ShareButton";

import { BUTTON_SHADOW } from "@/lib/ui/buttonShadow";

const RESERVE_BUTTON_SHADOW = BUTTON_SHADOW;

const BODY_FONT_SIZE = {
  base: "sm",
  md: "md",
  lg: "body.md",
  xl: "body.lg",
} as const;

type EventSimpleDetailContentProps = {
  event: EventDetail;
  copy?: EventosCopy;
  cta?: {
    heading: string;
    buttonText: string;
    href: string;
  };
  faq?: {
    heading: string;
    items: FAQItem[];
  };
};

export function EventSimpleDetailContent({
  event,
  copy = DEFAULT_EVENT_LISTING,
  cta,
  faq,
}: EventSimpleDetailContentProps) {
  const backLabel = copy.backLabel ?? DEFAULT_EVENT_LISTING.backLabel;
  const shareLabel = copy.shareLabel ?? DEFAULT_EVENT_LISTING.shareLabel;
  const reserveLabel = event.reserveLabel;
  const reserveHref = event.reserveHref;

  return (
    <main>
      <Section py={{ base: "10", md: "12", xl: "16" }}>
        <Container>
          <VStack gap="10" align="stretch">
            <Link
              href="/eventos"
              display="inline-flex"
              alignItems="center"
              gap="3"
              color="fg.muted"
              fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
              _hover={{ color: "primary" }}
              alignSelf="flex-start"
            >
              <ChevronLeftIcon />
              <Text as="span">{backLabel}</Text>
            </Link>

            {/* Mobile / tablet: title → image → share → body → CTA */}
            <VStack
              display={{ base: "flex", lg: "none" }}
              gap="5"
              align="stretch"
            >
              <Text
                as="h1"
                textStyle="h4"
                fontSize="xl"
                color="fg"
                textTransform="uppercase"
              >
                {event.title}
              </Text>

              <Box
                position="relative"
                w="full"
                aspectRatio="400/560"
                bg="#DADADA"
                overflow="hidden"
              >
                {event.imageSrc ? (
                  <Image
                    src={event.imageSrc}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : null}
              </Box>

              <ShareButton title={event.title} label={shareLabel} />

              <VStack align="stretch" gap="5" pt="5">
                {event.description ? (
                  <Text color="fg" fontSize={BODY_FONT_SIZE} lineHeight="1.6">
                    {event.description}
                  </Text>
                ) : null}
                <RichTextContent
                  data={event.body}
                  color="fg"
                  fontSize={BODY_FONT_SIZE}
                  lineHeight="1.6"
                />
              </VStack>

              <Link
                href={reserveHref}
                bg="primary"
                color="grayLight"
                px="8"
                py="4"
                borderRadius="6px"
                boxShadow={RESERVE_BUTTON_SHADOW}
                textStyle="button"
                fontSize={{ base: "md", md: "body.md" }}
                textTransform="uppercase"
                alignSelf="flex-start"
                _hover={{ opacity: 0.9 }}
              >
                {reserveLabel}
              </Link>
            </VStack>

            {/* Desktop: image | title+share, body, CTA */}
            <Flex
              display={{ base: "none", lg: "flex" }}
              direction="row"
              gap={{ lg: "12", xl: "60px" }}
              align="flex-start"
            >
              <Box
                position="relative"
                w={{ lg: "400px", xl: "520px" }}
                flexShrink={0}
                aspectRatio={{ lg: "400/540", xl: "520/700" }}
                bg="#DADADA"
                overflow="hidden"
              >
                {event.imageSrc ? (
                  <Image
                    src={event.imageSrc}
                    alt={event.title}
                    fill
                    sizes="(max-width: 1535px) 400px, 520px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                ) : null}
              </Box>

              <VStack
                align="stretch"
                gap={{ lg: "10", xl: "60px" }}
                flex="1"
                minW={0}
                maxW={{ lg: "640px", xl: "740px" }}
              >
                <Flex
                  justify="space-between"
                  align="center"
                  gap="4"
                  wrap="wrap"
                >
                  <Text
                    as="h1"
                    textStyle="h4"
                    fontSize={{ lg: "2xl", xl: "display.h3" }}
                    color="fg"
                    textTransform="uppercase"
                  >
                    {event.title}
                  </Text>
                  <ShareButton title={event.title} label={shareLabel} />
                </Flex>

                <VStack align="stretch" gap={{ lg: "8", xl: "10" }}>
                  {event.description ? (
                    <Text color="fg" fontSize={BODY_FONT_SIZE} lineHeight="1.6">
                      {event.description}
                    </Text>
                  ) : null}
                  <RichTextContent
                    data={event.body}
                    color="fg"
                    fontSize={BODY_FONT_SIZE}
                    lineHeight="1.6"
                  />
                </VStack>

                <Link
                  href={reserveHref}
                  bg="primary"
                  color="grayLight"
                  px="8"
                  py="4"
                  borderRadius="6px"
                  boxShadow={RESERVE_BUTTON_SHADOW}
                  textStyle="button"
                  fontSize={{ lg: "body.md", xl: "body.lg" }}
                  textTransform="uppercase"
                  alignSelf="flex-start"
                  _hover={{ opacity: 0.9 }}
                >
                  {reserveLabel}
                </Link>
              </VStack>
            </Flex>
          </VStack>
        </Container>
      </Section>

      <CTASection
        heading={cta?.heading}
        buttonText={cta?.buttonText}
        href={cta?.href ?? reserveHref}
      />
      <FAQSection id="faq-eventos" heading={faq?.heading} items={faq?.items} />
      <Footer />
    </main>
  );
}
