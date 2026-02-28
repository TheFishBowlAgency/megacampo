"use client";

import {
  Box,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "ATIVIDADES", href: "/#actividades" },
  { label: "O PARQUE", href: "/cenarios" },
  { label: "COMO", href: "/como" },
  { label: "EVENTOS", href: "/eventos" },
  { label: "LOJA", href: "/#loja" },
  { label: "RESERVAS", href: "/#reservas" },
  { label: "CONTACTOS", href: "/#contactos" },
];

const PHONE = "+351 913 402 013";

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex="modal"
      bg="white"
      overflowY="auto"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      {/* Top orange bar */}
      <Box bg="primary" color="white" py="2" px="4">
        <Flex justify="space-between" align="center" maxW="1280px" mx="auto">
          <Text fontSize="sm" fontWeight="medium">
            Contacta-nos: {PHONE}
          </Text>
          <HStack gap="2">
            <IconButton
              aria-label="Idioma"
              variant="ghost"
              color="white"
              size="sm"
            >
              <GlobeIcon />
            </IconButton>
          </HStack>
        </Flex>
      </Box>

      {/* Header with logo + close */}
      <Flex
        justify="space-between"
        align="center"
        px="4"
        py="4"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <Logo />
        <CloseButton size="lg" onClick={onClose} aria-label="Fechar menu" />
      </Flex>

      {/* Nav links */}
      <VStack align="stretch" gap="0" px="4" py="6">
        {NAV_LINKS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            py="4"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="md"
            color={i === 0 ? "primary" : "fg"}
            borderBottom={i < NAV_LINKS.length - 1 ? "1px solid" : undefined}
            borderColor="gray.200"
            _hover={{ color: "primary" }}
          >
            {item.label}
            <ChevronRightIcon />
          </Link>
        ))}
      </VStack>

      {/* Utility: Bag, Search, Phone */}
      <Box px="4" py="4" borderBottomWidth="1px" borderColor="gray.200">
        <VStack align="stretch" gap="3">
          <HStack gap="3">
            <Box as="span" fontSize="lg">
              🛒
            </Box>
            <Text fontWeight="medium">Bag</Text>
          </HStack>
          <HStack gap="3">
            <SearchIcon />
            <Text fontWeight="medium">Search</Text>
          </HStack>
          <HStack gap="3">
            <PhoneIcon />
            <Link
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              color="primary"
              fontWeight="semibold"
            >
              {PHONE.replace(/\s/g, " ")}
            </Link>
          </HStack>
        </VStack>
      </Box>

      {/* Segue-nos + legal */}
      <Box px="4" py="8">
        <Text fontWeight="bold" textTransform="uppercase" mb="4" fontSize="sm">
          Segue-nos
        </Text>
        <HStack gap="4" mb="6">
          <Link href="#" aria-label="Facebook">
            <FacebookIcon />
          </Link>
          <Link href="#" aria-label="Instagram">
            <InstagramIcon />
          </Link>
        </HStack>
        <VStack align="stretch" gap="2" mb="6">
          <Link
            href="#"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
          >
            Termos de utilização
          </Link>
          <Link
            href="#"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize="sm"
          >
            Política de privacidade
          </Link>
        </VStack>
        <Text fontSize="xs" color="fg.muted">
          © Copyright 2025 by Megacampo
        </Text>
      </Box>
    </Box>
  );
}

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="Megacampo"
      width={139}
      height={80}
      style={{ height: "auto", width: "auto", maxWidth: "80px" }}
    />
  );
}

function GlobeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}
