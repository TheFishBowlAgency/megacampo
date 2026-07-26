"use client";

import {
  Box,
  Grid,
  IconButton,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import type { CartLineItem } from "./types";
import { formatPriceWithCurrency } from "@/lib/catalog/formatPrice";
import { getCartItemDisplay } from "./getCartItemDisplay";
import { QuantityStepper } from "./QuantityStepper";

export interface CartItemRowProps {
  item: CartLineItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function PlaceholderImage({ size = 90 }: { size?: number }) {
  return (
    <Box
      w={`${size}px`}
      h={`${size}px`}
      flexShrink={0}
      bg="bg.subtle"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <svg
        width={size > 60 ? 40 : 24}
        height={size > 60 ? 40 : 24}
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

function ProductThumb({
  imageUrl,
  size = 90,
}: {
  imageUrl?: string;
  size?: number;
}) {
  if (!imageUrl) return <PlaceholderImage size={size} />;
  return (
    <Box
      w={`${size}px`}
      h={`${size}px`}
      flexShrink={0}
      overflow="hidden"
      bg="bg.subtle"
    >
      <img
        src={imageUrl}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
}

function DeleteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

const DESKTOP_COLS = "340px 1fr 240px 220px 70px";

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const isTable = useBreakpointValue({ base: false, md: true }) ?? false;
  const { category, itemName } = getCartItemDisplay(item);

  if (isTable) {
    return (
      <Grid
        templateColumns={DESKTOP_COLS}
        gap="2.5"
        alignItems="center"
        py="5"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <Box display="flex" alignItems="center" gap="6">
          <ProductThumb imageUrl={item.imageUrl} size={90} />
          <VStack align="stretch" gap="0" minW="0">
            <Text
              fontSize={{ base: "md", xl: "body.lg" }}
              color="fg"
              fontWeight="normal"
            >
              {category}
            </Text>
            <Text
              fontSize={{ base: "md", xl: "body.lg" }}
              color="fg"
              fontWeight="extrabold"
              textTransform="uppercase"
            >
              {itemName}
            </Text>
          </VStack>
        </Box>

        <VStack align="stretch" gap="1" minW="0">
          {item.details.length > 0 ? (
            item.details.map((d) => (
              <Text
                key={`${d.label}-${d.value}`}
                fontSize={{ base: "md", xl: "body.lg" }}
                color="fg"
              >
                {d.label}: {d.value}
              </Text>
            ))
          ) : (
            <Text fontSize={{ base: "md", xl: "body.lg" }} color="fg.muted">
              –
            </Text>
          )}
        </VStack>

        <QuantityStepper
          value={item.quantity}
          onChange={(q) => onQuantityChange(item.id, q)}
          aria-label={`Quantidade de ${item.productName}`}
        />

        <Text
          fontWeight="extrabold"
          color="fg"
          fontSize={{ base: "md", xl: "body.lg" }}
        >
          {formatPriceWithCurrency(item.unitPrice)}
        </Text>

        <IconButton
          aria-label={`Remover ${item.productName}`}
          variant="ghost"
          size="sm"
          color="fg"
          justifySelf="end"
          onClick={() => onRemove(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  }

  return (
    <Grid
      templateColumns="56px 1fr auto auto auto"
      gap="2"
      alignItems="center"
      py="3"
      borderBottomWidth="1px"
      borderColor="gray.200"
    >
      <ProductThumb imageUrl={item.imageUrl} size={56} />
      <VStack align="stretch" gap="0" minW="0">
        <Text fontSize="xs" color="fg.muted">
          {category}
        </Text>
        <Text
          fontWeight="extrabold"
          color="fg"
          fontSize="sm"
          textTransform="uppercase"
        >
          {itemName}
        </Text>
        {item.details.length > 0 && (
          <Text fontSize="xs" color="fg.muted" mt="0.5">
            {item.details.map((d) => `${d.label}: ${d.value}`).join(", ")}
          </Text>
        )}
      </VStack>
      <QuantityStepper
        value={item.quantity}
        onChange={(q) => onQuantityChange(item.id, q)}
        aria-label={`Quantidade de ${item.productName}`}
      />
      <Text fontWeight="extrabold" color="fg" fontSize="sm" whiteSpace="nowrap">
        {formatPriceWithCurrency(item.unitPrice)}
      </Text>
      <IconButton
        aria-label={`Remover ${item.productName}`}
        variant="ghost"
        size="xs"
        color="fg"
        onClick={() => onRemove(item.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
}
