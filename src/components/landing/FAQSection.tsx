"use client";

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Container, Section } from "@/components/layout";

const DEFAULT_ITEMS = [
  {
    question: "Qual o número mínimo de jogadores?",
    answer:
      "O número mínimo depende da atividade. Para paintball e airsoft são necessários pelo menos 8 jogadores. Para laser tag e soft paintball, o mínimo é de 6 jogadores.",
  },
  {
    question: "Dói muito levar com bolas de paintball?",
    answer:
      "Não. As bolas de paintball são feitas de gelatina e tinta biodegradável. O impacto é semelhante a um estalar de dedos. Todo o equipamento de proteção é fornecido.",
  },
  {
    question: "Qual é a idade mínima para jogar?",
    answer:
      "Depende da atividade: Laser Tag a partir dos 5 anos, Soft Paintball (.50cal) a partir dos 9 anos, Paintball (.68cal) a partir dos 12 anos, e Airsoft a partir dos 16 anos.",
  },
  {
    question: "O que está incluído no preço?",
    answer:
      "Equipamento completo (marcadora, máscara, fato de proteção), munições base, seguro, briefing de segurança e monitor durante toda a atividade.",
  },
  {
    question: "Podemos trazer comida/bebida? Há barbecue?",
    answer:
      "Sim! Temos zonas de piquenique e barbecues disponíveis. Podem trazer a vossa própria comida e bebida. Também temos um café com snacks e bebidas no parque.",
  },
  {
    question: "O que acontece se chover?",
    answer:
      "As atividades realizam-se na mesma — a chuva torna a experiência ainda mais divertida! Em condições meteorológicas extremas, reagendamos sem custos adicionais.",
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

type FAQSectionVariant = "default" | "subtle";

type FAQSectionProps = {
  id?: string;
  heading?: string;
  variant?: FAQSectionVariant;
  items?: FAQItem[];
};

export function FAQSection({
  id = "faq",
  heading = "PERGUNTAS FREQUENTES",
  variant = "default",
  items = DEFAULT_ITEMS,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section id={id} variant={variant === "subtle" ? "subtle" : "default"}>
      <Container>
        <VStack gap={{ base: "6", md: "8", lg: "16" }} align="stretch">
          <Text
            as="h2"
            textStyle="h2"
            fontSize={{ base: "xl", md: "2xl", lg: "display.h2" }}
            color="fg"
            textTransform="uppercase"
          >
            {heading}
          </Text>

          <VStack gap="0" align="stretch">
            <Box h="1px" bg="fg" />
            {items.map((item, i) => (
              <Box key={item.question}>
                <HStack
                  as="button"
                  w="full"
                  justify="space-between"
                  gap="5"
                  py="4"
                  px="0"
                  cursor="pointer"
                  _hover={{ color: "primary" }}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <Text
                    textStyle="h4"
                    fontSize={{ base: "sm", md: "lg", lg: "display.h3" }}
                    color="fg"
                    textAlign="left"
                  >
                    {item.question}
                  </Text>
                  <Box flexShrink={0} fontSize="xl" aria-hidden>
                    {openIndex === i ? <MinusIcon /> : <PlusIcon />}
                  </Box>
                </HStack>
                {openIndex === i && (
                  <Box
                    pb="4"
                    pr="8"
                    color="fg.muted"
                    fontSize={{ base: "sm", md: "md", lg: "body.lg" }}
                    lineHeight="1.6"
                  >
                    {item.answer}
                  </Box>
                )}
                <Box h="1px" bg={i === openIndex ? "fg" : "fg.muted"} />
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Section>
  );
}

function PlusIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 1v20M1 11h20" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 11h20" />
    </svg>
  );
}
