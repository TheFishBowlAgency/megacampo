import { NextResponse } from 'next/server';

import { finalizePayPalPayment } from '@/lib/payments/finalizePayPal';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      orderNumber: string;
      paypalOrderId: string;
    };

    if (!body.orderNumber || !body.paypalOrderId) {
      return NextResponse.json(
        { error: 'Dados de pagamento em falta.' },
        { status: 400 },
      );
    }

    const result = await finalizePayPalPayment(
      body.orderNumber,
      body.paypalOrderId,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('PayPal capture error:', error);
    const message =
      error instanceof Error
        ? error.message
        : 'Não foi possível confirmar o pagamento PayPal.';
    const status = message === 'Encomenda não encontrada.' ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
