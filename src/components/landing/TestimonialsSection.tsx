"use client";

import {
  Box,
  Grid,
  HStack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Container, Section } from "@/components/layout";
import { DEFAULT_HOME } from "@/lib/home/defaults";
import type { GalleryImage } from "@/lib/home/types";

type TestimonialsSectionProps = {
  heading: string;
  subheading: string;
  images?: GalleryImage[];
  prevLabel?: string;
  nextLabel?: string;
};

export function TestimonialsSection({
  heading,
  subheading,
  images,
  prevLabel = DEFAULT_HOME.testimonials.prevLabel,
  nextLabel = DEFAULT_HOME.testimonials.nextLabel,
}: TestimonialsSectionProps) {
  const gallery =
    images && images.length > 0 ? images : DEFAULT_HOME.testimonials.images;
  const [index, setIndex] = useState(0);

  const visibleCount = useBreakpointValue({ base: 1, md: 2, lg: 4 }) ?? 1;
  const maxIndex = Math.max(0, gallery.length - visibleCount);
  const safeIndex =
    maxIndex === 0
      ? 0
      : ((index % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
  const canRotate = maxIndex > 0;

  const goPrev = () => {
    if (!canRotate) return;
    setIndex(safeIndex === 0 ? maxIndex : safeIndex - 1);
  };

  const goNext = () => {
    if (!canRotate) return;
    setIndex(safeIndex >= maxIndex ? 0 : safeIndex + 1);
  };

  const visibleImages = gallery
    .slice(safeIndex, safeIndex + visibleCount)
    .map((image, offset) => ({
      image,
      key: `${image.src}-${safeIndex + offset}`,
    }));

  return (
    <Section variant="default">
      <Container>
        <VStack gap={{ base: "6", md: "8", lg: "12", xl: "16" }}>
          <VStack
            gap={{ base: "3", md: "4", lg: "6", xl: "8" }}
            textAlign="center"
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
              textStyle="lead"
              fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
              color="fg"
              maxW={{ base: "400px", md: "560px", xl: "720px" }}
              mx="auto"
            >
              {subheading}
            </Text>
          </VStack>

          <VStack w="full" gap={{ base: "8", lg: "12", xl: "16" }}>
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={{ base: "4", md: "5" }}
              w="full"
            >
              {visibleImages.map(({ image, key }) => (
                <Box
                  key={key}
                  position="relative"
                  w="full"
                  aspectRatio="315/428"
                  bg="gray.300"
                  overflow="hidden"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Grid>

            <HStack
              w="full"
              justify={{ base: "center", lg: "space-between" }}
              gap={{ base: "10", lg: "0" }}
            >
              <CarouselArrowButton
                label={prevLabel}
                onClick={goPrev}
                disabled={!canRotate}
              >
                <ChevronLeftIcon />
              </CarouselArrowButton>
              <CarouselArrowButton
                label={nextLabel}
                onClick={goNext}
                disabled={!canRotate}
              >
                <ChevronRightIcon />
              </CarouselArrowButton>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Section>
  );
}

function CarouselArrowButton({
  label,
  onClick,
  disabled = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <Box
      as="button"
      aria-label={label}
      aria-disabled={disabled}
      w={{ base: "40px", lg: "60px" }}
      h={{ base: "40px", lg: "60px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={disabled ? "not-allowed" : "pointer"}
      flexShrink={0}
      bg={disabled ? "bg" : "primary"}
      color="grayLight"
      borderRadius="md"
      pointerEvents={disabled ? "none" : "auto"}
      _hover={disabled ? undefined : { opacity: 0.9 }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="33"
      height="20"
      viewBox="0 0 33 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ width: "55%", height: "auto" }}
    >
      <path d="M31 10H3M3 10L12 2M3 10L12 18" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="33"
      height="20"
      viewBox="0 0 33 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ width: "55%", height: "auto" }}
    >
      <path d="M2 10H30M30 10L21 2M30 10L21 18" />
    </svg>
  );
}
