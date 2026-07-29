import type { MultibancoReferenceResult } from "./types";
import { parseIfthenpayDateTime } from "./money";

const MULTIBANCO_API_BASE = "https://api.ifthenpay.com/multibanco/reference";

function getMbKey(): string {
  const key = process.env.MB_KEY || process.env.MBWAY_KEY;
  if (!key) {
    throw new Error("MB_KEY is not configured");
  }
  return key;
}

function getMultibancoEndpoint(): "/init" | "/sandbox" {
  return process.env.MULTIBANCO_SANDBOX === "true" ? "/sandbox" : "/init";
}

function parseStatusCode(status: string | undefined): string {
  if (!status) return "";
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    throw new Error("Não foi possível gerar a referência Multibanco.");
  }

  const data = (await response.json()) as MultibancoReferenceResponse;
  const status = parseStatusCode(data.Status);

  if (status !== "0" || !data.RequestId || !data.Entity || !data.Reference) {
    throw new Error(data.Message || "A referência Multibanco não foi gerada.");
  }

  return {
    requestId: data.RequestId,
    orderId: data.OrderId || input.orderId,
    amount: Number(data.Amount ?? input.amount),
    entity: String(data.Entity),
    reference: data.Reference,
    expiryDate: data.ExpiryDate || "",
    status,
    message: data.Message || "Success",
  };
}

export function getMultibancoAntiPhishingKey(): string {
  const key = process.env.IFTHENPAY_ANTI_PHISHING_KEY;
  if (!key) {
    throw new Error("IFTHENPAY_ANTI_PHISHING_KEY is not configured");
  }
  return key;
}

export function multibancoExpiryIso(
  expiryDate: string | null | undefined,
  fallbackDays = 3,
): string {
  const parsed = parseIfthenpayDateTime(expiryDate);
  if (parsed) return parsed.toISOString();
  return new Date(
    Date.now() + fallbackDays * 24 * 60 * 60 * 1000,
  ).toISOString();
}

export function buildMultibancoCallbackUrl(appUrl: string): string {
  const base = appUrl.replace(/\/$/, "");
  return `${base}/api/webhooks/ifthenpay/multibanco?key=[ANTI_PHISHING_KEY]&orderId=[ORDER_ID]&amount=[amount]&requestId=[REQUEST_ID]&entity=[entity]&reference=[REFERENCE]&payment_datetime=[PAYMENT_DATETIME]`;
}
