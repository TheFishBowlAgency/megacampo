import { Box, Grid, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";
import { TORN_CHIP_MASK } from "@/components/ui/tornChipMask";

export interface ProductHighlight {
  label: string;
}

export interface ProductHighlightStripProps {
  highlights: ProductHighlight[];
}

/**
 * Compact torn-edge chips for activity/category package pages.
 */
export function ProductHighlightStrip({
  highlights,
}: ProductHighlightStripProps) {
  const desktopColumns = Math.min(Math.max(highlights.length, 1), 5);

  return (
    <Box bg="white" py={{ base: "8", md: "10", lg: "12" }}>
      <Container>
        <Grid
          templateColumns={{
            base: "repeat(2, minmax(0, 1fr))",
            lg: `repeat(${desktopColumns}, 223px)`,
          }}
          gap={{ base: "5", md: "6", lg: "50px" }}
          justifyContent="center"
          justifyItems="stretch"
        >
          {highlights.map(({ label }, index) => {
            const isLastOddOnMobile =
              highlights.length % 2 === 1 && index === highlights.length - 1;

            return (
              <Box
                key={label}
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH={{ base: "60px", lg: "70px" }}
                px={{ base: "3", md: "4" }}
                py={{ base: "2", md: "2.5" }}
                bg="bg"
                style={TORN_CHIP_MASK}
                gridColumn={{
                  base: isLastOddOnMobile ? "1 / -1" : "auto",
                  lg: "auto",
                }}
                w={{
                  base: isLastOddOnMobile ? "calc(50% - 0.625rem)" : "full",
                  lg: "full",
                }}
                justifySelf={{
                  base: isLastOddOnMobile ? "center" : "stretch",
                  lg: "stretch",
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
