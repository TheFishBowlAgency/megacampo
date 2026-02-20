"use client";

import {
  Box,
  Grid,
  Text,
  Textarea,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Container } from "@/components/layout";
import type { CartLineItem } from "./types";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";

export interface CartWithItemsViewProps {
  items: CartLineItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  observations?: string;
  onObservationsChange?: (value: string) => void;
}

function formatTotal(items: CartLineItem[]): string {
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(total);
}

export function CartWithItemsView({
  items,
  onQuantityChange,
  onRemove,
  observations = "",
  onObservationsChange,
}: CartWithItemsViewProps) {
  const isTable = useBreakpointValue({ base: false, md: true }) ?? false;

  return (
    <Container>
      <Box py={{ base: "6", md: "8" }}>
        {isTable && (
          <>
            <Grid
              templateColumns="80px 1fr 140px 100px 40px"
              gap="4"
              alignItems="center"
              pb="3"
              borderBottomWidth="2px"
              borderColor="gray.300"
              mb="2"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="fg.muted"
              >
                Produto
              </Text>
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="fg.muted"
              >
                Detalhes
              </Text>
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="fg.muted"
              >
                Quantidade
              </Text>
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="fg.muted"
              >
                Preço unitário
              </Text>
              <Box />
            </Grid>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))}
          </>
        )}

        {!isTable && (
          <>
            <Grid
              templateColumns="1fr auto"
              gap="2"
              alignItems="center"
              pb="2"
              mb="2"
              borderBottomWidth="1px"
              borderColor="gray.300"
            >
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="fg.muted"
              >
                Produto / Detalhes / Quantidade
              </Text>
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                color="fg.muted"
              >
                Preço unitário
              </Text>
            </Grid>
            <Box display="flex" flexDirection="column" gap="0">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onQuantityChange={onQuantityChange}
                  onRemove={onRemove}
                />
              ))}
            </Box>
            <CartSummary total={formatTotal(items)} mt="4" />
            <Box mt="4">
              <Textarea
                id="cart-observations"
                placeholder="Observações"
                value={observations}
                onChange={(e) => onObservationsChange?.(e.target.value)}
                rows={3}
                bg="white"
                borderColor="gray.200"
                _placeholder={{ color: "fg.muted" }}
              />
            </Box>
          </>
        )}

        {isTable && (
          <Grid templateColumns="1fr 380px" gap="6" alignItems="stretch" mt="6">
            <Box display="flex" flexDirection="column" minH="0">
              <Textarea
                id="cart-observations-desktop"
                placeholder="Notas para a tua reserva..."
                value={observations}
                onChange={(e) => onObservationsChange?.(e.target.value)}
                flex="1"
                minH="0"
                resize="none"
                bg="white"
                borderColor="gray.200"
                _placeholder={{ color: "fg.muted" }}
              />
            </Box>
            <CartSummary total={formatTotal(items)} mt="0" />
          </Grid>
        )}
      </Box>
    </Container>
  );
}
