import { NextResponse } from "next/server";

import { formatAmountForPayment } from "@/lib/orders/calculateTotal";
import {
  getOrderByNumber,
  updateOrderByNumber,
} from "@/lib/orders/createOrder";
import {
  createMultibancoReference,
  multibancoExpiryIso,
} from "@/lib/payments/multibanco";
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

    if (order.paymentMethod !== "multibanco") {
      return NextResponse.json(
        { error: "Esta encomenda não usa Multibanco." },
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
    const clientName =
      `${order.customerFirstName} ${order.customerLastName}`.trim();
    const attemptNumber = await getNextPaymentAttemptNumber(order.id);

    const result = await createMultibancoReference({
      orderId: order.orderNumber,
      amount,
      description: `Reserva Megacampo ${order.orderNumber}`,
      url: appUrl,
      clientName,
      clientEmail: order.customerEmail,
      clientPhone: order.customerPhone || undefined,
      expiryDays: 3,
    });

    const paymentExpiresAt = multibancoExpiryIso(result.expiryDate, 3);

    await updateOrderByNumber(order.orderNumber, {
      status: "awaiting_payment",
      multibancoRequestId: result.requestId,
      multibancoEntity: result.entity,
      multibancoReference: result.reference,
      paymentExpiresAt,
      paymentDetails: result,
    });

    await recordPayment({
      orderId: order.id,
      orderNumber: order.orderNumber,
      provider: "multibanco",
      type: "attempt",
      status: "pending",
      amount: result.amount,
      attemptNumber,
      providerPaymentId: result.requestId,
      providerEventId: `mb-attempt-${order.orderNumber}-${attemptNumber}-${result.requestId}`,
      rawPayload: result,
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      entity: result.entity,
      reference: result.reference,
      amount: result.amount,
      expiryDate: result.expiryDate,
      message: result.message,
    });
  } catch (error) {
    console.error("Multibanco init error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Não foi possível gerar a referência Multibanco.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
