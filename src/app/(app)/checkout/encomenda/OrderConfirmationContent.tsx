'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from '@/components/ui';
import { useCart } from '@/providers';
import { formatPriceWithCurrency } from '@/lib/catalog/formatPrice';

interface OrderPaymentInfo {
  orderNumber: string;
  status: string;
  totalAmount: number | string;
  multibanco?: {
    entity: string;
    reference: string;
    amount: number | string;
    expiryDate: string;
  };
}

function parseAmount(value: number | string): number {
  if (typeof value === 'number') return value;
  return Number.parseFloat(String(value).replace(',', '.'));
}

function formatPrice(value: number | string): string {
  const amount = parseAmount(value);
  if (!Number.isFinite(amount)) return '—';
  return formatPriceWithCurrency(amount);
}

export function OrderConfirmationContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  const [order, setOrder] = useState<OrderPaymentInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!orderNumber) {
      setError('Referência de encomenda em falta.');
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
          throw new Error(data.error || 'Não foi possível obter a encomenda.');
        }

        if (!cancelled) {
          setOrder(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Não foi possível obter a encomenda.',
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
      <Box maxW="640px" mx="auto" textAlign="center">
        <Text textStyle="body" color="fg.muted">
          A carregar...
        </Text>
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box maxW="640px" mx="auto" textAlign="center">
        <Text textStyle="body" color="red.500" mb="6">
          {error || 'Encomenda não encontrada.'}
        </Text>
        <Button
          asChild
          bg="primary"
          color="white"
          borderRadius="6px"
          h="56px"
          px="8"
        >
          <Link href="/checkout">Voltar ao checkout</Link>
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="640px" mx="auto">
      <Text textStyle="h3" color="fg" mb="4" textAlign="center">
        Reserva registada
      </Text>
      <Text textStyle="body" color="fg" mb="8" textAlign="center">
        A tua reserva foi criada com a referência {order.orderNumber}. Utiliza
        os dados abaixo para pagar por Multibanco.
      </Text>

      {order.multibanco ? (
        <Box
          bg="bg"
          borderRadius="6px"
          p="6"
          borderWidth="1px"
          borderColor="fg.muted"
          display="flex"
          flexDirection="column"
          gap="4"
          mb="8"
        >
          <Box>
            <Text textStyle="body" color="fg.muted" mb="1">
              Entidade
            </Text>
            <Text textStyle="h5" color="fg">
              {order.multibanco.entity}
            </Text>
          </Box>
          <Box>
            <Text textStyle="body" color="fg.muted" mb="1">
              Referência
            </Text>
            <Text textStyle="h5" color="fg">
              {order.multibanco.reference}
            </Text>
          </Box>
          <Box>
            <Text textStyle="body" color="fg.muted" mb="1">
              Montante
            </Text>
            <Text textStyle="h5" color="fg">
              {formatPrice(order.multibanco.amount)}
            </Text>
          </Box>
          {order.multibanco.expiryDate ? (
            <Box>
              <Text textStyle="body" color="fg.muted" mb="1">
                Validade
              </Text>
              <Text textStyle="body" color="fg">
                {order.multibanco.expiryDate}
              </Text>
            </Box>
          ) : null}
        </Box>
      ) : null}

      <Text textStyle="body" color="fg.muted" mb="8" textAlign="center">
        Efetua o pagamento através do Multibanco com os dados acima. A reserva
        será confirmada no dia da visita, no Megacampo.
      </Text>

      <Box textAlign="center">
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
    </Box>
  );
}
