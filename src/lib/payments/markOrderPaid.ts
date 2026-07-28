import {
  getOrderByNumber,
  updateOrderByNumber,
} from "@/lib/orders/createOrder";
import { amountsMatch, parseAmount } from "@/lib/payments/money";
import {
  recordPayment,
  type PaymentProvider,
} from "@/lib/payments/recordPayment";

export class PaymentAmountMismatchError extends Error {
  constructor(expected: number, actual: number) {
    super(
      `Valor do pagamento (${actual.toFixed(2)}€) não corresponde ao total da encomenda (${expected.toFixed(2)}€).`,
    );
    this.name = "PaymentAmountMismatchError";
  }
}

export interface MarkOrderPaidInput {
  orderNumber: string;
  amount: number;
  provider: PaymentProvider;
  providerPaymentId?: string;
  providerEventId?: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  paymentDetails?: unknown;
  paymentType?: "capture" | "callback";
  attemptNumber?: number;
  rawPayload?: unknown;
}

export async function markOrderPaid(input: MarkOrderPaidInput) {
  const order = await getOrderByNumber(input.orderNumber);
  if (!order) {
    throw new Error("Encomenda não encontrada.");
  }

  const expected = Number(order.totalAmount);
  if (!amountsMatch(expected, input.amount)) {
    throw new PaymentAmountMismatchError(expected, input.amount);
  }

  if (order.status === "paid") {
    if (input.providerEventId) {
      await recordPayment({
        orderId: order.id,
        orderNumber: order.orderNumber,
        provider: input.provider,
        type: input.paymentType ?? "capture",
        status: "succeeded",
        amount: input.amount,
        providerPaymentId: input.providerPaymentId,
        providerEventId: input.providerEventId,
        attemptNumber: input.attemptNumber,
        rawPayload: input.rawPayload ?? input.paymentDetails ?? null,
      });
    }
    return order;
  }

  if (order.status === "refunded") {
    throw new Error("Esta encomenda já foi reembolsada.");
  }

  if (order.status === "cancelled" || order.status === "expired") {
    throw new Error("Esta encomenda já não pode ser paga.");
  }

  const updated = await updateOrderByNumber(order.orderNumber, {
    status: "paid",
    paidAt: new Date().toISOString(),
    ...(input.paypalOrderId ? { paypalOrderId: input.paypalOrderId } : {}),
    ...(input.paypalCaptureId
      ? { paypalCaptureId: input.paypalCaptureId }
      : {}),
    ...(input.paymentDetails !== undefined
      ? { paymentDetails: input.paymentDetails }
      : {}),
  });

  await recordPayment({
    orderId: order.id,
    orderNumber: order.orderNumber,
    provider: input.provider,
    type: input.paymentType ?? "capture",
    status: "succeeded",
    amount: input.amount,
    providerPaymentId: input.providerPaymentId ?? input.paypalCaptureId,
    providerEventId: input.providerEventId,
    attemptNumber: input.attemptNumber,
    rawPayload: input.rawPayload ?? input.paymentDetails ?? null,
  });

  return updated;
}

export async function markOrderRefunded(input: {
  orderNumber: string;
  amount: number;
  provider: PaymentProvider;
  providerPaymentId?: string;
  providerEventId?: string;
  rawPayload?: unknown;
}) {
  const order = await getOrderByNumber(input.orderNumber);
  if (!order) {
    throw new Error("Encomenda não encontrada.");
  }

  const refundAmount = parseAmount(input.amount) ?? 0;
  const orderTotal = Number(order.totalAmount);
  const isFullRefund = amountsMatch(orderTotal, refundAmount);

  await recordPayment({
    orderId: order.id,
    orderNumber: order.orderNumber,
    provider: input.provider,
    type: "refund",
    status: "refunded",
    amount: refundAmount,
    providerPaymentId: input.providerPaymentId,
    providerEventId: input.providerEventId,
    rawPayload: input.rawPayload ?? null,
  });

  if (isFullRefund && order.status === "paid") {
    return updateOrderByNumber(order.orderNumber, {
      status: "refunded",
      paymentDetails: input.rawPayload,
    });
  }

  return order;
}
