import {
  getOrderByNumber,
  updateOrderByNumber,
} from "@/lib/orders/createOrder";
import { markOrderPaid } from "@/lib/payments/markOrderPaid";
import { capturePayPalOrder } from "@/lib/payments/paypal";
import { recordPayment } from "@/lib/payments/recordPayment";
import { parseAmount } from "@/lib/payments/money";

export async function finalizePayPalPayment(
  orderNumber: string,
  paypalOrderId: string,
  options?: { providerEventId?: string },
): Promise<{ orderNumber: string; status: "paid" }> {
  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    throw new Error("Encomenda não encontrada.");
  }

  if (order.status === "paid") {
    return { orderNumber: order.orderNumber, status: "paid" };
  }

  if (order.paymentMethod !== "paypal") {
    throw new Error("Esta encomenda não usa PayPal.");
  }

  if (order.status === "cancelled" || order.status === "expired") {
    throw new Error("Esta encomenda já não pode ser paga.");
  }

  if (order.paypalOrderId && order.paypalOrderId !== paypalOrderId) {
    throw new Error("Identificador PayPal inválido.");
  }

  const capture = await capturePayPalOrder(paypalOrderId);
  const capturedAmount =
    parseAmount(capture.amount) ?? Number(order.totalAmount);

  if (capture.status !== "COMPLETED") {
    await updateOrderByNumber(order.orderNumber, {
      status: "failed",
      paymentDetails: capture,
    });

    await recordPayment({
      orderId: order.id,
      orderNumber: order.orderNumber,
      provider: "paypal",
      type: "capture",
      status: "failed",
      amount: capturedAmount,
      providerPaymentId: capture.captureId ?? paypalOrderId,
      providerEventId: options?.providerEventId,
      rawPayload: capture,
    });

    throw new Error("O pagamento PayPal não foi concluído.");
  }

  await markOrderPaid({
    orderNumber: order.orderNumber,
    amount: capturedAmount,
    provider: "paypal",
    providerPaymentId: capture.captureId ?? paypalOrderId,
    providerEventId: options?.providerEventId,
    paypalOrderId,
    paypalCaptureId: capture.captureId,
    paymentDetails: capture,
    paymentType: "capture",
  });

  return { orderNumber: order.orderNumber, status: "paid" };
}
