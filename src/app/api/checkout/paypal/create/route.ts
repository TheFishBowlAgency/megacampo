import { NextResponse } from "next/server";

import { formatAmountForPayment } from "@/lib/orders/calculateTotal";
import {
  getOrderByNumber,
  updateOrderByNumber,
} from "@/lib/orders/createOrder";
import { hoursFromNow } from "@/lib/payments/money";
import { createPayPalOrder } from "@/lib/payments/paypal";
import {
  getNextPaymentAttemptNumber,
  recordPayment,
} from "@/lib/payments/recordPayment";

function getAppUrl(request: Request): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL.startsWith("http")
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
        { error: "Número de encomenda em falta." },
        { status: 400 },
      );
    }

    const order = await getOrderByNumber(body.orderNumber);
    if (!order) {
      return NextResponse.json(
        { error: "Encomenda não encontrada." },
        { status: 404 },
      );
    }

    if (order.paymentMethod !== "paypal") {
      return NextResponse.json(
        { error: "Esta encomenda não usa PayPal." },
        { status: 400 },
      );
    }

    if (order.status === "paid" || order.status === "refunded") {
      return NextResponse.json(
        { error: "Esta encomenda já foi paga." },
        { status: 400 },
      );
    }

    if (order.status === "cancelled" || order.status === "expired") {
      return NextResponse.json(
        { error: "Esta encomenda já não pode ser paga." },
        { status: 400 },
      );
    }

    const appUrl = getAppUrl(request);
    const amount = formatAmountForPayment(order.totalAmount);
    const attemptNumber = await getNextPaymentAttemptNumber(order.id);

    const result = await createPayPalOrder({
      orderNumber: order.orderNumber,
      amount,
      description: `Reserva Megacampo ${order.orderNumber}`,
      returnUrl: `${appUrl}/api/checkout/paypal/return?order=${order.orderNumber}`,
      cancelUrl: `${appUrl}/checkout/erro?order=${order.orderNumber}&reason=cancelled`,
    });

    await updateOrderByNumber(order.orderNumber, {
      status: "awaiting_payment",
      paypalOrderId: result.paypalOrderId,
      paymentExpiresAt: hoursFromNow(3),
      paymentDetails: result,
    });

    await recordPayment({
      orderId: order.id,
      orderNumber: order.orderNumber,
      provider: "paypal",
      type: "attempt",
      status: "pending",
      amount: Number(order.totalAmount),
      attemptNumber,
      providerPaymentId: result.paypalOrderId,
      providerEventId: `pp-attempt-${order.orderNumber}-${attemptNumber}-${result.paypalOrderId}`,
      rawPayload: result,
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      paypalOrderId: result.paypalOrderId,
    });
  } catch (error) {
    console.error("PayPal create error:", error);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento PayPal." },
      { status: 500 },
    );
  }
}
