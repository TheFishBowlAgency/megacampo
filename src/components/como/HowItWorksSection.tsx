"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { STEP_NUMBER_CHIP_MASK } from "@/components/ui/tornChipMask";
import { Container, Section } from "@/components/layout";

export type HowItWorksStep = {
  stepNumber: number;
  stepLabel: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
  /** Figma illustration — supplied in code, not CMS */
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
        fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
      >
        {step.stepLabel}
      </Text>
      <Text
        fontWeight="semibold"
        color="fg"
        textTransform="uppercase"
        fontSize={{ base: "lg", md: "xl", lg: "xl", xl: "2xl" }}
      >
        {step.title}
      </Text>
      <Text
        color="fg"
        fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
      >
        {step.description}
      </Text>
      <Link
        href={step.href}
        color="fg.muted"
        fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
        _hover={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
      >
        {step.linkText}
      </Link>
    </VStack>
  );
}

function StepNumberBadge({
  number,
  size = { base: "60px", md: "80px", lg: "100px", xl: "140px" },
}: {
  number: number;
  size?: { base?: string; md?: string; lg?: string; xl?: string };
}) {
  return (
    <Box
      bg="fg"
      color="primary"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      w={size}
      h={size}
      userSelect="none"
      style={STEP_NUMBER_CHIP_MASK}
    >
      <Text
        fontFamily="heading.molot"
        fontSize={{ base: "2rem", md: "2.5rem", lg: "3.5rem", xl: "5rem" }}
        fontWeight="400"
        lineHeight="1"
        color="primary"
      >
        {number}
      </Text>
    </Box>
  );
}

/* ── Desktop step ──────────────────────────────────────────────────────────── */

const BADGE_SIZE_MD = "80px";
const BADGE_SIZE_LG = "100px";
const BADGE_SIZE_XL = "140px";
const ICON_SIZE_MD = "140px";
const ICON_SIZE_LG = "180px";
const ICON_SIZE_XL = "240px";
const DOT_SIZE = 50;

function StepIconFrame({
  icon,
  size,
}: {
  icon: React.ReactNode;
  size: { base?: string; md?: string; lg?: string; xl?: string } | string;
}) {
  return (
    <Box
      w={size}
      h={size}
      flexShrink={0}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {icon}
    </Box>
  );
}

function DesktopStep({
  step,
  isLeft,
}: {
  step: HowItWorksStep;
  isLeft: boolean;
}) {
  return (
    <Flex alignItems="flex-start">
      {/* Left column */}
      <Box flex="1">
        {isLeft ? (
          <Box>
            <Flex alignItems="center">
              <StepNumberBadge
                number={step.stepNumber}
                size={{
                  md: BADGE_SIZE_MD,
                  lg: BADGE_SIZE_LG,
                  xl: BADGE_SIZE_XL,
                }}
              />
              <Box flex="1" h="2px" bg="fg.muted" />
            </Flex>
            <Box pr={{ md: "40px", lg: "50px", xl: "70px" }} pt="4">
              <StepContent step={step} align="right" />
            </Box>
          </Box>
        ) : (
          <Flex align="center" justify="center" minH="200px">
            <StepIconFrame
              icon={step.icon}
              size={{
                md: ICON_SIZE_MD,
                lg: ICON_SIZE_LG,
                xl: ICON_SIZE_XL,
              }}
            />
          </Flex>
        )}
      </Box>

      {/* Center dot column — sits on the vertical line */}
      <Flex
        flexShrink={0}
        w={`${DOT_SIZE}px`}
        justifyContent="center"
        pt={{
          md: `${(parseInt(BADGE_SIZE_MD) - DOT_SIZE) / 2}px`,
          lg: `${(parseInt(BADGE_SIZE_LG) - DOT_SIZE) / 2}px`,
          xl: `${(parseInt(BADGE_SIZE_XL) - DOT_SIZE) / 2}px`,
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
              <StepNumberBadge
                number={step.stepNumber}
                size={{
                  md: BADGE_SIZE_MD,
                  lg: BADGE_SIZE_LG,
                  xl: BADGE_SIZE_XL,
                }}
              />
            </Flex>
            <Box pl={{ md: "40px", lg: "50px", xl: "70px" }} pt="4">
              <StepContent step={step} align="left" />
            </Box>
          </Box>
        ) : (
          <Flex align="center" justify="center" minH="200px">
            <StepIconFrame
              icon={step.icon}
              size={{
                md: ICON_SIZE_MD,
                lg: ICON_SIZE_LG,
                xl: ICON_SIZE_XL,
              }}
            />
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
        <StepNumberBadge number={step.stepNumber} size={{ base: "60px" }} />
      </Flex>

      <Box pl="40px" pt="3">
        <StepContent step={step} align="left" />
      </Box>

      <Box pl="40px" pt="4">
        <StepIconFrame icon={step.icon} size="100px" />
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
          mb={{ base: "8", md: "10", lg: "12", xl: "16" }}
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

          <VStack gap={{ md: "12", lg: "16", xl: "24" }} align="stretch">
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
