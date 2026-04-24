import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import { Container, Section } from '@/components/layout';
import { ActivityLinkCard } from '@/components/ui';
import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from '@/data/activityCardMedia';

const ACTIVITIES = [
  {
    id: 'paintball',
    title: 'PAINTBALL',
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    imageAlt: 'Jogadores de paintball em cenário ao ar livre',
    features: [
      'Inclui todo o material (marcadora + equipamento)',
      'Caixas de munições ilimitadas',
      'Cenários de jogo variados e divertidos',
    ],
    minAge: '+10 anos',
  },
  {
    id: 'soft-paintball',
    title: 'SOFT PAINTBALL',
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    imageAlt: 'Equipa em atividade de soft paintball',
    features: [
      'Não magoa, ideal para todos os públicos',
      'Pinturas laváveis e biodegradáveis',
      'Poderás trazer comida e bebida!',
    ],
    minAge: '+5 anos',
  },
  {
    id: 'cooperacao',
    title: 'JOGOS DE COOPERAÇÃO',
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
    imageAlt: 'Grupo em jogos de equipa e cooperação',
    features: [
      'Promove o espírito de equipa e liderança',
      'Ideal para grupos com objetivos específicos',
      'Duração adaptável + monitores',
    ],
    minAge: '+10 anos',
  },
];

const HEADING = 'Qual a atividade certa para a tua empresa?';
const SUBHEADING =
  'Desde paintball a jogos de equipa, temos o formato ideal para o teu evento. Escolhe a atividade e consulta os pacotes disponíveis.';

export function ActivityChoiceSection() {
  return (
    <Section>
      <Container>
        <VStack gap={{ base: '8', md: '10', lg: '12' }} align="stretch">
          <VStack gap="2" textAlign="center">
            <Text as="h2" textStyle="h2" color="fg">
              {HEADING}
            </Text>
            <Text
              textStyle="body"
              color="fg.muted"
              maxW="2xl"
              mx="auto"
              fontSize={{ base: 'md', md: 'body.lg' }}
            >
              {SUBHEADING}
            </Text>
          </VStack>
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={{ base: '4', md: '6' }}
            w="full"
            alignItems="stretch"
          >
            {ACTIVITIES.map((activity) => (
              <Box
                key={activity.id}
                as="article"
                h="full"
                minH="0"
                display="flex"
                flexDirection="column"
              >
                <ActivityLinkCard
                  href="#pacotes"
                  imageSrc={activity.imageSrc}
                  imageAlt={activity.imageAlt}
                  tag={activity.title}
                  footerTitle={activity.title}
                  features={activity.features}
                  ageNote={activity.minAge}
                />
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
