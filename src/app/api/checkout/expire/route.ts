import config from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";

import { recordPayment } from "@/lib/payments/recordPayment";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true;

  const { searchParams } = new URL(request.url);
  return searchParams.get("secret") === secret;
}

/**
 * Marks stale awaiting_payment orders as expired.
 * Protect with CRON_SECRET (Authorization: Bearer … or ?secret=).
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const now = new Date().toISOString();

    const result = await payload.find({
      collection: "orders",
      where: {
        and: [
          { status: { equals: "awaiting_payment" } },
          { paymentExpiresAt: { less_than_equal: now } },
        ],
      },
      limit: 100,
      overrideAccess: true,
    });

    let expired = 0;

    for (const order of result.docs) {
      await payload.update({
        collection: "orders",
        id: order.id,
        data: { status: "expired" },
        overrideAccess: true,
      });

      await recordPayment({
        orderId: order.id,
        orderNumber: order.orderNumber,
        provider: order.paymentMethod,
        type: "cancellation",
        status: "cancelled",
        amount: Number(order.totalAmount),
        providerPaymentId:
          order.paymentMethod === "paypal"
            ? order.paypalOrderId || undefined
            : order.multibancoRequestId || undefined,
        providerEventId: `expire-${order.orderNumber}-${now}`,
        rawPayload: {
          reason: "payment_expired",
          paymentExpiresAt: order.paymentExpiresAt,
        },
      });

      expired += 1;
    }

    return NextResponse.json({
      expired,
      checked: result.docs.length,
      at: now,
    });
  } catch (error) {
    console.error("Expire orders error:", error);
    return NextResponse.json(
      { error: "Não foi possível expirar encomendas." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}
