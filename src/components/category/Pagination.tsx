"use client";

import { HStack, Text } from "@chakra-ui/react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrev?: () => void;
  onNext?: () => void;
}

/**
 * Simple prev/next pagination with page indicator.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationProps) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <HStack justify="space-between" w="full">
      <Text
        fontSize={{ base: "sm", lg: "body.lg" }}
        color="fg"
        whiteSpace="nowrap"
      >
        Página {currentPage} de {totalPages}
      </Text>

      <HStack gap={{ base: "6", lg: "14" }}>
        <HStack
          as="button"
          gap={{ base: "2", lg: "3" }}
          onClick={hasPrev ? onPrev : undefined}
          cursor={hasPrev ? "pointer" : "default"}
          opacity={hasPrev ? 1 : 0.5}
          _hover={hasPrev ? { color: "primary" } : {}}
        >
          <ChevronLeftIcon />
          <Text
            fontSize={{ base: "sm", lg: "body.lg" }}
            color="fg.muted"
            whiteSpace="nowrap"
          >
            Anterior
          </Text>
        </HStack>

        <HStack
          as="button"
          gap={{ base: "2", lg: "3" }}
          onClick={hasNext ? onNext : undefined}
          cursor={hasNext ? "pointer" : "default"}
          opacity={hasNext ? 1 : 0.5}
          _hover={hasNext ? { color: "primary" } : {}}
        >
          <Text
            fontSize={{ base: "sm", lg: "body.lg" }}
            color="fg.muted"
            whiteSpace="nowrap"
          >
            Próximo
          </Text>
          <ChevronRightSmallIcon />
        </HStack>
      </HStack>
    </HStack>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1L1 9L9 17"
        stroke="#939598"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightSmallIcon() {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L9 9L1 17"
        stroke="#939598"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
