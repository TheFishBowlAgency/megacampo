import { Box, Grid, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { Link } from '@/components/ui';
import { Container, Section } from '@/components/layout';
import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from '@/data/activityCardMedia';

const EVENTS = [
  {
    title: 'FESTAS DE ANIVERSÁRIO',
    href: '/eventos/aniversarios',
    imageSrc: ACTIVITY_CARD_IMAGE_LASERTAG,
  },
  {
    title: 'DESPEDIDA DE SOLTEIRO(A)',
    href: '/eventos/despedidas',
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
  },
  {
    title: 'EVENTO DE EMPRESA',
    href: '/eventos/empresas',
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
  },
  {
    title: 'GRUPOS E ESCOLAS',
    href: '/eventos/grupos',
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
  },
];

export function EventTypesSection() {
  return (
    <Section id="eventos">
      <Container>
        <VStack gap={{ base: '6', md: '8', lg: '16' }}>
          <VStack gap={{ base: '3', md: '4', lg: '8' }} textAlign="center">
            <Text
              as="h2"
              textStyle="h2"
              fontSize={{ base: 'xl', md: '2xl', lg: 'display.h2' }}
              color="fg"
              textTransform="uppercase"
            >
              WHAT TYPE OF EVENT DO YOU WANT TO ORGANIZE?
            </Text>
            <Text
              textStyle="h5"
              fontSize={{ base: 'sm', md: 'md', lg: 'body.lg' }}
              color="fg"
            >
              De aniversários a grandes eventos de empresa, temos experiências à
              medida para o teu grupo!
            </Text>
          </VStack>

          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={{ base: '3', md: '5' }}
            w="full"
          >
            {EVENTS.map((item) => (
              <VStack key={item.title} gap={{ base: '3', lg: '6' }}>
                <Box
                  position="relative"
                  w="full"
                  aspectRatio={{ base: '195/265', lg: '315/428' }}
                  bg="gray.300"
                  overflow="hidden"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 991px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <VStack gap="1">
                  <Text
                    textStyle="h5"
                    fontSize={{ base: 'xs', md: 'sm', lg: 'body.lg' }}
                    color="fg"
                    textAlign="center"
                    textTransform="uppercase"
                  >
                    {item.title}
                  </Text>
                  <Link
                    href={item.href}
                    fontSize={{ base: 'xs', md: 'sm', lg: 'body.lg' }}
                    color="fg.muted"
                    _hover={{ color: 'primary' }}
                  >
                    Ver pacotes
                  </Link>
                </VStack>
              </VStack>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
