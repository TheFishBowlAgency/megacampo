"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { CartLineItem } from "@/components/cart/types";

export interface CheckoutOrderSummaryProps {
  items: CartLineItem[];
  editCartHref?: string;
}

function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",") + "€";
}

function getDisplayInfo(item: CartLineItem) {
  if (item.productSubtitle) {
    return { category: item.productName, itemName: item.productSubtitle };
  }
  const parts = item.productName.split(" ");
  return {
    category: parts[0],
    itemName: parts.slice(1).join(" ") || parts[0],
  };
}

/**
 * Orange purchase summary card for the checkout page.
 * Displays line items, details, and the total.
 */
export function CheckoutOrderSummary({
  items,
  editCartHref = "/carrinho",
}: CheckoutOrderSummaryProps) {
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <Box
      bg="primary"
      borderRadius="5px"
      p="5"
      display="flex"
      flexDirection="column"
      gap="16"
    >
      {/* Header */}
      <Box display="flex" flexDirection="column" gap="4">
        <Text textStyle="h3" color="fg">
          Resumo da Compra
        </Text>
        <Link href={editCartHref} textStyle="body" color="fg">
          Editar Carrinho
        </Link>
      </Box>

      {/* Line Items + Total */}
      <Box display="flex" flexDirection="column" gap="8">
        {items.map((item, idx) => {
          const { category, itemName } = getDisplayInfo(item);
          const lineTotal = item.unitPrice * item.quantity;
          const allDetails = [
            ...item.details.map((d) => `${d.label}: ${d.value}`),
            `Quantidade: ${item.quantity}`,
          ];

          return (
            <Box key={item.id}>
              <Box display="flex" flexDirection="column" gap="4" mb="8">
                <Text textStyle="body" color="fg">
                  {category}
                </Text>
                <Flex justify="space-between" align="center">
                  <Text textStyle="h5" color="fg">
                    {itemName}
                  </Text>
                  <Text textStyle="h5" color="fg">
                    {formatPrice(lineTotal)}
                  </Text>
                </Flex>
                <Box display="flex" flexDirection="column" gap="3">
                  {allDetails.map((detail) => (
                    <Text key={detail} textStyle="body" color="fg">
                      {detail}
                    </Text>
                  ))}
                </Box>
              </Box>
              {idx < items.length - 1 && <Box h="1px" bg="fg" w="full" />}
            </Box>
          );
        })}

        <Box h="1px" bg="fg" w="full" />

        {/* Total */}
        <Flex justify="space-between" align="center">
          <Text textStyle="h5" color="grayLight">
            Total
          </Text>
          <Text textStyle="h5" color="grayLight">
            {formatPrice(total)}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
