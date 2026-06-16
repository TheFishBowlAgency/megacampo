'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from '@/components/ui';
import { useCart } from '@/providers';

export function CheckoutSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const paypalToken = searchParams.get('token');
  const [isFinalizing, setIsFinalizing] = useState(
    Boolean(paypalToken && orderNumber),
  );
  const [finalizeError, setFinalizeError] = useState<string | null>(null);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!paypalToken || !orderNumber) return;

    let cancelled = false;

    const finalize = async () => {
      try {
        const response = await fetch('/api/checkout/paypal/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderNumber,
            paypalOrderId: paypalToken,
          }),
        });

        const data = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(
            data.error || 'Não foi possível confirmar o pagamento.',
          );
        }
      } catch (error) {
        if (!cancelled) {
          setFinalizeError(
            error instanceof Error
              ? error.message
              : 'Não foi possível confirmar o pagamento.',
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

  if (isFinalizing) {
    return (
      <Box maxW="640px" mx="auto" textAlign="center">
        <Text textStyle="body" color="fg.muted">
          A confirmar o pagamento...
        </Text>
      </Box>
    );
  }

  return (
    <Box maxW="640px" mx="auto" textAlign="center">
      <Text textStyle="h3" color="fg" mb="4">
        Reserva confirmada
      </Text>
      {finalizeError ? (
        <Text textStyle="body" color="red.500" mb="6">
          {finalizeError}
        </Text>
      ) : (
        <Text textStyle="body" color="fg" mb="6">
          O teu pagamento foi recebido com sucesso.
          {orderNumber ? ` Referência: ${orderNumber}.` : ''}
        </Text>
      )}
      <Text textStyle="body" color="fg.muted" mb="8">
        Receberás um e-mail com os detalhes da tua reserva em breve.
      </Text>
      <Button
        asChild
        bg="primary"
        color="white"
        borderRadius="6px"
        h="56px"
        px="8"
        textStyle="button"
        textTransform="uppercase"
        _hover={{ bg: 'primary.muted', color: 'fg' }}
      >
        <Link href="/">Voltar ao início</Link>
      </Button>
    </Box>
  );
}
