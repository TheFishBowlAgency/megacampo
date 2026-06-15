import type { PayPalCreateResult } from './types';

const PAYPAL_API_BASE =
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

function getPayPalCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials are not configured');
  }

  return { clientId, clientSecret };
}

export function getPayPalClientId(): string {
  return getPayPalCredentials().clientId;
}

async function getPayPalAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getPayPalCredentials();
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64',
  );

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Não foi possível autenticar com o PayPal.');
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

async function getPayPalOrder(paypalOrderId: string): Promise<{
  status: string;
  captureId?: string;
}> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Não foi possível verificar o pagamento PayPal.');
  }

  const data = (await response.json()) as {
    status: string;
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{ id: string; status: string }>;
      };
    }>;
  };

  const captureId =
    data.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? undefined;

  return {
    status: data.status,
    captureId,
  };
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
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: input.orderNumber,
          description: input.description,
          amount: {
            currency_code: 'EUR',
            value: input.amount,
          },
        },
      ],
      application_context: {
        brand_name: 'Megacampo',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Não foi possível criar a encomenda PayPal.');
  }

  const data = (await response.json()) as { id: string };
  return { paypalOrderId: data.id };
}

export async function capturePayPalOrder(paypalOrderId: string): Promise<{
  status: string;
  captureId?: string;
}> {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(
    `${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as {
      name?: string;
      details?: Array<{ issue?: string }>;
    } | null;

    const alreadyCaptured = errorBody?.details?.some(
      (detail) => detail.issue === 'ORDER_ALREADY_CAPTURED',
    );

    if (alreadyCaptured) {
      return getPayPalOrder(paypalOrderId);
    }

    throw new Error('Não foi possível confirmar o pagamento PayPal.');
  }

  const data = (await response.json()) as {
    status: string;
    purchase_units?: Array<{
      payments?: {
        captures?: Array<{ id: string; status: string }>;
      };
    }>;
  };

  const captureId =
    data.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? undefined;

  return {
    status: data.status,
    captureId,
  };
}
