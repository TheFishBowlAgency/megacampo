"use client";

import { Box, Input, HStack } from "@chakra-ui/react";

export interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Search input for filtering products in a category page.
 */
export function ProductSearchBar({
  value,
  onChange,
  placeholder = "Procure por produto",
}: ProductSearchBarProps) {
  return (
    <HStack
      border="1px solid"
      borderColor="grayMid"
      borderRadius="6px"
      px="4"
      py={{ base: "2.5", lg: "3" }}
      w={{ base: "full", lg: "411px" }}
      maxW="full"
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant="flushed"
        border="none"
        borderBottom="none"
        fontSize={{ base: "sm", lg: "body.lg" }}
        color="fg"
        _placeholder={{ color: "fg.muted" }}
        _focus={{ boxShadow: "none", borderColor: "transparent" }}
        flex="1"
        px="0"
        h="auto"
      />
      <Box flexShrink={0}>
        <SearchIcon />
      </Box>
    </HStack>
  );
}

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#939598"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
