import { Box, Flex, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import type { HomeContent } from "@/lib/home/types";

type KeyFeaturesProps = {
  items: HomeContent["keyFeatures"]["items"];
};

export function KeyFeatures({ items }: KeyFeaturesProps) {
  return (
    <Box py={{ base: "8", md: "10" }}>
      <Container>
        <Flex
          flexWrap="wrap"
          gap={{ base: "3", md: "4", lg: "4", xl: "5" }}
          justifyContent="center"
        >
          {items.map((label) => (
            <Box
              key={label}
              position="relative"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={{ base: "5", md: "4", lg: "3" }}
              py={{ base: "2", md: "3" }}
              minW={{ base: "160px", md: "180px", lg: "180px", xl: "200px" }}
              minH={{ base: "50px", md: "60px", lg: "60px", xl: "70px" }}
            >
              <Box
                position="absolute"
                inset="0"
                border="2px solid"
                borderColor="dark"
                transform="skewX(-8deg)"
                borderRadius="sm"
              />
              <Text
                fontFamily="heading.molot"
                fontSize={{ base: "xs", md: "sm", lg: "md", xl: "body.lg" }}
                fontWeight="normal"
                textAlign="center"
                color="dark"
                textTransform="uppercase"
                lineHeight="1.2"
                position="relative"
                zIndex="1"
              >
                {label}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}
