"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <Flex
      border="1px solid"
      borderColor="fg.muted"
      borderRadius="8px"
      overflow="hidden"
      display="inline-flex"
      w="fit-content"
    >
      <Box
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w={{ base: "40px", lg: "50px" }}
        h={{ base: "40px", lg: "50px" }}
        cursor={value <= min ? "not-allowed" : "pointer"}
        opacity={value <= min ? 0.4 : 1}
        _hover={value > min ? { bg: "bg.subtle" } : {}}
        transition="background 0.15s"
        onClick={() => value > min && onChange(value - 1)}
        aria-label="Diminuir quantidade"
      >
        <MinusIcon />
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        w={{ base: "40px", lg: "50px" }}
        h={{ base: "40px", lg: "50px" }}
        borderLeft="1px solid"
        borderRight="1px solid"
        borderColor="fg.muted"
      >
        <Text
          fontWeight="extrabold"
          fontSize={{ base: "md", lg: "body.lg" }}
          color="fg.muted"
          lineHeight="1"
        >
          {value}
        </Text>
      </Flex>

      <Box
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w={{ base: "40px", lg: "50px" }}
        h={{ base: "40px", lg: "50px" }}
        cursor={value >= max ? "not-allowed" : "pointer"}
        opacity={value >= max ? 0.4 : 1}
        _hover={value < max ? { bg: "bg.subtle" } : {}}
        transition="background 0.15s"
        onClick={() => value < max && onChange(value + 1)}
        aria-label="Aumentar quantidade"
      >
        <PlusIcon />
      </Box>
    </Flex>
  );
}

function MinusIcon() {
  return (
    <svg
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1H14" stroke="#939598" strokeWidth="2" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 0V14M0 7H14" stroke="#939598" strokeWidth="2" />
    </svg>
  );
}
