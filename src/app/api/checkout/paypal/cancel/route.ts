import { NextResponse } from "next/server";

import {
  getOrderByNumber,
  updateOrderByNumber,
} from "@/lib/orders/createOrder";
import { recordPayment } from "@/lib/payments/recordPayment";

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
      return NextResponse.json({
        orderNumber: order.orderNumber,
        status: order.status,
      });
    }

    if (order.status === "cancelled" || order.status === "expired") {
      return NextResponse.json({
        orderNumber: order.orderNumber,
        status: order.status,
      });
    }

    await updateOrderByNumber(order.orderNumber, {
      status: "cancelled",
    });

    await recordPayment({
      orderId: order.id,
      orderNumber: order.orderNumber,
      provider: "paypal",
      type: "cancellation",
      status: "cancelled",
      amount: Number(order.totalAmount),
      providerPaymentId: order.paypalOrderId || undefined,
      providerEventId: `pp-cancel-${order.orderNumber}-${Date.now()}`,
      rawPayload: { reason: "user_cancelled" },
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: "cancelled",
    });
  } catch (error) {
    console.error("PayPal cancel error:", error);
    return NextResponse.json(
      { error: "Não foi possível cancelar o pagamento PayPal." },
      { status: 500 },
    );
  }
}
