import { Box, Button, Grid, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { Container, Section } from "@/components/layout";

const ADVENTURES = [
  {
    title: "PAINTBALL",
    slug: "paintball" as const,
    years: "+20 Anos",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ",
    cta: "Reservas já",
    active: true,
  },
  {
    title: "AIRSOFT",
    slug: null,
    years: "+10 Anos",
    description: "Em breve",
    cta: null,
    active: false,
  },
  {
    title: "SOFT PAINTBALL",
    slug: null,
    years: "+5 Anos",
    description: "Em breve",
    cta: null,
    active: false,
  },
  {
    title: "LASERTAG",
    slug: null,
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
            {ADVENTURES.map((item) => {
              const href = item.slug ? `/atividades/${item.slug}` : undefined;
              const cardContent = (
                <>
                  <Text fontSize="sm" opacity={item.active ? 0.9 : 0.8}>
                    {item.description}
                  </Text>
                  {item.cta && href && (
                    <Button
                      asChild
                      colorPalette="primary"
                      size="sm"
                      alignSelf="flex-start"
                      _hover={{ bg: "primary.muted", color: "fg" }}
                    >
                      <Link href={href}>{item.cta}</Link>
                    </Button>
                  )}
                  {item.cta && !href && (
                    <Button
                      colorPalette="primary"
                      size="sm"
                      alignSelf="flex-start"
                      _hover={{ bg: "primary.muted", color: "fg" }}
                      disabled
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
                </>
              );
              const cardProps = {
                bg: item.active ? "bg.dark" : "bg.subtle",
                color: item.active ? "white" : "fg",
                borderRadius: "lg",
                p: "6",
                minH: "200px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "space-between",
              };
              if (href) {
                return (
                  <Link
                    href={href}
                    _hover={{ textDecoration: "none", opacity: 0.95 }}
                    key={item.title}
                    {...cardProps}
                  >
                    {cardContent}
                  </Link>
                );
              }
              return (
                <Box key={item.title} {...cardProps}>
                  {cardContent}
                </Box>
              );
            })}
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
