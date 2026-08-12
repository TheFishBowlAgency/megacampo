import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { bannerSectionUnderlayBefore } from "@/components/layout/bannerUnderlay";
import type { HomeContent } from "@/lib/home/types";
import { BUTTON_SHADOW } from "@/lib/ui/buttonShadow";

type HeroProps = {
  content: HomeContent["hero"];
};

export function Hero({ content }: HeroProps) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="bg.hero"
      color="grayLight"
      py={{ base: "16", md: "20", lg: "24", xl: "28" }}
      minH={{ base: "561px", md: "640px" }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      _before={bannerSectionUnderlayBefore(content.backgroundImageSrc)}
    >
      <VStack
        position="relative"
        zIndex={1}
        gap={{ base: "8", md: "10", lg: "12", xl: "16" }}
        textAlign="center"
        maxW={{ base: "100%", md: "900px", xl: "1758px" }}
        mx="auto"
        px={{ base: "5", md: "8" }}
      >
        <VStack gap={{ base: "5", md: "8" }}>
          <Text
            as="h1"
            textStyle="h1.molot"
            fontSize="display.h1"
            lineHeight="1"
            textTransform="uppercase"
            color="grayLight"
          >
            {content.heading}
          </Text>
          <Text
            textStyle="lead"
            fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
            color="grayLight"
            maxW={{ base: "400px", md: "600px", xl: "800px" }}
          >
            {content.description}
          </Text>
        </VStack>
        <Link
          href={content.cta.href}
          bg="primary"
          color="grayLight"
          px="8"
          py="4"
          textStyle="button"
          fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
          textTransform="uppercase"
          borderRadius="md"
          boxShadow={BUTTON_SHADOW}
          _hover={{ opacity: 0.9 }}
        >
          {content.cta.label}
        </Link>
      </VStack>
    </Box>
  );
}
