"use client";

import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  Link,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getCopyrightText } from "@/lib/site/defaults";
import { isNavLinkActive } from "@/lib/site/navActive";
import { useFooterContent, useHeaderContent, useSiteLocale } from "@/providers";

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { locale, setLocale } = useSiteLocale();
  const { logoSrc, logoAlt, topBar, mobileNavLinks, labels, languages } =
    useHeaderContent();
  const footer = useFooterContent();
  const phone = topBar.phone;

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
      aria-label={labels.menuAria}
    >
      <Box
        bg="primary"
        color="white"
        py="2"
        px="4"
        position="relative"
        zIndex="2"
      >
        <Text fontSize="sm" fontWeight="extrabold" textAlign="center" px="14">
          {topBar.contactLabel} {phone}
        </Text>
        <Box
          position="absolute"
          right="4"
          top="50%"
          transform="translateY(-50%)"
          zIndex="2"
        >
          <MenuRoot positioning={{ placement: "bottom-end" }}>
            <MenuTrigger
              type="button"
              aria-label={labels.languageSelectAria}
              py="1"
              px="2"
              borderRadius="md"
              bg="transparent"
              border="none"
              cursor="pointer"
              display="flex"
              alignItems="center"
              gap="1"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
              _expanded={{ bg: "whiteAlpha.200" }}
            >
              <Icon asChild size="md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </Icon>
              <Icon as={ChevronDownIcon} />
            </MenuTrigger>
            <MenuPositioner zIndex="popover">
              <MenuContent
                bg="white"
                color="fg"
                borderWidth="1px"
                borderColor="gray.200"
                py="1"
                minW="140px"
                zIndex="popover"
              >
                {languages.map((lang) => (
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
                    {lang.code === locale ? " ✓" : ""}
                  </MenuItem>
                ))}
              </MenuContent>
            </MenuPositioner>
          </MenuRoot>
        </Box>
      </Box>

      <Box
        position="relative"
        px="4"
        py="4"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <Flex justify="center" align="center">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={139}
            height={80}
            loading="eager"
            style={{ height: "auto", width: "auto", maxWidth: "80px" }}
          />
        </Flex>
        <CloseButton
          size="lg"
          onClick={onClose}
          aria-label={labels.closeMenuAria}
          position="absolute"
          right="4"
          top="50%"
          transform="translateY(-50%)"
        >
          <CloseIcon />
        </CloseButton>
      </Box>

      <VStack align="stretch" gap="0" px="4" py="6">
        {mobileNavLinks.map((item) => {
          const active = isNavLinkActive(pathname, item.href);
          return (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={onClose}
              py="4"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              fontWeight="medium"
              textTransform="uppercase"
              fontSize="md"
              color="fg"
              _hover={{ "& > span": { color: "primary" } }}
            >
              <Text
                as="span"
                display="inline-block"
                color={active ? "primary" : "inherit"}
                borderBottomWidth={active ? "3px" : "0"}
                borderBottomColor="primary"
                borderBottomStyle="solid"
                pb={active ? "0.5" : "0"}
                lineHeight="1.2"
              >
                {item.label}
              </Text>
              <ChevronRightIcon />
            </Link>
          );
        })}
      </VStack>

      <Box px="4" py="4" borderYWidth="1px" borderColor="gray.200">
        <VStack align="stretch" gap="3">
          <Link
            href={labels.cartHref}
            onClick={onClose}
            display="flex"
            alignItems="center"
            gap="3"
            _hover={{ color: "primary" }}
          >
            <CartIcon />
            <Text fontWeight="medium">{labels.bagLabel}</Text>
          </Link>
          <HStack gap="3">
            <SearchIcon />
            <Text fontWeight="medium">{labels.searchLabel}</Text>
          </HStack>
          <HStack gap="3" color="primary">
            <PhoneIcon />
            <Link
              href={`tel:${phone.replace(/\s/g, "")}`}
              fontWeight="semibold"
            >
              {phone.replace(/\s/g, " ")}
            </Link>
          </HStack>
        </VStack>
      </Box>

      <Box px="4" py="8">
        <Text fontWeight="bold" textTransform="uppercase" mb="4" fontSize="sm">
          {footer.social.title}
        </Text>
        <HStack gap="4" mb="6">
          {footer.social.links.map((link) => (
            <Link
              key={`${link.platform}-${link.url}`}
              href={link.url}
              aria-label={
                link.platform === "facebook" ? "Facebook" : "Instagram"
              }
            >
              {link.platform === "facebook" ? (
                <FacebookIcon />
              ) : (
                <InstagramIcon />
              )}
            </Link>
          ))}
        </HStack>
        <VStack align="stretch" gap="2" mb="6">
          {footer.legalLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
            >
              {link.label}
            </Link>
          ))}
        </VStack>
        <Text fontSize="xs" color="fg.muted">
          {getCopyrightText()}
        </Text>
      </Box>
    </Box>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
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
      strokeWidth="3"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
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
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
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
