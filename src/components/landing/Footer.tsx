import { Box, Grid, Link, Text, VStack } from "@chakra-ui/react";
import { Container } from "@/components/layout";

const PHONE = "+351 912 345 678";
const EMAIL = "geral@megacampo.pt";
const ADDRESS = "Parque de Paintball, 1234-567 Lugar";
const HOURS_FRIDAY = "Sexta: 14h–22h";
const HOURS_SATURDAY = "Sábado: 10h–22h";

export function Footer() {
  return (
    <Box bg="bg.subtle" py={{ base: "10", md: "14" }} id="contactos">
      <Container>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "auto 1fr 1fr auto",
          }}
          gap={{ base: "8", lg: "10" }}
          alignItems="start"
        >
          {/* Logo */}
          <Text
            fontFamily="heading"
            fontSize="xl"
            fontWeight="normal"
            color="fg"
            letterSpacing="wider"
          >
            MEGA CAMPO
          </Text>

          {/* Contacta-nos */}
          <VStack align="stretch" gap="3">
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              color="fg"
            >
              Contacta-nos
            </Text>
            <Link
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              color="fg.muted"
              _hover={{ color: "primary" }}
            >
              {PHONE}
            </Link>
            <Link href="#" color="fg.muted" _hover={{ color: "primary" }}>
              WhatsApp
            </Link>
            <Text color="fg.muted" fontSize="sm">
              {ADDRESS}
            </Text>
            <Link
              href={`mailto:${EMAIL}`}
              color="fg.muted"
              _hover={{ color: "primary" }}
            >
              {EMAIL}
            </Link>
          </VStack>

          {/* Horário */}
          <VStack align="stretch" gap="2">
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              color="fg"
            >
              Horário
            </Text>
            <Text color="fg.muted" fontSize="sm">
              {HOURS_FRIDAY}
            </Text>
            <Text color="fg.muted" fontSize="sm">
              {HOURS_SATURDAY}
            </Text>
          </VStack>

          {/* Segue-nos */}
          <VStack align="stretch" gap="3">
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              color="fg"
            >
              Segue-nos
            </Text>
            <Box display="flex" gap="3">
              <Link
                href="#"
                aria-label="Facebook"
                color="fg.muted"
                _hover={{ color: "primary" }}
              >
                <FacebookIcon />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                color="fg.muted"
                _hover={{ color: "primary" }}
              >
                <InstagramIcon />
              </Link>
            </Box>
          </VStack>
        </Grid>

        {/* Bottom bar */}
        <Box
          mt={{ base: "10", md: "12" }}
          pt="6"
          borderTopWidth="1px"
          borderColor="gray.200"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "flex-start", md: "center" }}
          gap="4"
        >
          <Box display="flex" gap="6">
            <Link
              href="#"
              fontSize="sm"
              color="fg.muted"
              _hover={{ color: "primary" }}
            >
              Termos de utilização
            </Link>
            <Link
              href="#"
              fontSize="sm"
              color="fg.muted"
              _hover={{ color: "primary" }}
            >
              Política de privacidade
            </Link>
          </Box>
          <Text fontSize="sm" color="fg.muted">
            Copyright © 2026 Megacampo. Todos os direitos reservados.
          </Text>
        </Box>
      </Container>
    </Box>
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
