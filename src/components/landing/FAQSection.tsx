"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Container, Section } from "@/components/layout";

const DEFAULT_ITEMS = [
  {
    question: "Qual o número mínimo de jogadores?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "Dói muito levar com bolas de paintball?",
    answer:
      "Não. As bolas de paintball são feitas de gelatina e tinta biodegradável. O impacto é semelhante a um estalar de dedos.",
  },
  {
    question: "Qual é a idade mínima para jogar?",
    answer: "A idade mínima é 10 anos, acompanhados por um adulto responsável.",
  },
  {
    question: "O que está incluído no preço?",
    answer:
      "Equipamento completo (marcadora, máscara, fato), bolas de paintball e monitor durante a atividade.",
  },
  {
    question: "Podemos trazer comida/bebida? Há barbecue?",
    answer:
      "Sim. Temos zonas de piquenique e barbecues disponíveis mediante reserva.",
  },
  {
    question: "O que acontece se chover?",
    answer:
      "As atividades realizam-se na mesma. Em condições extremas, reagendamos sem custos adicionais.",
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
  /** When provided, used instead of default FAQ items (e.g. product-specific FAQs). */
  items?: FAQItem[];
};

export function FAQSection({
  id = "faq",
  heading = "Perguntas frequentes",
  variant = "default",
  items = DEFAULT_ITEMS,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section id={id} variant={variant === "subtle" ? "subtle" : "default"}>
      <Container>
        <VStack gap="8" align="stretch">
          <Text as="h2" textStyle="h2" color="fg" textTransform="uppercase">
            {heading}
          </Text>
          <VStack gap="0" align="stretch">
            {/* Top divider — matches Figma's dark top border */}
            <Box h="1px" bg="fg" />
            {items.map((item, i) => (
              <Box key={item.question}>
                <Box
                  as="button"
                  width="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="5"
                  py="4"
                  px="0"
                  textAlign="left"
                  fontWeight="semibold"
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  color="fg"
                  cursor="pointer"
                  _hover={{ color: "primary" }}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  {item.question}
                  <Box as="span" fontSize="xl" flexShrink={0} aria-hidden>
                    {openIndex === i ? "−" : "+"}
                  </Box>
                </Box>
                {openIndex === i && (
                  <Box
                    pb="4"
                    pr="8"
                    color="fg.muted"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    {item.answer}
                  </Box>
                )}
                <Box h="1px" bg="fg.muted" />
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Section>
  );
}
