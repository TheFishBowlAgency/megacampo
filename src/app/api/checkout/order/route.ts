import { NextResponse } from "next/server";

import { getOrderByNumber } from "@/lib/orders/createOrder";
import { orderItemsToCartItems } from "@/lib/orders/mapOrderItems";
import type { MultibancoPaymentDetails } from "@/lib/payments/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");

    if (!orderNumber) {
      return NextResponse.json(
        { error: "Número de encomenda em falta." },
        { status: 400 },
      );
    }

    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json(
        { error: "Encomenda não encontrada." },
        { status: 404 },
      );
    }

    const paymentDetails = order.paymentDetails as
      | MultibancoPaymentDetails
      | {
          entity?: string;
          reference?: string;
          amount?: number;
          expiryDate?: string;
          requestId?: string;
        }
      | null;

    const totalAmount = Number(order.totalAmount);
    const base = {
      orderNumber: order.orderNumber,
      status: order.status,
      paymentMethod: order.paymentMethod,
      totalAmount,
      customer: {
        firstName: order.customerFirstName,
        lastName: order.customerLastName,
        email: order.customerEmail,
        phone: order.customerPhone ?? "",
        address: order.customerAddress,
        postalCode: order.customerPostalCode,
        city: order.customerCity,
        country: order.customerCountry,
        nif: order.customerNif ?? "",
      },
      items: orderItemsToCartItems(order.items),
    };

    if (order.paymentMethod === "multibanco") {
      const entity = order.multibancoEntity ?? paymentDetails?.entity;
      const reference = order.multibancoReference ?? paymentDetails?.reference;

      if (entity && reference) {
        const multibancoAmount = Number(
          paymentDetails?.amount ?? order.totalAmount,
        );

        return NextResponse.json({
          ...base,
          multibanco: {
            entity,
            reference,
            amount: multibancoAmount,
            expiryDate:
              paymentDetails?.expiryDate ??
              (order.paymentExpiresAt
                ? new Date(order.paymentExpiresAt).toISOString()
                : ""),
          },
        });
      }
    }

    return NextResponse.json(base);
  } catch (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json(
      { error: "Não foi possível obter a encomenda." },
      { status: 500 },
    );
  }
}
