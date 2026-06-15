import { NextResponse } from 'next/server';

import { getOrderByNumber } from '@/lib/orders/createOrder';
import { finalizePayPalPayment } from '@/lib/payments/finalizePayPal';

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

export async function GET(request: Request) {
  const appUrl = getAppUrl(request);
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get('order');
  const paypalOrderId = searchParams.get('token');

  if (!orderNumber) {
    return NextResponse.redirect(`${appUrl}/checkout/erro`);
  }

  try {
    const order = await getOrderByNumber(orderNumber);

    if (!order) {
      return NextResponse.redirect(
        `${appUrl}/checkout/erro?order=${encodeURIComponent(orderNumber)}`,
      );
    }

    if (order.status === 'paid') {
      return NextResponse.redirect(
        `${appUrl}/checkout/sucesso?order=${encodeURIComponent(orderNumber)}`,
      );
    }

    const resolvedPayPalOrderId = paypalOrderId || order.paypalOrderId;
    if (!resolvedPayPalOrderId) {
      return NextResponse.redirect(
        `${appUrl}/checkout/erro?order=${encodeURIComponent(orderNumber)}`,
      );
    }

    await finalizePayPalPayment(orderNumber, resolvedPayPalOrderId);

    return NextResponse.redirect(
      `${appUrl}/checkout/sucesso?order=${encodeURIComponent(orderNumber)}`,
    );
  } catch (error) {
    console.error('PayPal return error:', error);
    return NextResponse.redirect(
      `${appUrl}/checkout/erro?order=${encodeURIComponent(orderNumber)}`,
    );
  }
}
