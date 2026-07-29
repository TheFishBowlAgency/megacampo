"use client";

import { Box, Button, Flex, Grid, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { CartLineItem } from "@/components/cart/types";
import { getCartItemDisplay } from "@/components/cart/getCartItemDisplay";
import { formatPriceWithCurrency } from "@/lib/catalog/formatPrice";

export interface ReservationCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  nif: string;
}

export interface ReservationMultibanco {
  entity: string;
  reference: string;
  amount: number | string;
  expiryDate?: string;
}

export interface ReservationConfirmationProps {
  orderNumber: string;
  items: CartLineItem[];
  totalAmount: number | string;
  customer?: ReservationCustomer | null;
  paymentMethod?: string | null;
  multibanco?: ReservationMultibanco | null;
  /** Optional status / capture error shown near the top */
  errorMessage?: string | null;
}

function parseAmount(value: number | string): number {
  if (typeof value === "number") return value;
  return Number.parseFloat(String(value).replace(",", "."));
}

function formatPrice(value: number | string): string {
  const amount = parseAmount(value);
  if (!Number.isFinite(amount)) return "—";
  return formatPriceWithCurrency(amount);
}

function PlaceholderThumb() {
  return (
    <Box
      w="90px"
      h="90px"
      flexShrink={0}
      bg="bg.subtle"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ color: "var(--chakra-colors-fg-muted)" }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="m3 9 9-6 9 6" />
        <path d="M3 15h18" />
      </svg>
    </Box>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Box>
      <Text
        fontSize={{ base: "md", xl: "body.lg" }}
        color="primary"
        fontWeight="normal"
        mb="1"
      >
        {label}
      </Text>
      <Text
        fontSize={{ base: "md", xl: "body.lg" }}
        color="fg"
        fontWeight="extrabold"
        textTransform="uppercase"
      >
        {value}
      </Text>
    </Box>
  );
}

export function ReservationConfirmation({
  orderNumber,
  items,
  totalAmount,
  customer,
  paymentMethod,
  multibanco,
  errorMessage,
}: ReservationConfirmationProps) {
  return (
    <Box display="flex" flexDirection="column" gap={{ base: "10", md: "14" }}>
      <Box>
        <Text textStyle="h2" color="primary" textTransform="uppercase" mb="4">
          Reserva Nº{orderNumber}
        </Text>
        <Text
          fontSize={{ base: "md", xl: "body.lg" }}
          fontWeight="extrabold"
          color="fg"
          whiteSpace="pre-line"
        >
          {errorMessage
            ? errorMessage
            : "Vais receber um e-mail a confirmar os dados da tua reserva.\nEsperamos por ti no Megacampo!"}
        </Text>
      </Box>

      <Box>
        <Text
          textStyle="h2"
          color="primary"
          textTransform="uppercase"
          mb={{ base: "6", md: "8" }}
        >
          Resumo da Reserva
        </Text>

        <Text
          fontSize={{ base: "md", xl: "body.lg" }}
          fontWeight="extrabold"
          color="fg"
          mb="6"
        >
          A tua atividade
        </Text>

        <VStack align="stretch" gap="8" mb="8">
          {items.map((item) => {
            const { category, itemName } = getCartItemDisplay(item);
            const lineTotal = item.unitPrice * item.quantity;
            return (
              <Flex
                key={item.id}
                gap="6"
                align="flex-start"
                justify="space-between"
                flexWrap="wrap"
              >
                <Flex gap="6" align="flex-start" minW="0" flex="1">
                  {item.imageUrl ? (
                    <Box w="90px" h="90px" flexShrink={0} overflow="hidden">
                      <img
                        src={item.imageUrl}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ) : (
                    <PlaceholderThumb />
                  )}
                  <Box minW="0">
                    <Text fontSize={{ base: "md", xl: "body.lg" }} color="fg">
                      {category}
                    </Text>
                    <Text
                      fontSize={{ base: "lg", xl: "display.h3" }}
                      fontWeight="semibold"
                      color="fg"
                      textTransform="uppercase"
                      mb="2"
                    >
                      {itemName}
                    </Text>
                    <VStack align="stretch" gap="1">
                      {item.details.map((d) => (
                        <Text
                          key={`${d.label}-${d.value}`}
                          fontSize={{ base: "md", xl: "body.lg" }}
                          color="fg"
                        >
                          {d.label}: {d.value}
                        </Text>
                      ))}
                      <Text fontSize={{ base: "md", xl: "body.lg" }} color="fg">
                        Quantidade: {item.quantity}
                      </Text>
                    </VStack>
                  </Box>
                </Flex>
                <Text
                  fontSize={{ base: "md", xl: "body.lg" }}
                  fontWeight="extrabold"
                  color="fg"
                  whiteSpace="nowrap"
                >
                  {formatPriceWithCurrency(lineTotal)}
                </Text>
              </Flex>
            );
          })}
        </VStack>

        <Box h="1px" bg="fg" w="full" mb="6" />
        <Flex justify="space-between" align="center">
          <Text fontSize={{ base: "md", xl: "body.lg" }} color="fg">
            Total
          </Text>
          <Text
            fontSize={{ base: "md", xl: "body.lg" }}
            fontWeight="extrabold"
            color="fg"
          >
            {formatPrice(totalAmount)}
          </Text>
        </Flex>
      </Box>

      {customer && (
        <Box>
          <Text
            fontSize={{ base: "md", xl: "body.lg" }}
            fontWeight="extrabold"
            color="primary"
            mb="6"
          >
            Os teus dados
          </Text>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: "5", md: "6" }}
            columnGap={{ md: "12" }}
          >
            <DataField label="Primeiro Nome" value={customer.firstName} />
            <DataField label="Último Nome" value={customer.lastName} />
            <DataField label="Morada" value={customer.address} />
            <DataField label="Código Postal" value={customer.postalCode} />
            <DataField label="Localidade" value={customer.city} />
            <DataField label="País" value={customer.country} />
            <DataField label="Endereço de E-mail" value={customer.email} />
            <DataField label="Telemóvel" value={customer.phone} />
            <DataField
              label="Número de Identificação Fiscal (NIF)"
              value={customer.nif}
            />
          </Grid>
        </Box>
      )}

      <Box>
        <Text
          fontSize={{ base: "md", xl: "body.lg" }}
          fontWeight="extrabold"
          color="fg"
          mb="4"
        >
          Método de Pagamento
        </Text>
        {paymentMethod === "multibanco" || multibanco ? (
          <Box>
            <Text
              fontSize={{ base: "md", xl: "body.lg" }}
              fontWeight="extrabold"
              color="primary"
              mb="4"
            >
              Referência Multibanco
            </Text>
            {multibanco && (
              <Grid
                templateColumns={{ base: "1fr", sm: "repeat(3, auto)" }}
                gap={{ base: "4", sm: "10" }}
                justifyContent="flex-start"
              >
                <DataField label="Entidade" value={String(multibanco.entity)} />
                <DataField
                  label="Referência"
                  value={String(multibanco.reference)}
                />
                <DataField
                  label="Montante"
                  value={formatPrice(multibanco.amount)}
                />
              </Grid>
            )}
          </Box>
        ) : (
          <Text fontSize={{ base: "md", xl: "body.lg" }} color="fg">
            PayPal
          </Text>
        )}
      </Box>

      <Box textAlign="center" pt={{ base: "4", md: "8" }}>
        <Text textStyle="h2" color="fg" textTransform="uppercase" mb="4">
          Obrigada pela tua reserva!
        </Text>
        <Text
          fontSize={{ base: "md", xl: "body.lg" }}
          fontWeight="extrabold"
          color="fg"
          mb="8"
        >
          Esperamos por ti no Megacampo!
        </Text>
        <Button
          asChild
          bg="primary"
          color="grayLight"
          borderRadius="0"
          h="60px"
          px="8"
          fontWeight="medium"
          textTransform="uppercase"
          fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
          _hover={{ opacity: 0.9 }}
        >
          <Link href="/#reservas">voltar às reservas</Link>
        </Button>
      </Box>
    </Box>
  );
}
