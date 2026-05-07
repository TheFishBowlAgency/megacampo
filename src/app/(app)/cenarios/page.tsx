import { Box, Grid } from '@chakra-ui/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/landing';
import { PageHero, ScenarioCard, SectionHeading } from '@/components/cenarios';
import { Container } from '@/components/layout';
import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from '@/data/activityCardMedia';

const SCENARIO_PLACEHOLDER_IMAGES = [
  ACTIVITY_CARD_IMAGE_PAINTBALL,
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
] as const;

const HERO_TITLE = ['MAPAS', 'MUNDIALMENTE', 'FAMOSOS'];
const HERO_SUBTITLE =
  'Experiência 12 mapas em 40 hectares de cenários imersivos!';

const SECTION_TITLE = 'CADA MAPA UMA AVENTURA';
const SECTION_DESCRIPTION =
  'De aniversários a grandes eventos de empresa, temos experiências à medida para o teu grupo!';

const SCENARIOS = [
  'IRAQUE',
  'WILD WEST',
  'FORTE APACHE',
  'VIETNAME',
  'STONEHENGE',
  'TRINCHEIRAS',
  'TEMPLO PERDIDO',
  'BIDDONBALL',
  'CONGO',
  "SUP'AIR BALL",
  "SUP'AIR BALL 2",
  'DESERTO',
];

export default function CenariosPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title={HERO_TITLE} subtitle={HERO_SUBTITLE} />

        <Box bg="bg" py={{ base: '10', md: '14', lg: '16' }}>
          <Container>
            <SectionHeading
              title={SECTION_TITLE}
              description={SECTION_DESCRIPTION}
            />
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={{ base: '8', md: '8', lg: '10' }}
            >
              {SCENARIOS.map((name, index) => (
                <ScenarioCard
                  key={name}
                  name={name}
                  imageSrc={SCENARIO_PLACEHOLDER_IMAGES[index % 3]}
                  href={`#${name.toLowerCase().replace(/\s|'/g, '-')}`}
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
