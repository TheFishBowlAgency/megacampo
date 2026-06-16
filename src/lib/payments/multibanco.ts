import type { MultibancoReferenceResult } from './types';

const MULTIBANCO_API_BASE = 'https://api.ifthenpay.com/multibanco/reference';

function getMbKey(): string {
  const key = process.env.MB_KEY || process.env.MBWAY_KEY;
  if (!key) {
    throw new Error('MB_KEY is not configured');
  }
  return key;
}

function getMultibancoEndpoint(): '/init' | '/sandbox' {
  return process.env.MULTIBANCO_SANDBOX === 'true' ? '/sandbox' : '/init';
}

function parseStatusCode(status: string | undefined): string {
  if (!status) return '';
  return status.substring(0, 1);
}

interface MultibancoReferenceResponse {
  Amount?: number;
  Entity?: number;
  ExpiryDate?: string;
  Message?: string;
  OrderId?: string;
  Reference?: string;
  RequestId?: string;
  Status?: string;
}

export async function createMultibancoReference(input: {
  orderId: string;
  amount: string;
  description?: string;
  url?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  expiryDays?: number;
}): Promise<MultibancoReferenceResult> {
  const response = await fetch(
    `${MULTIBANCO_API_BASE}${getMultibancoEndpoint()}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mbKey: getMbKey(),
        orderId: input.orderId,
        amount: input.amount,
        description: input.description,
        url: input.url,
        clientName: input.clientName,
        clientEmail: input.clientEmail,
        clientPhone: input.clientPhone,
        expiryDays: input.expiryDays,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Não foi possível gerar a referência Multibanco.');
  }

  const data = (await response.json()) as MultibancoReferenceResponse;
  const status = parseStatusCode(data.Status);

  if (status !== '0' || !data.RequestId || !data.Entity || !data.Reference) {
    throw new Error(data.Message || 'A referência Multibanco não foi gerada.');
  }

  return {
    requestId: data.RequestId,
    orderId: data.OrderId || input.orderId,
    amount: Number(data.Amount ?? input.amount),
    entity: String(data.Entity),
    reference: data.Reference,
    expiryDate: data.ExpiryDate || '',
    status,
    message: data.Message || 'Success',
  };
}
