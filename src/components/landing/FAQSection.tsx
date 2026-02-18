"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Container, Section } from "@/components/layout";

const ITEMS = [
  {
    question: "Qual o número mínimo de jogadores?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. O número mínimo varia consoante a atividade.",
  },
  {
    question: "É preciso levar bolas de paintball?",
    answer: "Não. Todo o equipamento necessário está incluído no preço.",
  },
  {
    question: "Qual a idade mínima para jogar?",
    answer: "A idade mínima é 10 anos, acompanhados por um adulto responsável.",
  },
  {
    question: "O que está incluído no preço?",
    answer:
      "Equipamento completo (marca, máscara, fato), bolas de paintball e monitor durante a atividade.",
  },
  {
    question: "Podemos trazer comida/bebida? Há barbecues?",
    answer:
      "Sim. Temos zonas de piquenique e barbecues disponíveis mediante reserva.",
  },
  {
    question: "E o que acontece se chover?",
    answer:
      "As atividades realizam-se na mesma. Em condições extremas, reagendamos sem custos adicionais.",
  },
];

type FAQSectionProps = {
  id?: string;
  heading?: string;
};

export function FAQSection({
  id = "faq",
  heading = "Perguntas frequentes",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section id={id}>
      <Container>
        <VStack gap="8" align="stretch">
          <Text as="h2" textStyle="h2" color="fg" textTransform="uppercase">
            {heading}
          </Text>
          <VStack gap="0" align="stretch">
            {ITEMS.map((item, i) => (
              <Box
                key={item.question}
                borderBottomWidth="1px"
                borderColor="gray.200"
              >
                <Box
                  as="button"
                  width="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  py="4"
                  px="0"
                  textAlign="left"
                  fontWeight="semibold"
                  color="fg"
                  _hover={{ color: "primary" }}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  {item.question}
                  <Box as="span" fontSize="xl" color="primary" aria-hidden>
                    {openIndex === i ? "−" : "+"}
                  </Box>
                </Box>
                {openIndex === i && (
                  <Box
                    pb="4"
                    pr="8"
                    color="fg.muted"
                    textStyle="body"
                    fontSize="md"
                  >
                    {item.answer}
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Section>
  );
}
