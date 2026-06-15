'use client';

import { Box, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { PayPalCheckoutButtons } from './CheckoutPayment';

interface CheckoutSubmitSectionProps {
  paymentMethod: string;
  disabled: boolean;
  isSubmitting: boolean;
  error: string | null;
  onMultibancoSubmit: () => void;
  onPreparePayPal: () => Promise<string | null>;
  onPaymentSuccess: (orderNumber: string) => void;
  onPaymentFailure: (message: string) => void;
}

export function CheckoutSubmitSection({
  paymentMethod,
  disabled,
  isSubmitting,
  error,
  onMultibancoSubmit,
  onPreparePayPal,
  onPaymentSuccess,
  onPaymentFailure,
}: CheckoutSubmitSectionProps) {
  const [paypalOrderNumber, setPaypalOrderNumber] = useState<string | null>(
    null,
  );

  const activePaypalOrderNumber =
    paymentMethod === 'paypal' ? paypalOrderNumber : null;

  const handlePayPalClick = async () => {
    if (activePaypalOrderNumber) return;
    const orderNumber = await onPreparePayPal();
    if (orderNumber) {
      setPaypalOrderNumber(orderNumber);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap="4">
      {error && (
        <Text textStyle="body" color="red.500">
          {error}
        </Text>
      )}

      {paymentMethod === 'paypal' ? (
        activePaypalOrderNumber ? (
          <PayPalCheckoutButtons
            orderNumber={activePaypalOrderNumber}
            disabled={disabled}
            onError={onPaymentFailure}
            onSuccess={onPaymentSuccess}
          />
        ) : (
          <Button
            w="full"
            bg="primary"
            color="white"
            borderRadius="6px"
            h="56px"
            textStyle="button"
            textTransform="uppercase"
            disabled={disabled || isSubmitting}
            _hover={{ bg: 'primary.muted', color: 'fg' }}
            onClick={() => void handlePayPalClick()}
          >
            {isSubmitting ? 'A preparar...' : 'Continuar com PayPal'}
          </Button>
        )
      ) : (
        <Button
          w="full"
          bg="primary"
          color="white"
          borderRadius="6px"
          h="56px"
          textStyle="button"
          textTransform="uppercase"
          disabled={disabled || isSubmitting}
          _hover={{ bg: 'primary.muted', color: 'fg' }}
          onClick={onMultibancoSubmit}
        >
          {isSubmitting ? 'A processar...' : 'Reservar'}
        </Button>
      )}
    </Box>
  );
}
