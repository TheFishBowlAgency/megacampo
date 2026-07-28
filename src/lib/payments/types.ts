import type { CartLineItem } from "@/components/cart/types";
import type { CheckoutFormData } from "@/components/checkout/CheckoutForm";

export type PaymentMethod = "multibanco" | "paypal";

export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "paid"
  | "failed"
  | "expired"
  | "cancelled"
  | "refunded";

export interface CreateCheckoutPayload {
  formData: CheckoutFormData;
  items: CartLineItem[];
  observations: string;
  paymentMethod: PaymentMethod;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export interface MultibancoReferenceResult {
  requestId: string;
  orderId: string;
  amount: number;
  entity: string;
  reference: string;
  expiryDate: string;
  status: string;
  message: string;
}

export interface PayPalCreateResult {
  paypalOrderId: string;
}

export interface MultibancoPaymentDetails {
  entity: string;
  reference: string;
  amount: number;
  expiryDate: string;
  requestId: string;
}
