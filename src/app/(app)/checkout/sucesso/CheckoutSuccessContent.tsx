"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { CartLineItem } from "@/components/cart/types";
import {
  ReservationConfirmation,
  type ReservationCustomer,
} from "@/components/checkout/ReservationConfirmation";
import { useCart } from "@/providers";

interface OrderPaymentInfo {
  orderNumber: string;
  status: string;
  paymentMethod?: string;
  totalAmount: number | string;
  customer?: ReservationCustomer;
  items?: CartLineItem[];
}

export function CheckoutSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const paypalToken = searchParams.get("token");
  const [isFinalizing, setIsFinalizing] = useState(
    Boolean(paypalToken && orderNumber),
  );
  const [finalizeError, setFinalizeError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderPaymentInfo | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!paypalToken || !orderNumber) return;

    let cancelled = false;

    const finalize = async () => {
      try {
        const response = await fetch("/api/checkout/paypal/capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNumber,
            paypalOrderId: paypalToken,
          }),
        });

        const data = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(
            data.error || "Não foi possível confirmar o pagamento.",
          );
        }
      } catch (error) {
        if (!cancelled) {
          setFinalizeError(
            error instanceof Error
              ? error.message
              : "Não foi possível confirmar o pagamento.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsFinalizing(false);
        }
      }
    };

    void finalize();

    return () => {
      cancelled = true;
    };
  }, [orderNumber, paypalToken]);

  useEffect(() => {
    if (!orderNumber || isFinalizing) return;

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
      } catch (error) {
        if (!cancelled) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Não foi possível obter a encomenda.",
          );
        }
      }
    };

    void loadOrder();

    return () => {
      cancelled = true;
    };
  }, [orderNumber, isFinalizing]);

  if (isFinalizing) {
    return (
      <Box py="12">
        <Text textStyle="body" color="fg.muted">
          A confirmar o pagamento...
        </Text>
      </Box>
    );
  }

  if (order) {
    return (
      <ReservationConfirmation
        orderNumber={order.orderNumber}
        items={order.items ?? []}
        totalAmount={order.totalAmount}
        customer={order.customer}
        paymentMethod={order.paymentMethod ?? "paypal"}
        errorMessage={finalizeError}
      />
    );
  }

  return (
    <Box maxW="640px" mx="auto" textAlign="center" py="12">
      <Text textStyle="h3" color="fg" mb="4">
        Reserva confirmada
      </Text>
      {finalizeError || loadError ? (
        <Text textStyle="body" color="red.500" mb="6">
          {finalizeError || loadError}
        </Text>
      ) : (
        <Text textStyle="body" color="fg" mb="6">
          O teu pagamento foi recebido com sucesso.
          {orderNumber ? ` Referência: ${orderNumber}.` : ""}
        </Text>
      )}
      <Text textStyle="body" color="fg.muted" mb="8">
        Receberás um e-mail com os detalhes da tua reserva em breve.
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
  );
}
