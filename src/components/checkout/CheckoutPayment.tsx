'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import type { CartLineItem } from '@/components/cart/types';
import type { CheckoutFormData } from '@/components/checkout/CheckoutForm';
import type { PaymentMethod } from '@/lib/payments/types';

interface PayPalCheckoutButtonsProps {
  orderNumber: string;
  disabled?: boolean;
  onError: (message: string) => void;
  onSuccess: (orderNumber: string) => void;
}

export function PayPalCheckoutButtons({
  orderNumber,
  disabled,
  onError,
  onSuccess,
}: PayPalCheckoutButtonsProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    return null;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: 'EUR',
        intent: 'capture',
      }}
    >
      <PayPalButtons
        disabled={disabled}
        style={{ layout: 'vertical', label: 'paypal' }}
        createOrder={async () => {
          const response = await fetch('/api/checkout/paypal/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderNumber }),
          });

          const data = (await response.json()) as {
            paypalOrderId?: string;
            error?: string;
          };

          if (!response.ok || !data.paypalOrderId) {
            throw new Error(data.error || 'Não foi possível iniciar o PayPal.');
          }

          return data.paypalOrderId;
        }}
        onApprove={async (data) => {
          const response = await fetch('/api/checkout/paypal/capture', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderNumber,
              paypalOrderId: data.orderID,
            }),
          });

          const result = (await response.json()) as {
            orderNumber?: string;
            error?: string;
          };

          if (!response.ok || !result.orderNumber) {
            throw new Error(
              result.error || 'Não foi possível confirmar o pagamento.',
            );
          }

          onSuccess(result.orderNumber);
        }}
        onError={() => {
          onError('Ocorreu um erro com o PayPal. Tenta novamente.');
        }}
        onCancel={() => {
          onError('Pagamento PayPal cancelado.');
        }}
      />
    </PayPalScriptProvider>
  );
}

export interface UseCheckoutOptions {
  formData: CheckoutFormData;
  items: CartLineItem[];
  observations: string;
  paymentMethod: PaymentMethod;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  clearCart: () => void;
}

export function useCheckout({
  formData,
  items,
  observations,
  paymentMethod,
  acceptTerms,
  acceptMarketing,
  clearCart,
}: UseCheckoutOptions) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingOrderNumber, setPendingOrderNumber] = useState<string | null>(
    null,
  );

  const handlePaymentSuccess = useCallback(
    (orderNumber: string) => {
      clearCart();
      router.push(`/checkout/sucesso?order=${orderNumber}`);
    },
    [clearCart, router],
  );

  const handlePaymentFailure = useCallback((message: string) => {
    setError(message);
    setIsSubmitting(false);
  }, []);

  const createOrder = useCallback(async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData,
        items,
        observations,
        paymentMethod,
        acceptTerms,
        acceptMarketing,
      }),
    });

    const data = (await response.json()) as {
      orderNumber?: string;
      error?: string;
    };

    if (!response.ok || !data.orderNumber) {
      throw new Error(data.error || 'Não foi possível criar a encomenda.');
    }

    return data.orderNumber;
  }, [
    acceptMarketing,
    acceptTerms,
    formData,
    items,
    observations,
    paymentMethod,
  ]);

  const submitMultibanco = useCallback(async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const orderNumber = await createOrder();
      setPendingOrderNumber(orderNumber);

      const response = await fetch('/api/checkout/multibanco', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(
          data.error || 'Não foi possível gerar a referência Multibanco.',
        );
      }

      clearCart();
      router.push(`/checkout/encomenda?order=${orderNumber}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível processar o pagamento.',
      );
      setIsSubmitting(false);
    }
  }, [clearCart, createOrder, router]);

  const preparePayPalOrder = useCallback(async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const orderNumber = await createOrder();
      setPendingOrderNumber(orderNumber);
      setIsSubmitting(false);
      return orderNumber;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível criar a encomenda.',
      );
      setIsSubmitting(false);
      return null;
    }
  }, [createOrder]);

  return {
    isSubmitting,
    error,
    pendingOrderNumber,
    submitMultibanco,
    preparePayPalOrder,
    handlePaymentSuccess,
    handlePaymentFailure,
    setError,
  };
}
