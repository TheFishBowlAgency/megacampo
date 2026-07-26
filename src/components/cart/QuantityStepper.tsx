"use client";

import { IconButton, Input, HStack } from "@chakra-ui/react";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  /** Accessibility label for the control group */
  "aria-label"?: string;
}

/**
 * Quantity selector: minus button, number input, plus button.
 */
export function QuantityStepper({
  value,
  min = 1,
  max = 99,
  onChange,
  "aria-label": ariaLabel = "Quantidade",
}: QuantityStepperProps) {
  const handleDecrement = () => onChange(Math.max(min, value - 1));
  const handleIncrement = () => onChange(Math.min(max, value + 1));

  return (
    <HStack gap="3" align="center">
      <IconButton
        aria-label="Diminuir quantidade"
        variant="ghost"
        size="sm"
        color="fg"
        fontSize="xl"
        fontWeight="normal"
        minW="8"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        −
      </IconButton>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
        w="12"
        textAlign="center"
        borderWidth="0"
        bg="transparent"
        fontWeight="extrabold"
        fontSize={{ base: "md", xl: "body.lg" }}
        p="0"
        h="auto"
        aria-label={ariaLabel}
      />
      <IconButton
        aria-label="Aumentar quantidade"
        variant="ghost"
        size="sm"
        color="fg"
        fontSize="xl"
        fontWeight="normal"
        minW="8"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        +
      </IconButton>
    </HStack>
  );
}
