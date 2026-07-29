"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

export function ProductImageGallery({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc?: string;
}) {
  const slots = imageSrc
    ? [imageSrc, ...Array.from({ length: 7 }, () => null)]
    : Array.from({ length: 8 }, () => null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSrc = slots[activeIndex] ?? imageSrc;

  return (
    <VStack
      align="stretch"
      gap="4"
      w={{ base: "full", lg: "316px" }}
      flexShrink={0}
    >
      <Box
        bg="#DADADA"
        w="full"
        maxW={{ base: "full", lg: "316px" }}
        h={{ base: "320px", md: "350px", lg: "370px" }}
        position="relative"
        mx={{ base: "auto", lg: "0" }}
        overflow="hidden"
      >
        {activeSrc ? (
          <Image
            src={activeSrc}
            alt={name}
            fill
            sizes="(max-width: 991px) 100vw, 316px"
            style={{ objectFit: "cover" }}
          />
        ) : null}
        <Box
          position="absolute"
          top="5"
          left="5"
          bg="primary"
          px="5"
          py="2"
          transform="rotate(-5.22deg)"
          zIndex={1}
        >
          <Text
            fontFamily="heading.molot"
            fontSize="2xl"
            color="dark"
            textTransform="uppercase"
            lineHeight="1"
          >
            {name}
          </Text>
        </Box>
      </Box>

      <Grid
        templateColumns="repeat(4, 1fr)"
        gap="2"
        w="full"
        maxW={{ lg: "316px" }}
      >
        {slots.map((src, index) => (
          <Box
            key={index}
            as="button"
            aria-label={`Imagem ${index + 1}`}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            bg="#DADADA"
            aspectRatio="1"
            position="relative"
            overflow="hidden"
            borderWidth="2px"
            borderColor={activeIndex === index ? "primary" : "transparent"}
            cursor={src || imageSrc ? "pointer" : "default"}
            opacity={src || imageSrc ? 1 : 0.6}
          >
            {src ? (
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Box
                position="absolute"
                inset="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="fg.muted"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M8 11l3 3 5-6" />
                </svg>
              </Box>
            )}
          </Box>
        ))}
      </Grid>
    </VStack>
  );
}
