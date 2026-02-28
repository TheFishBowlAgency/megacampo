"use client";

import { Flex, Box } from "@chakra-ui/react";

export interface SelectionDotProps {
  selected: boolean;
}

/**
 * Radio/checkbox visual indicator matching the Figma design.
 * Renders a circle with a filled inner dot when selected.
 */
export function SelectionDot({ selected }: SelectionDotProps) {
  return (
    <Flex
      w="28px"
      h="28px"
      minW="28px"
      borderRadius="full"
      borderWidth="2px"
      borderColor={selected ? "fg" : "fg.muted"}
      align="center"
      justify="center"
      transition="border-color 0.15s"
    >
      {selected && <Box w="16px" h="16px" borderRadius="full" bg="fg" />}
    </Flex>
  );
}
