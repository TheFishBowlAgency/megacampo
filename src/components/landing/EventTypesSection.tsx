import { Box, Grid, Link, Text, VStack } from "@chakra-ui/react";
import { Container, Section } from "@/components/layout";

const EVENTS = [
  { title: "ANIVERSÁRIOS", href: "#" },
  { title: "DESPEDIDAS DE SOLTEIRO(A)", href: "#" },
  { title: "EVENTOS DE EMPRESA", href: "#" },
  { title: "GRUPOS E ESCOLAS", href: "#" },
];

const HEADING = "What type of event do you want to organize?";
const SUBHEADING =
  "Se você deseja organizar um evento de grupo, temos as melhores opções para si.";

export function EventTypesSection() {
  return (
    <Section id="eventos">
      <Container>
        <VStack gap="8">
          <VStack gap="2" textAlign="center">
            <Text as="h2" textStyle="h2" color="fg">
              {HEADING}
            </Text>
            <Text textStyle="body" color="fg.muted" maxW="xl">
              {SUBHEADING}
            </Text>
          </VStack>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap="6"
            w="full"
          >
            {EVENTS.map((item) => (
              <Box
                key={item.title}
                bg="bg.subtle"
                borderRadius="lg"
                p="6"
                minH="140px"
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                <Text
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize="sm"
                  mb="2"
                  color="fg"
                >
                  {item.title}
                </Text>
                <Link
                  href={item.href}
                  fontSize="sm"
                  color="primary"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Ver detalhes
                </Link>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
