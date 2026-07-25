import { Box, Grid } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { PageHero, ScenarioCard, SectionHeading } from "@/components/cenarios";
import { Container } from "@/components/layout";
import { getCenarios } from "@/lib/cenarios/getCenarios";

export default async function CenariosPage() {
  const cenarios = await getCenarios();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={cenarios.hero.heading}
          subtitle={cenarios.hero.description}
        />

        <Box bg="bg" py={{ base: "10", md: "14", lg: "16" }}>
          <Container>
            <SectionHeading
              title={cenarios.section.heading}
              description={cenarios.section.description}
            />
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={{ base: "8", md: "8", lg: "10" }}
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
