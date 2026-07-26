"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Section } from "@/components/layout";
import { Link } from "@/components/ui";

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
      "200 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
  {
    id: "ranger",
    name: "RANGER",
    price: "34,95",
    popular: false,
    features: [
      "200 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
  {
    id: "swat",
    name: "SWAT",
    price: "49,95",
    popular: false,
    features: [
      "500 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: "69,95",
    popular: false,
    features: [
      "1000 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "CARREGADOR DE POTES",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
];

export function PricingSection() {
  const [activeTab, setActiveTab] = useState<string>("paintball");

  return (
    <Section variant="subtle" id="pacotes" bg="bg.subtle">
      <Box maxW="1768px" mx="auto" px={{ base: "5", md: "6", lg: "8" }}>
        <VStack gap={{ base: "8", md: "10", xl: "12" }} align="stretch">
          <Box
            display="flex"
            flexWrap="wrap"
            gap={{ base: "4", md: "8" }}
            justifyContent="center"
            role="tablist"
            aria-label="Tipo de atividade"
          >
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Box
                  key={tab.id}
                  as="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  fontSize={{ base: "sm", md: "md", xl: "body.lg" }}
                  fontWeight="medium"
                  textTransform="uppercase"
                  color={active ? "primary" : "fg.muted"}
                  borderBottomWidth="2px"
                  borderBottomColor={active ? "primary" : "transparent"}
                  pb="1"
                  cursor="pointer"
                  _hover={{ color: "primary" }}
                >
                  {tab.label}
                </Box>
              );
            })}
          </Box>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={{ base: "4", md: "5" }}
            w="full"
          >
            {PACKAGES.map((pkg) => (
              <Box
                key={pkg.id}
                as="article"
                bg="dark"
                color="grayLight"
                px={{ base: "5", md: "8" }}
                pt={{ base: "6", md: "8" }}
                pb={{ base: "8", md: "16" }}
                display="flex"
                flexDirection="column"
                gap={{ base: "8", md: "12" }}
                minH={{ base: "auto", xl: "900px" }}
              >
                <VStack align="stretch" gap={{ base: "8", md: "12" }} flex="1">
                  <Box
                    position="relative"
                    display="inline-flex"
                    alignSelf="flex-start"
                  >
                    <Box
                      position="absolute"
                      inset="0"
                      bg="primary"
                      transform="skewX(-8deg)"
                      borderRadius="sm"
                    />
                    <Text
                      position="relative"
                      fontFamily="heading.molot"
                      fontSize={{ base: "2xl", md: "3rem" }}
                      lineHeight="1"
                      color="dark"
                      textTransform="uppercase"
                      px="3"
                      py="1"
                    >
                      {pkg.name}
                    </Text>
                  </Box>

                  <Box>
                    <Text
                      fontSize={{ base: "2xl", md: "3rem" }}
                      fontWeight="extrabold"
                      color="grayLight"
                      lineHeight="1"
                    >
                      {pkg.price}€
                    </Text>
                    <Text
                      fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
                      color="grayLight"
                      mt="2"
                    >
                      Por pessoa
                    </Text>
                  </Box>

                  <Box h="1px" bg="whiteAlpha.300" />

                  <VStack align="stretch" gap="4" flex="1">
                    {pkg.popular ? (
                      <Box alignSelf="flex-start" bg="offset" px="8" py="2">
                        <Text
                          fontSize={{ base: "sm", md: "md", xl: "body.lg" }}
                          fontWeight="medium"
                          color="primary"
                          textTransform="uppercase"
                        >
                          O mais popular
                        </Text>
                      </Box>
                    ) : null}
                    {pkg.features.map((feature) => (
                      <Text
                        key={feature}
                        fontSize={{ base: "sm", md: "md", xl: "body.lg" }}
                        fontWeight="extrabold"
                        color="grayLight"
                        textTransform="uppercase"
                        lineHeight="1.2"
                      >
                        {feature}
                      </Text>
                    ))}
                  </VStack>
                </VStack>

                <Link
                  href="/#reservas"
                  bg="primary"
                  color="grayLight"
                  px="8"
                  py="4"
                  textStyle="button"
                  fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
                  fontWeight="medium"
                  textTransform="uppercase"
                  textAlign="center"
                  alignSelf="flex-start"
                  _hover={{ opacity: 0.9 }}
                >
                  Reserva já
                </Link>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Box>
    </Section>
  );
}
