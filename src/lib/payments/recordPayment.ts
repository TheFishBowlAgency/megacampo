import config from "@payload-config";
import { getPayload } from "payload";

export type PaymentProvider = "multibanco" | "paypal";
export type PaymentType =
  | "attempt"
  | "capture"
  | "callback"
  | "refund"
  | "cancellation";
export type PaymentRecordStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "refunded"
  | "cancelled";

export interface RecordPaymentInput {
  orderId: string;
  orderNumber: string;
  provider: PaymentProvider;
  type: PaymentType;
  status: PaymentRecordStatus;
  amount: number;
  currency?: string;
  attemptNumber?: number;
  providerPaymentId?: string;
  providerEventId?: string;
  rawPayload?: unknown;
}

export async function getNextPaymentAttemptNumber(
  orderId: string,
): Promise<number> {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "payments",
    where: {
      and: [{ order: { equals: orderId } }, { type: { equals: "attempt" } }],
    },
    sort: "-attemptNumber",
    limit: 1,
    overrideAccess: true,
  });

  const latest = result.docs[0]?.attemptNumber;
  return typeof latest === "number" ? latest + 1 : 1;
}

export async function findPaymentByEventId(providerEventId: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "payments",
    where: {
      providerEventId: {
        equals: providerEventId,
      },
    },
    limit: 1,
    overrideAccess: true,
  });

  return result.docs[0] ?? null;
}

export async function recordPayment(input: RecordPaymentInput) {
  const payload = await getPayload({ config });

  if (input.providerEventId) {
    const existing = await findPaymentByEventId(input.providerEventId);
    if (existing) return existing;
  }

  return payload.create({
    collection: "payments",
    data: {
      order: String(input.orderId),
      orderNumber: input.orderNumber,
      provider: input.provider,
      type: input.type,
      status: input.status,
      amount: input.amount,
      currency: input.currency ?? "EUR",
      attemptNumber: input.attemptNumber ?? 1,
      providerPaymentId: input.providerPaymentId,
      providerEventId: input.providerEventId,
      rawPayload:
        input.rawPayload === undefined
          ? null
          : (input.rawPayload as
              | {
                  [k: string]: unknown;
                }
              | unknown[]
              | string
              | number
              | boolean
              | null),
    },
    overrideAccess: true,
  });
}
