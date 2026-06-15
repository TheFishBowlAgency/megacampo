import type { CartLineItem } from '@/components/cart/types';
import type { CheckoutFormData } from '@/components/checkout/CheckoutForm';
import type { PaymentMethod } from '@/lib/payments/types';

export interface CheckoutValidationResult {
  valid: boolean;
  errors: string[];
}

const REQUIRED_FIELDS: Array<keyof CheckoutFormData> = [
  'firstName',
  'lastName',
  'address',
  'postalCode',
  'city',
  'country',
  'email',
];

export function validateCheckoutInput(input: {
  formData: CheckoutFormData;
  items: CartLineItem[];
  paymentMethod: PaymentMethod;
  acceptTerms: boolean;
}): CheckoutValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!input.formData[field]?.trim()) {
      errors.push('Preenche todos os campos obrigatórios.');
      break;
    }
  }

  if (!input.acceptTerms) {
    errors.push('Aceita os termos e condições para continuar.');
  }

  if (!input.items.length) {
    errors.push('O carrinho está vazio.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
