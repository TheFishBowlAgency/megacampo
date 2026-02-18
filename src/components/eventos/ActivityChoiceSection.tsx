import { Box, Grid, Link, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const ACTIVITIES = [
  {
    id: "paintball",
    title: "PAINTBALL",
    features: [
      "Inclui todo o material (marcadora + equipamento)",
      "Caixas de munições ilimitadas",
      "Cenários de jogo variados e divertidos",
    ],
    minAge: "+10 anos",
  },
  {
    id: "soft-paintball",
    title: "SOFT PAINTBALL",
    features: [
      "Não magoa, ideal para todos os públicos",
      "Pinturas laváveis e biodegradáveis",
      "Poderás trazer comida e bebida!",
    ],
    minAge: "+5 anos",
  },
  {
    id: "cooperacao",
    title: "JOGOS DE COOPERAÇÃO",
    features: [
      "Promove o espírito de equipa e liderança",
      "Ideal para grupos com objetivos específicos",
      "Duração adaptável + monitores",
    ],
    minAge: "Todas as idades",
  },
];

const HEADING = "Qual a atividade certa para a tua empresa?";
const SUBHEADING =
  "Desde paintball a jogos de equipa, temos o formato ideal para o teu evento. Escolhe a atividade e consulta os pacotes disponíveis.";

export function ActivityChoiceSection() {
  return (
    <Section>
      <Container>
        <VStack gap={{ base: "8", md: "10", lg: "12" }} align="stretch">
          <VStack gap="2" textAlign="center">
            <Text as="h2" textStyle="h2" color="fg">
              {HEADING}
            </Text>
            <Text
              textStyle="body"
              color="fg.muted"
              maxW="2xl"
              mx="auto"
              fontSize={{ base: "md", md: "body.lg" }}
            >
              {SUBHEADING}
            </Text>
          </VStack>
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: "4", md: "6" }}
            w="full"
          >
            {ACTIVITIES.map((activity) => (
              <Box
                key={activity.id}
                as="article"
                bg="bg.subtle"
                borderRadius="lg"
                overflow="hidden"
                borderTopWidth="4px"
                borderTopColor="primary"
                display="flex"
                flexDirection="column"
                minH={{ base: "auto", md: "280px" }}
              >
                <Box
                  p={{ base: "5", md: "6" }}
                  flex="1"
                  display="flex"
                  flexDirection="column"
                >
                  <Text
                    fontWeight="extrabold"
                    textTransform="uppercase"
                    fontSize={{ base: "lg", md: "xl" }}
                    color="primary"
                    mb="4"
                  >
                    {activity.title}
                  </Text>
                  <Link
                    href="#pacotes"
                    fontSize="sm"
                    color="fg.muted"
                    fontWeight="medium"
                    _hover={{ color: "primary", textDecoration: "underline" }}
                    mb="4"
                  >
                    Ver pacotes
                  </Link>
                  <VStack align="stretch" gap="2" flex="1">
                    {activity.features.map((feature) => (
                      <Box
                        key={feature}
                        display="flex"
                        gap="2"
                        alignItems="flex-start"
                      >
                        <Box
                          mt="1.5"
                          w="5"
                          h="5"
                          flexShrink={0}
                          borderRadius="full"
                          bg="primary"
                          color="white"
                          fontSize="xs"
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          aria-hidden
                        >
                          i
                        </Box>
                        <Text fontSize="sm" color="fg.muted" lineHeight="tall">
                          {feature}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                  <Text
                    mt="4"
                    pt="4"
                    borderTopWidth="1px"
                    borderColor="gray.200"
                    fontSize="sm"
                    color="fg.muted"
                  >
                    {activity.minAge}
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
