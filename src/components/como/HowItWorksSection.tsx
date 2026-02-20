"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { Container, Section } from "@/components/layout";

export type HowItWorksStep = {
  stepNumber: number;
  stepLabel: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  icon: React.ReactNode;
};

export type HowItWorksSectionProps = {
  heading?: string;
  steps: HowItWorksStep[];
};

/**
 * Reusable "How it works" timeline section: section title + alternating step rows
 * with number, label, title, description, link and icon. Desktop: 2-col alternating;
 * tablet/mobile: single column.
 */
export function HowItWorksSection({
  heading = "COMO FUNCIONA?",
  steps,
}: HowItWorksSectionProps) {
  return (
    <Section variant="subtle">
      <Container>
        <Text
          as="h2"
          textStyle="h2"
          color="fg"
          textTransform="uppercase"
          textAlign={{ base: "left", md: "center" }}
          mb={{ base: "8", md: "12", lg: "14" }}
        >
          {heading}
        </Text>

        <VStack gap={{ base: "10", md: "12", lg: "16" }} align="stretch">
          {steps.map((step, index) => {
            const isReversed = index % 2 === 1;
            return (
              <Grid
                key={step.stepNumber}
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={{ base: "6", md: "10", lg: "12" }}
                alignItems={{ base: "stretch", md: "center" }}
              >
                {/* Content block: number, label, title, description, link — gridColumn swaps on md when reversed */}
                <Box gridColumn={{ base: "1", md: isReversed ? "2" : "1" }}>
                  <VStack
                    align={{
                      base: "stretch",
                      md: isReversed ? "end" : "start",
                    }}
                    gap="3"
                    textAlign={{
                      base: "left",
                      md: isReversed ? "right" : "left",
                    }}
                  >
                    <Box
                      w="12"
                      h="12"
                      bg="bg.dark"
                      color="primary"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textStyle="h2"
                      fontSize="xl"
                      flexShrink={0}
                    >
                      {step.stepNumber}
                    </Box>
                    <Text
                      fontSize="sm"
                      fontWeight="semibold"
                      color="fg.muted"
                      textTransform="uppercase"
                    >
                      {step.stepLabel}
                    </Text>
                    <Text textStyle="h5" color="fg" textTransform="uppercase">
                      {step.title}
                    </Text>
                    <Text textStyle="body" color="fg.muted" fontSize="md">
                      {step.description}
                    </Text>
                    <Link
                      href={step.href}
                      color="primary"
                      fontWeight="semibold"
                      _hover={{ textDecoration: "underline" }}
                    >
                      {step.linkText}
                    </Link>
                  </VStack>
                </Box>

                {/* Icon */}
                <Box gridColumn={{ base: "1", md: isReversed ? "1" : "2" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "center" }}
                    color="fg"
                    style={{ minHeight: 120 }}
                  >
                    <Box
                      as="span"
                      w="clamp(80px, 15vw, 160px)"
                      h="auto"
                      display="block"
                    >
                      {step.icon}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </VStack>
      </Container>
    </Section>
  );
}
