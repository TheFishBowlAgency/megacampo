import { NextResponse } from 'next/server';

import { validateCheckoutInput } from '@/lib/checkout/validation';
import { formatAmountForPayment } from '@/lib/orders/calculateTotal';
import { createOrderRecord } from '@/lib/orders/createOrder';
import type { CreateCheckoutPayload } from '@/lib/payments/types';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateCheckoutPayload;

    const validation = validateCheckoutInput({
      formData: body.formData,
      items: body.items,
      paymentMethod: body.paymentMethod,
      acceptTerms: body.acceptTerms,
    });

    if (!validation.valid) {
      return NextResponse.json({ error: validation.errors[0] }, { status: 400 });
    }

    const order = await createOrderRecord({
      formData: body.formData,
      items: body.items,
      observations: body.observations,
      paymentMethod: body.paymentMethod,
      acceptMarketing: body.acceptMarketing,
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      amount: formatAmountForPayment(order.totalAmount),
      paymentMethod: order.paymentMethod,
    });
  } catch (error) {
    console.error('Checkout create error:', error);
    return NextResponse.json(
      { error: 'Não foi possível criar a encomenda.' },
      { status: 500 },
    );
  }
}
