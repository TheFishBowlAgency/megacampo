import { NextResponse } from 'next/server';

import { getOrderByNumber } from '@/lib/orders/createOrder';
import type { MultibancoPaymentDetails } from '@/lib/payments/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Número de encomenda em falta.' },
        { status: 400 },
      );
    }

    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json(
        { error: 'Encomenda não encontrada.' },
        { status: 404 },
      );
    }

    const paymentDetails = order.paymentDetails as
      | MultibancoPaymentDetails
      | {
          entity?: string;
          reference?: string;
          amount?: number;
          expiryDate?: string;
          requestId?: string;
        }
      | null;

    if (order.paymentMethod === 'multibanco' && paymentDetails) {
      return NextResponse.json({
        orderNumber: order.orderNumber,
        status: order.status,
        paymentMethod: order.paymentMethod,
        totalAmount: order.totalAmount,
        multibanco: {
          entity: paymentDetails.entity,
          reference: paymentDetails.reference,
          amount: paymentDetails.amount ?? order.totalAmount,
          expiryDate: paymentDetails.expiryDate,
        },
      });
    }

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
      paymentMethod: order.paymentMethod,
      totalAmount: order.totalAmount,
    });
  } catch (error) {
    console.error('Order lookup error:', error);
    return NextResponse.json(
      { error: 'Não foi possível obter a encomenda.' },
      { status: 500 },
    );
  }
}
