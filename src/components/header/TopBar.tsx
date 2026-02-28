"use client";

import {
  Box,
  HStack,
  Icon,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const PHONE = "+351 913 402 013";

const LANGUAGES = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

export function TopBar() {
  const [locale, setLocale] =
    useState<(typeof LANGUAGES)[number]["code"]>("pt");
  const currentLabel = LANGUAGES.find((l) => l.code === locale)?.label ?? "PT";

  return (
    <Box bg="primary" color="white" py="2">
      <Box px={{ base: "4", md: "6", lg: "8" }} maxW="1280px" mx="auto">
        <HStack gap="4">
          <Text
            // fontSize={{ base: "sm", md: "md" }}
            // fontWeight="medium"
            flex="1"
            fontSize={{ lgDown: "1rem" }}
            letterSpacing="wide"
            textAlign="center"
            textStyle="h5"
          >
            Contacta-nos: {PHONE}
          </Text>
          <MenuRoot positioning={{ placement: "bottom-end" }}>
            <MenuTrigger
              type="button"
              aria-label="Selecionar idioma"
              py="1"
              px="2"
              borderRadius="md"
              bg="transparent"
              border="none"
              cursor="pointer"
              display="flex"
              alignItems="center"
              gap="2"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              _expanded={{ bg: "whiteAlpha.200" }}
            >
              <Icon asChild size={{ base: "lg", md: "2xl" }}>
                <svg
                  // width="32"
                  // height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </Icon>
              <Text as="span" hideBelow="lg" textStyle="h5">
                {currentLabel}
              </Text>
              <Icon as={ChevronDownIcon} />
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent
                bg="white"
                color="fg"
                borderWidth="1px"
                borderColor="gray.200"
                py="1"
                minW="140px"
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem
                    key={lang.code}
                    value={lang.code}
                    onClick={() => setLocale(lang.code)}
                    cursor="pointer"
                    py="2"
                    px="3"
                    fontSize="sm"
                    _hover={{ bg: "gray.100" }}
                    _focus={{ bg: "gray.100" }}
                  >
                    {lang.label}
                  </MenuItem>
                ))}
              </MenuContent>
            </MenuPositioner>
          </MenuRoot>
        </HStack>
      </Box>
    </Box>
  );
}

function GlobeIcon() {
  return (
    <svg
      // width="32"
      // height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
