"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { CartLineItem } from "@/components/cart/types";
import {
  ReservationConfirmation,
  type ReservationCustomer,
  type ReservationMultibanco,
} from "@/components/checkout/ReservationConfirmation";
import { useCart } from "@/providers";

interface OrderPaymentInfo {
  orderNumber: string;
  status: string;
  paymentMethod?: string;
  totalAmount: number | string;
  customer?: ReservationCustomer;
  items?: CartLineItem[];
  multibanco?: ReservationMultibanco;
}

export function OrderConfirmationContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<OrderPaymentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!orderNumber) {
      setError("Referência de encomenda em falta.");
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadOrder = async () => {
      try {
        const response = await fetch(
          `/api/checkout/order?orderNumber=${encodeURIComponent(orderNumber)}`,
        );
        const data = (await response.json()) as OrderPaymentInfo & {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "Não foi possível obter a encomenda.");
        }

        if (!cancelled) {
          setOrder(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível obter a encomenda.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadOrder();

    return () => {
      cancelled = true;
    };
  }, [orderNumber]);

  if (isLoading) {
    return (
      <Box py="12">
        <Text textStyle="body" color="fg.muted">
          A carregar...
        </Text>
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box maxW="640px" mx="auto" textAlign="center" py="12">
        <Text textStyle="body" color="red.500" mb="6">
          {error || "Encomenda não encontrada."}
        </Text>
        <Button
          asChild
          bg="primary"
          color="grayLight"
          borderRadius="0"
          h="60px"
          px="8"
        >
          <Link href="/checkout">Voltar ao checkout</Link>
        </Button>
      </Box>
    );
  }

  return (
    <ReservationConfirmation
      orderNumber={order.orderNumber}
      items={order.items ?? []}
      totalAmount={order.totalAmount}
      customer={order.customer}
      paymentMethod={order.paymentMethod}
      multibanco={order.multibanco}
    />
  );
}
