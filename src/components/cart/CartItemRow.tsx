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
import { QuantityStepper } from "./QuantityStepper";

export interface CartItemRowProps {
  item: CartLineItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function PlaceholderImage() {
  return (
    <Box
      w="full"
      aspectRatio="4/3"
      bg="bg.subtle"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <svg
        width="48"
        height="48"
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

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const isTable = useBreakpointValue({ base: false, md: true }) ?? false;

  const detailsText =
    item.details.length > 0
      ? item.details.map((d) => `${d.label}: ${d.value}`).join(", ")
      : "–";

  if (isTable) {
    return (
      <Grid
        templateColumns="80px 1fr 140px 100px 40px"
        gap="4"
        alignItems="center"
        py="4"
        borderBottomWidth="1px"
        borderColor="gray.200"
        _last={{ borderBottomWidth: 0 }}
      >
        <Box
          w="full"
          aspectRatio="4/3"
          overflow="hidden"
          borderRadius="md"
          bg="bg.subtle"
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "var(--chakra-radii-md)",
              }}
            />
          ) : (
            <PlaceholderImage />
          )}
        </Box>
        <Box>
          <Text fontWeight="semibold" color="fg">
            {item.productName}
          </Text>
          {item.productSubtitle && (
            <Text fontSize="sm" color="fg.muted">
              {item.productSubtitle}
            </Text>
          )}
          <Text fontSize="sm" color="fg.muted" mt="1">
            {detailsText}
          </Text>
        </Box>
        <QuantityStepper
          value={item.quantity}
          onChange={(q) => onQuantityChange(item.id, q)}
          aria-label={`Quantidade de ${item.productName}`}
        />
        <Text fontWeight="medium" color="fg">
          {formatPrice(item.unitPrice)}
        </Text>
        <IconButton
          aria-label={`Remover ${item.productName}`}
          variant="ghost"
          size="sm"
          colorPalette="red"
          onClick={() => onRemove(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    );
  }

  // Mobile/tablet: compact row to match Figma (image | details | stepper | price | delete)
  const categoryLabel = item.productSubtitle ? item.productName : null;
  const nameLabel = item.productSubtitle
    ? item.productSubtitle
    : item.productName;

  return (
    <Grid
      templateColumns="56px 1fr auto auto auto"
      gap="2"
      alignItems="center"
      py="3"
      borderBottomWidth="1px"
      borderColor="gray.200"
      _last={{ borderBottomWidth: 0 }}
    >
      <Box
        w="14"
        h="14"
        flexShrink={0}
        overflow="hidden"
        borderRadius="md"
        bg="bg.subtle"
      >
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "var(--chakra-radii-md)",
            }}
          />
        ) : (
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <svg
              width="24"
              height="24"
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
        )}
      </Box>
      <VStack align="stretch" gap="0" minW="0">
        {categoryLabel && (
          <Text fontSize="xs" color="fg.muted">
            {categoryLabel}
          </Text>
        )}
        <Text fontWeight="bold" color="fg" fontSize="sm">
          {nameLabel}
        </Text>
        {item.details.length > 0 && (
          <Text fontSize="xs" color="fg.muted" mt="0.5">
            {detailsText}
          </Text>
        )}
      </VStack>
      <QuantityStepper
        value={item.quantity}
        onChange={(q) => onQuantityChange(item.id, q)}
        aria-label={`Quantidade de ${item.productName}`}
      />
      <Text fontWeight="medium" color="fg" fontSize="sm" whiteSpace="nowrap">
        {formatPrice(item.unitPrice)}
      </Text>
      <IconButton
        aria-label={`Remover ${item.productName}`}
        variant="ghost"
        size="xs"
        colorPalette="red"
        onClick={() => onRemove(item.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Grid>
  );
}
