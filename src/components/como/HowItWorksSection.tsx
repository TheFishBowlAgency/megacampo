"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
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

/* ── Subcomponents ─────────────────────────────────────────────────────────── */

function TimelineDot({ size = "md" }: { size?: "sm" | "md" }) {
  const outer = size === "sm" ? "30px" : "50px";
  const inner = size === "sm" ? "14px" : "28px";

  return (
    <Box
      w={outer}
      h={outer}
      borderRadius="full"
      border="2px solid"
      borderColor="fg"
      bg="bg.subtle"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      zIndex={1}
    >
      <Box w={inner} h={inner} borderRadius="full" bg="fg" />
    </Box>
  );
}

function StepContent({
  step,
  align = "left",
}: {
  step: HowItWorksStep;
  align?: "left" | "right";
}) {
  return (
    <VStack
      align={align === "right" ? "end" : "start"}
      gap="3.5"
      textAlign={align}
    >
      <Text
        fontWeight="extrabold"
        color="fg.muted"
        textTransform="uppercase"
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
      >
        {step.stepLabel}
      </Text>
      <Text
        fontWeight="semibold"
        color="fg"
        textTransform="uppercase"
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
      >
        {step.title}
      </Text>
      <Text color="fg" fontSize={{ base: "sm", md: "md", lg: "lg" }}>
        {step.description}
      </Text>
      <Link
        href={step.href}
        color="fg.muted"
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        _hover={{ textDecoration: "underline" }}
      >
        {step.linkText}
      </Link>
    </VStack>
  );
}

function StepNumberBadge({ number }: { number: number }) {
  return (
    <Text
      fontFamily="heading"
      fontSize={{ base: "6rem", md: "8rem", lg: "11rem" }}
      fontWeight="400"
      color="fg"
      lineHeight="1"
      userSelect="none"
      opacity={0.08}
    >
      {number}
    </Text>
  );
}

/* ── Desktop step ──────────────────────────────────────────────────────────── */

const ICON_SIZE_MD = "100px";
const ICON_SIZE_LG = "140px";
const DOT_SIZE = 50;

function DesktopStep({
  step,
  isLeft,
}: {
  step: HowItWorksStep;
  isLeft: boolean;
}) {
  const iconSize = { md: ICON_SIZE_MD, lg: ICON_SIZE_LG };

  return (
    <Flex alignItems="flex-start">
      {/* Left column */}
      <Box flex="1">
        {isLeft ? (
          <Box>
            <Flex alignItems="center">
              <Box
                w={iconSize}
                h={iconSize}
                flexShrink={0}
                color="fg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {step.icon}
              </Box>
              <Box flex="1" h="2px" bg="fg.muted" />
            </Flex>
            <Box pr={{ md: "50px", lg: "70px" }} pt="4">
              <StepContent step={step} align="right" />
            </Box>
          </Box>
        ) : (
          <Flex align="center" justify="center" minH="200px">
            <StepNumberBadge number={step.stepNumber} />
          </Flex>
        )}
      </Box>

      {/* Center dot column — sits on the vertical line */}
      <Flex
        flexShrink={0}
        w={`${DOT_SIZE}px`}
        justifyContent="center"
        pt={{
          md: `${(parseInt(ICON_SIZE_MD) - DOT_SIZE) / 2}px`,
          lg: `${(parseInt(ICON_SIZE_LG) - DOT_SIZE) / 2}px`,
        }}
      >
        <TimelineDot />
      </Flex>

      {/* Right column */}
      <Box flex="1">
        {!isLeft ? (
          <Box>
            <Flex alignItems="center">
              <Box flex="1" h="2px" bg="fg.muted" />
              <Box
                w={iconSize}
                h={iconSize}
                flexShrink={0}
                color="fg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {step.icon}
              </Box>
            </Flex>
            <Box pl={{ md: "50px", lg: "70px" }} pt="4">
              <StepContent step={step} align="left" />
            </Box>
          </Box>
        ) : (
          <Flex align="center" justify="center" minH="200px">
            <StepNumberBadge number={step.stepNumber} />
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

/* ── Mobile step ───────────────────────────────────────────────────────────── */

function MobileStep({ step }: { step: HowItWorksStep }) {
  return (
    <Box>
      <Flex align="center">
        <TimelineDot size="sm" />
        <Box flex="1" h="2px" bg="fg.muted" />
        <Box
          w="60px"
          h="60px"
          flexShrink={0}
          color="fg"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {step.icon}
        </Box>
      </Flex>

      <Box pl="40px" pt="3">
        <StepContent step={step} align="left" />
      </Box>

      <Box pl="40px" pt="2">
        <StepNumberBadge number={step.stepNumber} />
      </Box>
    </Box>
  );
}

/* ── Main section ──────────────────────────────────────────────────────────── */

/**
 * "How it works" section with a vertical timeline. Desktop: alternating
 * left/right layout with center vertical line, connecting dots and decorative
 * step numbers. Mobile: left-aligned single-column timeline.
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
          textAlign="center"
          mb={{ base: "8", md: "12", lg: "16" }}
        >
          {heading}
        </Text>

        {/* Desktop / tablet timeline (md+) */}
        <Box display={{ base: "none", md: "block" }} position="relative">
          <Box
            position="absolute"
            left="50%"
            top="0"
            bottom="0"
            w="3px"
            bg="fg"
            transform="translateX(-50%)"
          />

          <VStack gap={{ md: "6", lg: "8" }} align="stretch">
            {steps.map((step, index) => (
              <DesktopStep
                key={step.stepNumber}
                step={step}
                isLeft={index % 2 === 0}
              />
            ))}
          </VStack>
        </Box>

        {/* Mobile timeline */}
        <Box display={{ base: "block", md: "none" }} position="relative">
          <Box
            position="absolute"
            left="14px"
            top="0"
            bottom="0"
            w="2px"
            bg="fg"
          />

          <VStack gap="12" align="stretch">
            {steps.map((step) => (
              <MobileStep key={step.stepNumber} step={step} />
            ))}
          </VStack>
        </Box>
      </Container>
    </Section>
  );
}
