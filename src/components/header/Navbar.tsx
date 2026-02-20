"use client";

import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/ui";

const NAV_LINKS = [
  { label: "ACTIVIDADES", href: "/#actividades" },
  { label: "O PARQUE", href: "/cenarios" },
  { label: "COMO", href: "/como" },
  { label: "EVENTOS", href: "/eventos" },
  { label: "LOJA", href: "#loja" },
  { label: "RESERVAS", href: "/#reservas" },
  { label: "CONTACTOS", href: "/#contactos" },
] as const;

export function Navbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  const showMobileNav = useBreakpointValue({ base: true, lg: false }) ?? true;

  const isActive = (item: (typeof NAV_LINKS)[number]) => {
    if (item.href === "/cenarios") return pathname === "/cenarios";
    if (item.href === "/como") return pathname === "/como";
    if (item.href === "/eventos") return pathname === "/eventos";
    if (item.href === "/#actividades")
      return pathname.startsWith("/atividades");
    return false;
  };

  return (
    <Box bg="white" borderBottomWidth="1px" borderColor="gray.200" py="3">
      <Box maxW="1280px" mx="auto" px={{ base: "4", md: "6", lg: "8" }}>
        <HStack justify="space-between" gap="4">
          {/* Logo */}
          <Link href="/" _hover={{ opacity: 0.9 }}>
            <Text
              fontFamily="heading"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="normal"
              color="fg"
              letterSpacing="wider"
            >
              MEGA CAMPO
            </Text>
          </Link>

          {showMobileNav ? (
            <HStack gap="2">
              <IconButton aria-label="Pesquisar" variant="ghost" size="sm">
                <SearchIcon />
              </IconButton>
              <IconButton aria-label="Carrinho" variant="ghost" size="sm">
                <CartIcon />
              </IconButton>
              <IconButton
                aria-label="Abrir menu"
                variant="ghost"
                size="lg"
                onClick={onOpenMenu}
              >
                <HamburgerIcon />
              </IconButton>
            </HStack>
          ) : (
            <HStack gap="6" flex="1" justify="center">
              {NAV_LINKS.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    fontWeight="semibold"
                    textTransform="uppercase"
                    fontSize="sm"
                    letterSpacing="wider"
                    color={active ? "primary" : "fg"}
                    borderBottom={active ? "2px solid" : undefined}
                    borderColor="primary"
                    pb="1"
                    _hover={{ color: "primary" }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </HStack>
          )}

          {!showMobileNav && (
            <HStack gap="2">
              <IconButton aria-label="Pesquisar" variant="ghost" size="sm">
                <SearchIcon />
              </IconButton>
              <IconButton aria-label="Carrinho" variant="ghost" size="sm">
                <CartIcon />
              </IconButton>
            </HStack>
          )}
        </HStack>
      </Box>
    </Box>
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

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}
