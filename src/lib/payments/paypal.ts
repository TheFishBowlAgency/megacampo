import type { PayPalCreateResult } from "./types";
import { parseAmount } from "./money";

const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

function getPayPalCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured");
  }

  return { clientId, clientSecret };
}

export function getPayPalClientId(): string {
  return getPayPalCredentials().clientId;
}

export function getPayPalApiBase(): string {
  return PAYPAL_API_BASE;
}

export async function getPayPalAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getPayPalCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Não foi possível autenticar com o PayPal.");
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

type PayPalCaptureLike = {
  status: string;
  captureId?: string;
  amount?: string;
  currency?: string;
};

function extractCapture(data: {
  status: string;
  purchase_units?: Array<{
    amount?: { value?: string; currency_code?: string };
    payments?: {
      captures?: Array<{
        id: string;
        status: string;
        amount?: { value?: string; currency_code?: string };
      }>;
    };
  }>;
}): PayPalCaptureLike {
  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  const amount =
    capture?.amount?.value ??
    data.purchase_units?.[0]?.amount?.value ??
    undefined;
  const currency =
    capture?.amount?.currency_code ??
    data.purchase_units?.[0]?.amount?.currency_code ??
    undefined;

  return {
    status: data.status,
    captureId: capture?.id,
    amount,
    currency,
  };
}

async function getPayPalOrder(
  paypalOrderId: string,
): Promise<PayPalCaptureLike> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Não foi possível verificar o pagamento PayPal.");
  }

  const data = (await response.json()) as Parameters<typeof extractCapture>[0];
  return extractCapture(data);
}

export async function createPayPalOrder(input: {
  orderNumber: string;
  amount: string;
  description: string;
  returnUrl: string;
  cancelUrl: string;
}): Promise<PayPalCreateResult> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: input.orderNumber,
          custom_id: input.orderNumber,
          invoice_id: input.orderNumber,
          description: input.description,
          amount: {
            currency_code: "EUR",
            value: input.amount,
          },
        },
      ],
      application_context: {
        brand_name: "Megacampo",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Não foi possível criar a encomenda PayPal.");
  }

  const data = (await response.json()) as { id: string };
  return { paypalOrderId: data.id };
}

export async function capturePayPalOrder(
  paypalOrderId: string,
): Promise<PayPalCaptureLike> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      name?: string;
      details?: Array<{ issue?: string }>;
    } | null;

    const alreadyCaptured = errorBody?.details?.some(
      (detail) => detail.issue === "ORDER_ALREADY_CAPTURED",
    );

    if (alreadyCaptured) {
      return getPayPalOrder(paypalOrderId);
    }

    throw new Error("Não foi possível confirmar o pagamento PayPal.");
  }

  const data = (await response.json()) as Parameters<typeof extractCapture>[0];
  return extractCapture(data);
}

export async function verifyPayPalWebhookSignature(input: {
  headers: Headers;
  body: string;
  webhookEvent: unknown;
}): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    throw new Error("PAYPAL_WEBHOOK_ID is not configured");
  }

  const transmissionId = input.headers.get("paypal-transmission-id");
  const transmissionTime = input.headers.get("paypal-transmission-time");
  const certUrl = input.headers.get("paypal-cert-url");
  const authAlgo = input.headers.get("paypal-auth-algo");
  const transmissionSig = input.headers.get("paypal-transmission-sig");

  if (
    !transmissionId ||
    !transmissionTime ||
    !certUrl ||
    !authAlgo ||
    !transmissionSig
  ) {
    return false;
  }

  const accessToken = await getPayPalAccessToken();
  const response = await fetch(
    `${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_algo: authAlgo,
        cert_url: certUrl,
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        webhook_event: input.webhookEvent,
      }),
    },
  );

  if (!response.ok) {
    return false;
  }

  const data = (await response.json()) as {
    verification_status?: string;
  };

  return data.verification_status === "SUCCESS";
}

export function extractOrderNumberFromPayPalResource(
  resource: Record<string, unknown> | null | undefined,
): string | null {
  if (!resource) return null;

  const customId = resource.custom_id;
  if (typeof customId === "string" && customId.trim()) return customId.trim();

  const invoiceId = resource.invoice_id;
  if (typeof invoiceId === "string" && invoiceId.trim()) {
    return invoiceId.trim();
  }

  const purchaseUnits = resource.purchase_units;
  if (Array.isArray(purchaseUnits) && purchaseUnits[0]) {
    const unit = purchaseUnits[0] as Record<string, unknown>;
    if (typeof unit.custom_id === "string" && unit.custom_id.trim()) {
      return unit.custom_id.trim();
    }
    if (typeof unit.reference_id === "string" && unit.reference_id.trim()) {
      return unit.reference_id.trim();
    }
    if (typeof unit.invoice_id === "string" && unit.invoice_id.trim()) {
      return unit.invoice_id.trim();
    }
  }

  return null;
}

export function extractPayPalOrderIdFromResource(
  resource: Record<string, unknown> | null | undefined,
): string | null {
  if (!resource) return null;

  if (typeof resource.id === "string" && resource.intent) {
    return resource.id;
  }

  const supplementary = resource.supplementary_data as
    | { related_ids?: { order_id?: string } }
    | undefined;

  const relatedOrderId = supplementary?.related_ids?.order_id;
  if (typeof relatedOrderId === "string" && relatedOrderId.trim()) {
    return relatedOrderId.trim();
  }

  return typeof resource.id === "string" ? resource.id : null;
}

export { parseAmount };
