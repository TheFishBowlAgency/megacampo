import { NextResponse } from 'next/server';

import { formatAmountForPayment } from '@/lib/orders/calculateTotal';
import {
  getOrderByNumber,
  updateOrderByNumber,
} from '@/lib/orders/createOrder';
import { createPayPalOrder } from '@/lib/payments/paypal';

function getAppUrl(request: Request): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith('http')
      ? process.env.VERCEL_URL
      : `https://${process.env.VERCEL_URL}`;
  }
  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { orderNumber: string };

    if (!body.orderNumber) {
      return NextResponse.json(
        { error: 'Número de encomenda em falta.' },
        { status: 400 },
      );
    }

    const order = await getOrderByNumber(body.orderNumber);
    if (!order) {
      return NextResponse.json(
        { error: 'Encomenda não encontrada.' },
        { status: 404 },
      );
    }

    if (order.paymentMethod !== 'paypal') {
      return NextResponse.json(
        { error: 'Esta encomenda não usa PayPal.' },
        { status: 400 },
      );
    }

    const appUrl = getAppUrl(request);
    const amount = formatAmountForPayment(order.totalAmount);

    const result = await createPayPalOrder({
      orderNumber: order.orderNumber,
      amount,
      description: `Reserva Megacampo ${order.orderNumber}`,
      returnUrl: `${appUrl}/api/checkout/paypal/return?order=${order.orderNumber}`,
      cancelUrl: `${appUrl}/checkout/erro?order=${order.orderNumber}`,
    });

    await updateOrderByNumber(order.orderNumber, {
      status: 'awaiting_payment',
      paypalOrderId: result.paypalOrderId,
      paymentDetails: result,
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      paypalOrderId: result.paypalOrderId,
    });
  } catch (error) {
    console.error('PayPal create error:', error);
    return NextResponse.json(
      { error: 'Não foi possível iniciar o pagamento PayPal.' },
      { status: 500 },
    );
  }
}
