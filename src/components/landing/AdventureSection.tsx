import { Box, Button, Grid, Link, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const ADVENTURES = [
  {
    title: "PAINTBALL",
    years: "+20 Anos",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    cta: "Reservas já",
    active: true,
  },
  {
    title: "AIRSOFT",
    years: "+10 Anos",
    description: "Em breve",
    cta: null,
    active: false,
  },
  {
    title: "SOFT PAINTBALL",
    years: "+5 Anos",
    description: "Em breve",
    cta: null,
    active: false,
  },
  {
    title: "LASERTAG",
    years: "+2 Anos",
    description: "Em breve",
    cta: null,
    active: false,
  },
];

export function AdventureSection() {
  return (
    <Section id="actividades">
      <Container>
        <VStack gap="8">
          <Text as="h2" textStyle="h2" textAlign="center" color="fg">
            Escolhe a tua aventura
          </Text>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap="6"
            w="full"
          >
            {ADVENTURES.map((item) => (
              <Box
                key={item.title}
                bg={item.active ? "bg.dark" : "bg.subtle"}
                color={item.active ? "white" : "fg"}
                borderRadius="lg"
                p="6"
                minH="200px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Text fontSize="sm" opacity={item.active ? 0.9 : 0.8}>
                  {item.description}
                </Text>
                {item.cta && (
                  <Button
                    colorPalette="primary"
                    size="sm"
                    alignSelf="flex-start"
                    _hover={{ bg: "primary.muted", color: "fg" }}
                  >
                    {item.cta}
                  </Button>
                )}
                <Box
                  pt="4"
                  borderTopWidth="1px"
                  borderColor={item.active ? "whiteAlpha.300" : "gray.200"}
                >
                  <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="sm"
                  >
                    {item.title}
                  </Text>
                  <Text
                    fontSize="xs"
                    color={item.active ? "whiteAlpha.800" : "fg.muted"}
                  >
                    {item.years}
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
          <Link
            href="#actividades"
            bg="primary"
            color="white"
            px="6"
            py="3"
            fontSize="lg"
            fontWeight="semibold"
            textTransform="uppercase"
            borderRadius="md"
            _hover={{ bg: "primary.muted", color: "fg" }}
          >
            Ver tudo
          </Link>
        </VStack>
      </Container>
    </Section>
  );
}
