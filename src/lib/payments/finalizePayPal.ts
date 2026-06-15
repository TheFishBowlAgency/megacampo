import {
  getOrderByNumber,
  updateOrderByNumber,
} from '@/lib/orders/createOrder';
import { capturePayPalOrder } from '@/lib/payments/paypal';

export async function finalizePayPalPayment(
  orderNumber: string,
  paypalOrderId: string,
): Promise<{ orderNumber: string; status: 'paid' }> {
  const order = await getOrderByNumber(orderNumber);
  if (!order) {
    throw new Error('Encomenda não encontrada.');
  }

  if (order.status === 'paid') {
    return { orderNumber: order.orderNumber, status: 'paid' };
  }

  if (order.paymentMethod !== 'paypal') {
    throw new Error('Esta encomenda não usa PayPal.');
  }

  if (order.paypalOrderId && order.paypalOrderId !== paypalOrderId) {
    throw new Error('Identificador PayPal inválido.');
  }

  const capture = await capturePayPalOrder(paypalOrderId);

  if (capture.status !== 'COMPLETED') {
    await updateOrderByNumber(order.orderNumber, {
      status: 'failed',
      paymentDetails: capture,
    });
    throw new Error('O pagamento PayPal não foi concluído.');
  }

  await updateOrderByNumber(order.orderNumber, {
    status: 'paid',
    paypalOrderId,
    paymentDetails: capture,
  });

  return { orderNumber: order.orderNumber, status: 'paid' };
}
