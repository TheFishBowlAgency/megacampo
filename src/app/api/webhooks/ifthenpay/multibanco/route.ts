import { NextResponse } from "next/server";

import { getOrderByNumber } from "@/lib/orders/createOrder";
import {
  PaymentAmountMismatchError,
  markOrderPaid,
} from "@/lib/payments/markOrderPaid";
import { getMultibancoAntiPhishingKey } from "@/lib/payments/multibanco";
import { parseAmount } from "@/lib/payments/money";

/**
 * ifthenpay Multibanco payment callback (HTTP GET).
 * Activate with ifthenpay using this URL template and IFTHENPAY_ANTI_PHISHING_KEY.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const orderId = searchParams.get("orderId");
    const amountRaw = searchParams.get("amount");
    const requestId = searchParams.get("requestId");
    const entity = searchParams.get("entity");
    const reference = searchParams.get("reference");
    const paymentDatetime = searchParams.get("payment_datetime");

    const expectedKey = getMultibancoAntiPhishingKey();
    if (!key || key !== expectedKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!orderId || !amountRaw) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const amount = parseAmount(amountRaw);
    if (amount == null) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await getOrderByNumber(orderId);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.paymentMethod !== "multibanco") {
      return NextResponse.json(
        { error: "Wrong payment method" },
        { status: 400 },
      );
    }

    if (
      requestId &&
      order.multibancoRequestId &&
      order.multibancoRequestId !== requestId
    ) {
      return NextResponse.json(
        { error: "Request ID mismatch" },
        { status: 400 },
      );
    }

    if (
      reference &&
      order.multibancoReference &&
      order.multibancoReference !== reference
    ) {
      return NextResponse.json(
        { error: "Reference mismatch" },
        { status: 400 },
      );
    }

    if (entity && order.multibancoEntity && order.multibancoEntity !== entity) {
      return NextResponse.json({ error: "Entity mismatch" }, { status: 400 });
    }

    const eventId = [
      "mb-callback",
      orderId,
      requestId || order.multibancoRequestId || "unknown",
      amountRaw,
      paymentDatetime || "",
    ].join(":");

    await markOrderPaid({
      orderNumber: order.orderNumber,
      amount,
      provider: "multibanco",
      providerPaymentId:
        requestId || order.multibancoRequestId || reference || undefined,
      providerEventId: eventId,
      paymentType: "callback",
      paymentDetails: {
        entity,
        reference,
        amount,
        requestId,
        paymentDatetime,
      },
      rawPayload: Object.fromEntries(searchParams.entries()),
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("ifthenpay Multibanco callback error:", error);

    if (error instanceof PaymentAmountMismatchError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Callback failed";
    if (message === "Esta encomenda já foi reembolsada.") {
      return NextResponse.json({ error: message }, { status: 400 });
    }
    if (message === "Esta encomenda já não pode ser paga.") {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json({ error: "Callback failed" }, { status: 500 });
  }
}
