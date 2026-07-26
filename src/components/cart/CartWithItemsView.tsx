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
import { formatPriceWithCurrency } from "@/lib/catalog/formatPrice";

export interface CartWithItemsViewProps {
  items: CartLineItem[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  observations?: string;
  onObservationsChange?: (value: string) => void;
}

function formatTotal(items: CartLineItem[]): string {
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  return formatPriceWithCurrency(total);
}

const DESKTOP_COLS = "340px 1fr 240px 220px 70px";

const headerTextProps = {
  fontSize: { base: "md", xl: "body.lg" } as const,
  fontWeight: "normal" as const,
  color: "fg.muted" as const,
};

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
      <Box py={{ base: "6", md: "10", xl: "14" }}>
        {isTable && (
          <>
            <Grid
              templateColumns={DESKTOP_COLS}
              gap="2.5"
              alignItems="center"
              pb="5"
              borderBottomWidth="1px"
              borderColor="dark"
              mb="2"
            >
              <Text {...headerTextProps}>Produto</Text>
              <Text {...headerTextProps}>Detalhes</Text>
              <Text {...headerTextProps}>Quantidade</Text>
              <Text {...headerTextProps}>Preço Unitário</Text>
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
              borderColor="dark"
            >
              <Text {...headerTextProps} fontSize="sm">
                Produto / Detalhes / Quantidade
              </Text>
              <Text {...headerTextProps} fontSize="sm">
                Preço Unitário
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
            <CartSummary total={formatTotal(items)} mt="6" />
            <Box mt="4">
              <Textarea
                id="cart-observations"
                placeholder="Observações"
                value={observations}
                onChange={(e) => onObservationsChange?.(e.target.value)}
                rows={5}
                minH="180px"
                bg="white"
                borderColor="fg.muted"
                borderRadius="0"
                px="4"
                py="4"
                fontSize={{ base: "md", xl: "body.lg" }}
                _placeholder={{ color: "fg.muted" }}
              />
            </Box>
          </>
        )}

        {isTable && (
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 369px" }}
            gap={{ base: "6", lg: "12" }}
            alignItems="stretch"
            mt="10"
          >
            <Box display="flex" flexDirection="column" minH="0">
              <Textarea
                id="cart-observations-desktop"
                placeholder="Observações"
                value={observations}
                onChange={(e) => onObservationsChange?.(e.target.value)}
                flex="1"
                minH="222px"
                resize="none"
                bg="white"
                borderColor="fg.muted"
                borderRadius="0"
                px="18px"
                py="18px"
                fontSize={{ base: "md", xl: "body.lg" }}
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
