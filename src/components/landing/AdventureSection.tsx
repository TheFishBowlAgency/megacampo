"use client";

import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "@/components/ui";
import { Container, Section } from "@/components/layout";

const ADVENTURES = [
  {
    title: "PAINTBALL .68CAL",
    tag: "PAINTBALL",
    age: "+12 Anos",
    description:
      "Vive a experiência do paintball clássico com marcadoras .68cal. Jogos intensos em cenários cinematográficos.",
    href: "/atividades/paintball",
  },
  {
    title: "AIRSOFT",
    tag: "AIRSOFT",
    age: "+16 Anos",
    description:
      "Simulação militar com réplicas de airsoft. Estratégia e trabalho de equipa em cenários realistas.",
    href: "/atividades/airsoft",
  },
  {
    title: "PAINTBALL .50CAL",
    tag: "SOFT PAINTBALL",
    age: "+9 Anos",
    description:
      "Paintball com bolas mais pequenas e menos impacto. Ideal para os mais novos e iniciantes.",
    href: "/atividades/soft-paintball",
  },
  {
    title: "LASERTAG",
    tag: "LASER TAG",
    age: "+5 Anos",
    description:
      "Diversão sem impacto! Lasertag ao ar livre para toda a família nos nossos cenários.",
    href: "/atividades/lasertag",
  },
];

function ActivityCard({ item }: { item: (typeof ADVENTURES)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <VStack gap={{ base: "3", lg: "6" }}>
      <Box
        position="relative"
        w="full"
        aspectRatio={{ base: "195/265", lg: "315/428" }}
        bg="gray.300"
        overflow="hidden"
        cursor="pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Activity tag badge */}
        <Box
          position="absolute"
          top="10px"
          left="10px"
          zIndex="2"
          px="3"
          py="1.5"
          bg="primary"
          transform="skewX(-5deg)"
          borderRadius="sm"
        >
          <Text
            fontFamily="heading.molot"
            fontSize={{ base: "xs", lg: "md" }}
            color="dark"
            textTransform="uppercase"
            transform="skewX(5deg)"
          >
            {item.tag}
          </Text>
        </Box>

        {/* Hover overlay */}
        <Box
          position="absolute"
          inset="0"
          bg="blackAlpha.800"
          opacity={hovered ? 1 : 0}
          transition="opacity 0.3s"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="5"
          zIndex="1"
        >
          <Text
            color="grayLight"
            fontSize={{ base: "sm", lg: "md" }}
            lineHeight="1.6"
          >
            {item.description}
          </Text>
          <Link
            href={item.href}
            bg="primary"
            color="grayLight"
            px="8"
            py="4"
            textStyle="button"
            fontSize={{ base: "sm", lg: "body.lg" }}
            textTransform="uppercase"
            borderRadius="md"
            textAlign="center"
            _hover={{ opacity: 0.9 }}
            alignSelf="center"
          >
            SABER MAIS
          </Link>
        </Box>
      </Box>

      <VStack gap="1">
        <Text
          textStyle="h3"
          fontSize={{ base: "md", lg: "display.h3" }}
          color="fg"
          textAlign="center"
          textTransform="uppercase"
        >
          {item.title}
        </Text>
        <Text
          textStyle="body"
          fontSize={{ base: "sm", lg: "body.lg" }}
          color="fg.muted"
          textAlign="center"
        >
          {item.age}
        </Text>
      </VStack>
    </VStack>
  );
}

export function AdventureSection() {
  return (
    <Section id="actividades">
      <Container>
        <VStack gap={{ base: "6", md: "10", lg: "16" }}>
          <Text
            as="h2"
            textStyle="h2"
            fontSize={{ base: "xl", md: "2xl", lg: "display.h2" }}
            textAlign="center"
            color="fg"
            textTransform="uppercase"
          >
            ESCOLHE A TUA AVENTURA
          </Text>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: "4", md: "5" }}
            w="full"
          >
            {ADVENTURES.map((item) => (
              <ActivityCard key={item.title} item={item} />
            ))}
          </Grid>

          <Link
            href="/atividades"
            bg="primary"
            color="grayLight"
            px="8"
            py="4"
            textStyle="button"
            fontSize={{ base: "md", lg: "body.lg" }}
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
