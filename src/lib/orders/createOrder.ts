import config from '@payload-config';
import { getPayload } from 'payload';

import type { CartLineItem } from '@/components/cart/types';
import type { CheckoutFormData } from '@/components/checkout/CheckoutForm';
import { calculateCartTotal } from '@/lib/orders/calculateTotal';
import { generateOrderNumber } from '@/lib/orders/generateOrderNumber';
import type { PaymentMethod } from '@/lib/payments/types';

export interface CreateOrderInput {
  formData: CheckoutFormData;
  items: CartLineItem[];
  observations: string;
  paymentMethod: PaymentMethod;
  acceptMarketing: boolean;
}

export async function createOrderRecord(input: CreateOrderInput) {
  const payload = await getPayload({ config });
  const orderNumber = generateOrderNumber();
  const totalAmount = calculateCartTotal(input.items);

  const order = await payload.create({
    collection: 'orders',
    data: {
      orderNumber,
      status: 'pending',
      paymentMethod: input.paymentMethod,
      customerFirstName: input.formData.firstName.trim(),
      customerLastName: input.formData.lastName.trim(),
      customerEmail: input.formData.email.trim(),
      customerPhone: input.formData.phone.trim() || undefined,
      customerAddress: input.formData.address.trim(),
      customerPostalCode: input.formData.postalCode.trim(),
      customerCity: input.formData.city.trim(),
      customerCountry: input.formData.country.trim(),
      customerNif: input.formData.nif.trim() || undefined,
      acceptMarketing: input.acceptMarketing,
      observations: input.observations.trim() || undefined,
      items: input.items,
      totalAmount,
    },
    overrideAccess: true,
  });

  return order;
}

export async function getOrderByNumber(orderNumber: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: 'orders',
    where: {
      orderNumber: {
        equals: orderNumber,
      },
    },
    limit: 1,
    overrideAccess: true,
  });

  return result.docs[0] ?? null;
}

export async function updateOrderByNumber(
  orderNumber: string,
  data: Record<string, unknown>,
) {
  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    throw new Error('Encomenda não encontrada.');
  }

  const payload = await getPayload({ config });
  return payload.update({
    collection: 'orders',
    id: order.id,
    data,
    overrideAccess: true,
  });
}
