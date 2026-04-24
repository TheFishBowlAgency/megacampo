'use client';

import { Grid, Text, VStack } from '@chakra-ui/react';
import { ActivityHoverCard, Link } from '@/components/ui';
import { Container, Section } from '@/components/layout';
import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from '@/data/activityCardMedia';

const ADVENTURES: Array<{
  title: string;
  tag: string;
  age: string;
  description: string;
  href: string;
  imageSrc?: string;
}> = [
  {
    title: 'PAINTBALL .68CAL',
    tag: 'PAINTBALL',
    age: '+12 Anos',
    description:
      'Vive a experiência do paintball clássico com marcadoras .68cal. Jogos intensos em cenários cinematográficos.',
    href: '/atividades/paintball',
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
  },
  {
    title: 'AIRSOFT',
    tag: 'AIRSOFT',
    age: '+16 Anos',
    description:
      'Simulação militar com réplicas de airsoft. Estratégia e trabalho de equipa em cenários realistas.',
    href: '/atividades/airsoft',
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
  },
  {
    title: 'PAINTBALL .50CAL',
    tag: 'SOFT PAINTBALL',
    age: '+9 Anos',
    description:
      'Paintball com bolas mais pequenas e menos impacto. Ideal para os mais novos e iniciantes.',
    href: '/atividades/soft-paintball',
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
  },
  {
    title: 'LASERTAG',
    tag: 'LASER TAG',
    age: '+5 Anos',
    description:
      'Diversão sem impacto! Lasertag ao ar livre para toda a família nos nossos cenários.',
    href: '/atividades/lasertag',
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
  },
];

export function AdventureSection() {
  return (
    <Section id="actividades">
      <Container>
        <VStack gap={{ base: '6', md: '10', lg: '16' }}>
          <Text
            as="h2"
            textStyle="h2"
            fontSize={{ base: 'xl', md: '2xl', lg: 'display.h2' }}
            textAlign="center"
            color="fg"
            textTransform="uppercase"
          >
            ESCOLHE A TUA AVENTURA
          </Text>

          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={{ base: '4', md: '5' }}
            w="full"
          >
            {ADVENTURES.map((item) => (
              <ActivityHoverCard
                key={item.title}
                imageSrc={item.imageSrc}
                imageAlt={item.title}
                tag={item.tag}
                title={item.title}
                subtitle={item.age}
                description={item.description}
                href={item.href}
              />
            ))}
          </Grid>

          <Link
            href="/atividades"
            bg="primary"
            color="grayLight"
            px="8"
            py="4"
            textStyle="button"
            fontSize={{ base: 'md', lg: 'body.lg' }}
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ opacity: 0.9 }}
          >
            VER TODAS
          </Link>
        </VStack>
      </Container>
    </Section>
  );
}
