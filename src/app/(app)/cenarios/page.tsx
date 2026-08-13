import { Box, Grid } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { ScenarioCard, SectionHeading } from "@/components/cenarios";
import { Container, PageHero } from "@/components/layout";
import { getCenarios } from "@/lib/cenarios/getCenarios";
import { getRequestLocale } from "@/i18n/site";

export default async function CenariosPage() {
  const locale = await getRequestLocale();
  const cenarios = await getCenarios(locale);

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={cenarios.hero.heading}
          subtitle={cenarios.hero.description}
          backgroundImageSrc={cenarios.hero.backgroundImageSrc}
          textAlign={{ base: "center", lg: "right" }}
          align={{ base: "center", lg: "flex-end" }}
          subtitleFontSize={{
            base: "md",
            lg: "xl",
            xl: "display.h3",
          }}
        />

        <Box bg="#fff" py={{ base: "10", lg: "14", xl: "16" }}>
          <Container>
            <SectionHeading
              title={cenarios.section.heading}
              description={cenarios.section.description}
              descriptionVariant="lead"
            />
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              columnGap={{ base: "2.5", lg: "4", xl: "5" }}
              rowGap={{ base: "8", lg: "10", xl: "16" }}
            >
              {cenarios.scenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  name={scenario.title}
                  imageSrc={scenario.imageSrc}
                  href={scenario.href}
                />
              ))}
            </Grid>
          </Container>
        </Box>

        <Footer />
      </main>
    </>
  );
}
