import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import Image from "next/image";

const PHONE_FIXED = "+351 214 876 088";
const PHONE_MOBILE = "+351 913 402 013";
const EMAIL = "info@megacampo.com";
const ADDRESS_LINE_1 = "Avenida do Megacampo, Lugar da Romã";
const ADDRESS_LINE_2 = "Sobral da Abalheira, 2640-615 Mafra";

export function Footer() {
  return (
    <Box as="footer" id="contactos">
      <Box h="1px" bg="dark" />
      <Box py={{ base: "6", md: "10", lg: "16" }}>
        <Box maxW="1320px" mx="auto" px={{ base: "5", md: "6", lg: "8" }}>
          <Grid
            templateColumns={{
              base: "auto 1fr",
              lg: "auto 1fr auto auto",
            }}
            gap={{ base: "6", lg: "24" }}
            alignItems="start"
          >
            {/* Logo */}
            <Box>
              <Image
                src="/logo.png"
                alt="Megacampo"
                width={139}
                height={80}
                style={{ height: "auto", width: "auto", maxWidth: "139px" }}
              />
            </Box>

            {/* Contact info */}
            <VStack
              align="stretch"
              gap={{ base: "4", lg: "8" }}
              gridColumn={{ base: "2", lg: "auto" }}
            >
              <Text
                textStyle="h4"
                fontSize={{ base: "md", lg: "display.h3" }}
                color="fg"
                textTransform="uppercase"
              >
                CONTACTA-NOS
              </Text>

              <VStack align="stretch" gap={{ base: "4", lg: "6" }}>
                {/* Phone */}
                <HStack gap={{ base: "3", lg: "8" }} align="start">
                  <Box flexShrink={0} mt="1">
                    <PhoneIcon />
                  </Box>
                  <VStack align="stretch" gap="1">
                    <Link
                      href={`tel:${PHONE_FIXED.replace(/\s/g, "")}`}
                      color="fg"
                      fontSize={{ base: "sm", lg: "body.lg" }}
                      _hover={{ color: "primary" }}
                    >
                      {PHONE_FIXED}*
                    </Link>
                    <Link
                      href={`tel:${PHONE_MOBILE.replace(/\s/g, "")}`}
                      color="fg"
                      fontSize={{ base: "sm", lg: "body.lg" }}
                      _hover={{ color: "primary" }}
                    >
                      {PHONE_MOBILE}**
                    </Link>
                  </VStack>
                </HStack>

                {/* Address */}
                <HStack gap={{ base: "3", lg: "8" }} align="start">
                  <Box flexShrink={0} mt="1">
                    <LocationIcon />
                  </Box>
                  <Text
                    color="fg"
                    fontSize={{ base: "sm", lg: "body.lg" }}
                    lineHeight="1.5"
                  >
                    {ADDRESS_LINE_1}
                    <br />
                    {ADDRESS_LINE_2}
                  </Text>
                </HStack>

                {/* Email */}
                <HStack gap={{ base: "3", lg: "8" }} align="center">
                  <Box flexShrink={0}>
                    <EmailIcon />
                  </Box>
                  <Link
                    href={`mailto:${EMAIL}`}
                    color="fg"
                    fontSize={{ base: "sm", lg: "body.lg" }}
                    _hover={{ color: "primary" }}
                  >
                    {EMAIL}
                  </Link>
                </HStack>
              </VStack>

              {/* Phone notes */}
              <VStack align="stretch" gap="1">
                <Text color="fg.muted" fontSize={{ base: "xs", lg: "body.lg" }}>
                  *Chamada para rede fixa nacional
                </Text>
                <Text color="fg.muted" fontSize={{ base: "xs", lg: "body.lg" }}>
                  **Chamada para rede móvel nacional
                </Text>
              </VStack>
            </VStack>

            {/* Hours */}
            <VStack
              align="stretch"
              gap={{ base: "3", lg: "8" }}
              gridColumn={{ base: "2", lg: "auto" }}
            >
              <Text
                textStyle="h4"
                fontSize={{ base: "md", lg: "display.h3" }}
                color="fg"
                textTransform="uppercase"
              >
                HORÁRIO
              </Text>
              <VStack align="stretch" gap="1">
                <Text color="fg" fontSize={{ base: "sm", lg: "body.lg" }}>
                  <Text as="span" fontWeight="extrabold">
                    Manhã:
                  </Text>{" "}
                  9h30 - 13h00
                </Text>
                <Text color="fg" fontSize={{ base: "sm", lg: "body.lg" }}>
                  <Text as="span" fontWeight="extrabold">
                    Tarde:
                  </Text>{" "}
                  14h00 - 17h30
                </Text>
              </VStack>
            </VStack>

            {/* Social */}
            <VStack
              align="stretch"
              gap={{ base: "3", lg: "8" }}
              gridColumn={{ base: "2", lg: "auto" }}
            >
              <Text
                textStyle="h4"
                fontSize={{ base: "md", lg: "display.h3" }}
                color="fg"
                textTransform="uppercase"
              >
                SEGUE-NOS
              </Text>
              <HStack gap="4">
                <Link
                  href="https://facebook.com"
                  external
                  aria-label="Facebook"
                  color="fg"
                  _hover={{ color: "primary" }}
                >
                  <FacebookIcon />
                </Link>
                <Link
                  href="https://instagram.com"
                  external
                  aria-label="Instagram"
                  color="fg"
                  _hover={{ color: "primary" }}
                >
                  <InstagramIcon />
                </Link>
              </HStack>
            </VStack>
          </Grid>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box h="1px" bg="fg.muted" />
      <Box py={{ base: "4", lg: "6" }}>
        <Box maxW="1320px" mx="auto" px={{ base: "5", md: "6", lg: "8" }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify={{ base: "flex-start", lg: "space-between" }}
            align={{ base: "flex-start", lg: "center" }}
            gap={{ base: "3", lg: "0" }}
          >
            <Link
              href="/termos"
              fontWeight="extrabold"
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "body.lg" }}
              color="fg"
              _hover={{ color: "primary" }}
            >
              TERMOS DE UTILIZAÇÃO
            </Link>
            <Link
              href="/privacidade"
              fontWeight="extrabold"
              textTransform="uppercase"
              fontSize={{ base: "sm", lg: "body.lg" }}
              color="fg"
              _hover={{ color: "primary" }}
            >
              POLÍTICA DE PRIVACIDADE
            </Link>
            <Text color="fg.muted" fontSize={{ base: "xs", lg: "body.lg" }}>
              © Copyright 2025 by Megacampo
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 19.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M16 1C10.48 1 6 5.48 6 11c0 7.5 10 18 10 18s10-10.5 10-18c0-5.52-4.48-10-10-10z" />
      <circle cx="16" cy="11" r="3" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="32"
      height="30"
      viewBox="0 0 32 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="4" width="28" height="22" rx="3" />
      <path d="M2 7l14 9 14-9" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="40"
      height="40"
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
