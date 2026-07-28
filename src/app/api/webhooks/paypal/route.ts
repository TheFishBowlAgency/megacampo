import { NextResponse } from "next/server";

import {
  getOrderByNumber,
  getOrderByPayPalOrderId,
  updateOrderByNumber,
} from "@/lib/orders/createOrder";
import { finalizePayPalPayment } from "@/lib/payments/finalizePayPal";
import {
  markOrderPaid,
  markOrderRefunded,
  PaymentAmountMismatchError,
} from "@/lib/payments/markOrderPaid";
import { parseAmount } from "@/lib/payments/money";
import {
  extractOrderNumberFromPayPalResource,
  extractPayPalOrderIdFromResource,
  verifyPayPalWebhookSignature,
} from "@/lib/payments/paypal";
import { recordPayment } from "@/lib/payments/recordPayment";

type PayPalWebhookEvent = {
  id?: string;
  event_type?: string;
  resource?: Record<string, unknown>;
};

async function resolveOrderNumber(
  resource: Record<string, unknown> | undefined,
): Promise<string | null> {
  const fromResource = extractOrderNumberFromPayPalResource(resource);
  if (fromResource) return fromResource;

  const paypalOrderId = extractPayPalOrderIdFromResource(resource);
  if (!paypalOrderId) return null;

  const order = await getOrderByPayPalOrderId(paypalOrderId);
  return order?.orderNumber ?? null;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let event: PayPalWebhookEvent;

    try {
      event = JSON.parse(rawBody) as PayPalWebhookEvent;
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const valid = await verifyPayPalWebhookSignature({
      headers: request.headers,
      body: rawBody,
      webhookEvent: event,
    });

    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const eventType = event.event_type;
    const resource = event.resource;
    const eventId = event.id;

    if (!eventType || !resource) {
      return NextResponse.json({ received: true });
    }

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const orderNumber = await resolveOrderNumber(resource);
      if (!orderNumber) {
        console.error("PayPal webhook: order not found for capture", eventId);
        return NextResponse.json({ received: true });
      }

      const amountObj = resource.amount as
        | { value?: string; currency_code?: string }
        | undefined;
      const amount = parseAmount(amountObj?.value);
      const captureId =
        typeof resource.id === "string" ? resource.id : undefined;
      const paypalOrderId = extractPayPalOrderIdFromResource(resource);

      if (amount == null) {
        return NextResponse.json({ error: "Missing amount" }, { status: 400 });
      }

      // Prefer capture path when we still have a PayPal order id to reconcile.
      if (paypalOrderId) {
        try {
          await finalizePayPalPayment(orderNumber, paypalOrderId, {
            providerEventId: eventId,
          });
          return NextResponse.json({ received: true });
        } catch (error) {
          // Fall through to direct mark if already captured elsewhere.
          if (!(error instanceof Error) || !error.message.includes("já")) {
            console.error("PayPal webhook finalize fallback:", error);
          }
        }
      }

      await markOrderPaid({
        orderNumber,
        amount,
        provider: "paypal",
        providerPaymentId: captureId,
        providerEventId: eventId,
        paypalCaptureId: captureId,
        paymentType: "capture",
        paymentDetails: resource,
        rawPayload: event,
      });

      return NextResponse.json({ received: true });
    }

    if (eventType === "CHECKOUT.ORDER.APPROVED") {
      const orderNumber = await resolveOrderNumber(resource);
      const paypalOrderId =
        typeof resource.id === "string" ? resource.id : null;

      if (orderNumber && paypalOrderId) {
        try {
          await finalizePayPalPayment(orderNumber, paypalOrderId, {
            providerEventId: eventId
              ? `${eventId}:approved-capture`
              : undefined,
          });
        } catch (error) {
          console.error("PayPal APPROVED capture backup failed:", error);
        }
      }

      return NextResponse.json({ received: true });
    }

    if (eventType === "PAYMENT.CAPTURE.DENIED") {
      const orderNumber = await resolveOrderNumber(resource);
      if (orderNumber) {
        const order = await getOrderByNumber(orderNumber);
        if (order && order.status !== "paid" && order.status !== "refunded") {
          await updateOrderByNumber(orderNumber, {
            status: "failed",
            paymentDetails: resource,
          });
          await recordPayment({
            orderId: order.id,
            orderNumber,
            provider: "paypal",
            type: "capture",
            status: "failed",
            amount: Number(order.totalAmount),
            providerPaymentId:
              typeof resource.id === "string" ? resource.id : undefined,
            providerEventId: eventId,
            rawPayload: event,
          });
        }
      }
      return NextResponse.json({ received: true });
    }

    if (eventType === "PAYMENT.CAPTURE.REFUNDED") {
      const orderNumber = await resolveOrderNumber(resource);
      if (orderNumber) {
        const amountObj = resource.amount as { value?: string } | undefined;
        const amount =
          parseAmount(amountObj?.value) ??
          Number((await getOrderByNumber(orderNumber))?.totalAmount ?? 0);

        await markOrderRefunded({
          orderNumber,
          amount,
          provider: "paypal",
          providerPaymentId:
            typeof resource.id === "string" ? resource.id : undefined,
          providerEventId: eventId,
          rawPayload: event,
        });
      }
      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("PayPal webhook error:", error);

    if (error instanceof PaymentAmountMismatchError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
