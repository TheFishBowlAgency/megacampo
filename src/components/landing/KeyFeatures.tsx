import { Box, Grid, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import { TORN_CHIP_MASK } from "@/components/ui/tornChipMask";
import type { HomeContent } from "@/lib/home/types";

type KeyFeaturesProps = {
  items: HomeContent["keyFeatures"]["items"];
};

export function KeyFeatures({ items }: KeyFeaturesProps) {
  return (
    <Box bg="white" py={{ base: "8", md: "10", lg: "12" }}>
      <Container>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: `repeat(${Math.min(items.length, 5)}, minmax(0, 1fr))`,
          }}
          gap={{ base: "5", md: "6", lg: "50px" }}
        >
          {items.map((label, index) => {
            const isLastOddOnMobile =
              items.length % 2 === 1 && index === items.length - 1;

            return (
              <Box
                key={label}
                display="flex"
                alignItems="center"
                justifyContent="center"
                px={{ base: "4", md: "5", lg: "6" }}
                py={{ base: "2", md: "2.5" }}
                minH={{ base: "60px", md: "64px", lg: "70px" }}
                bg="bg"
                style={TORN_CHIP_MASK}
                gridColumn={{
                  base: isLastOddOnMobile ? "1 / -1" : "auto",
                  md: "auto",
                }}
                w={{
                  base: isLastOddOnMobile ? "calc(50% - 0.625rem)" : "full",
                  md: "full",
                }}
                justifySelf={{
                  base: isLastOddOnMobile ? "center" : "stretch",
                  md: "stretch",
                }}
              >
                <Text
                  fontFamily="heading.molot"
                  fontSize={{ base: "xs", md: "sm", lg: "md", xl: "body.lg" }}
                  fontWeight="normal"
                  textAlign="center"
                  color="fg"
                  textTransform="uppercase"
                  lineHeight="1.2"
                >
                  {label}
                </Text>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
