"use client";

import { Box, Button, Grid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Container, Section } from "@/components/layout";
import { Link } from "../ui";

const TABS = [
  { id: "paintball", label: "PAINTBALL" },
  { id: "soft-paintball", label: "SOFT PAINTBALL" },
  { id: "cooperacao", label: "JOGOS DE COOPERAÇÃO" },
] as const;

const PACKAGES = [
  {
    id: "commando",
    name: "COMMANDO",
    price: "29,95",
    popular: true,
    features: [
      "200 bolas",
      "Marcador de paintball",
      "Botija de ar comprimido",
      "Máscara de proteção",
      "Farda camuflada",
      "Acessos aos 12 cenários",
      "Mínimo 8 pessoas",
    ],
  },
  {
    id: "ranger",
    name: "RANGER",
    price: "39,95",
    popular: false,
    features: [
      "500 bolas",
      "Marcador de paintball",
      "Botija de ar comprimido",
      "Máscara de proteção",
      "Farda camuflada",
      "Acessos aos 12 cenários",
      "Mínimo 8 pessoas",
    ],
  },
  {
    id: "swat",
    name: "SWAT",
    price: "49,95",
    popular: false,
    features: [
      "1000 bolas",
      "Marcador de paintball",
      "Botija de ar comprimido",
      "Máscara de proteção",
      "Farda camuflada",
      "Acessos aos 12 cenários",
      "Mínimo 8 pessoas",
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: "69,95",
    popular: false,
    features: [
      "1500 bolas",
      "Marcador de paintball",
      "Botija de ar comprimido",
      "Máscara de proteção",
      "Farda camuflada",
      "Acessos aos 12 cenários",
      "Mínimo 8 pessoas",
    ],
  },
];

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<string>("paintball");

  return (
    <Section variant="dark" id="pacotes">
      <Container>
        <VStack gap={{ base: "8", md: "10", lg: "12" }} align="stretch">
          <Box
            display="flex"
            flexWrap="wrap"
            gap="2"
            justifyContent="center"
            role="tablist"
            aria-label="Tipo de atividade"
          >
            {TABS.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "solid" : "ghost"}
                colorPalette={activeTab === tab.id ? "primary" : "gray"}
                size="sm"
                textTransform="uppercase"
                fontWeight="semibold"
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
          <Grid
            templateColumns={{
              // base: "1fr",
              base: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "4", md: "6" }}
            w="full"
          >
            {PACKAGES.map((pkg) => (
              <Box
                key={pkg.id}
                as="article"
                bg="bg.dark"
                borderRadius="lg"
                overflow="hidden"
                borderWidth="1px"
                borderColor="whiteAlpha.200"
                position="relative"
                display="flex"
                flexDirection="column"
                minH={{ base: "auto", md: "420px" }}
              >
                {pkg.popular && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bg="primary.muted"
                    color="fg"
                    py="1"
                    px="3"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    zIndex="1"
                  >
                    O mais popular
                  </Box>
                )}
                <Box
                  bg="primary"
                  color="white"
                  py="3"
                  px="4"
                  textAlign="center"
                  mt={pkg.popular ? "6" : "0"}
                >
                  <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="lg"
                    letterSpacing="wider"
                  >
                    {pkg.name}
                  </Text>
                </Box>
                <VStack
                  p="6"
                  flex="1"
                  align="stretch"
                  gap="4"
                  justifyContent="space-between"
                >
                  <Box>
                    <Text
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="bold"
                      color="white"
                    >
                      {pkg.price}€
                    </Text>
                    <Text fontSize="sm" color="whiteAlpha.800">
                      Por pessoa
                    </Text>
                  </Box>
                  <VStack align="stretch" gap="2" flex="1">
                    {pkg.features.map((feature) => (
                      <Text
                        key={feature}
                        fontSize="sm"
                        color="whiteAlpha.900"
                        lineHeight="tall"
                      >
                        {feature}
                      </Text>
                    ))}
                  </VStack>
                  <Button
                    asChild
                    width="full"
                    colorPalette="primary"
                    bg="primary"
                    color="white"
                    fontWeight="bold"
                    textTransform="uppercase"
                    size="lg"
                    _hover={{ bg: "primary.muted", color: "fg" }}
                  >
                    <Link href="/#reservas">Reserva já</Link>
                  </Button>
                </VStack>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Section>
  );
}
