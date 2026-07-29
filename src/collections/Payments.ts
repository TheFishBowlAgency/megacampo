import type { CollectionConfig } from "payload";

import { hideFromNonOperations, operationsAdmin } from "@/access/roles";
import { adminGroups } from "@/i18n/adminGroups";
import { bl } from "@/i18n/labels";

export const Payments: CollectionConfig = {
  slug: "payments",
  labels: {
    singular: { pt: "Pagamento", en: "Payment" },
    plural: { pt: "Pagamentos", en: "Payments" },
  },
  admin: {
    useAsTitle: "providerPaymentId",
    defaultColumns: [
      "orderNumber",
      "provider",
      "type",
      "status",
      "amount",
      "providerPaymentId",
      "createdAt",
    ],
    group: adminGroups.operations,
    hidden: hideFromNonOperations,
    description: bl(
      "Registo de tentativas e eventos de pagamento (auditoria).",
      "Payment attempt and event audit log.",
    ),
  },
  access: {
    read: operationsAdmin,
    create: operationsAdmin,
    update: operationsAdmin,
    delete: operationsAdmin,
  },
  fields: [
    {
      name: "order",
      type: "relationship",
      relationTo: "orders",
      required: true,
      label: bl("Encomenda", "Order"),
      index: true,
    },
    {
      name: "orderNumber",
      type: "text",
      required: true,
      label: bl("Número da encomenda", "Order number"),
      index: true,
    },
    {
      name: "provider",
      type: "select",
      required: true,
      label: bl("Fornecedor", "Provider"),
      options: [
        { label: bl("Multibanco", "Multibanco"), value: "multibanco" },
        { label: bl("PayPal", "PayPal"), value: "paypal" },
      ],
    },
    {
      name: "type",
      type: "select",
      required: true,
      label: bl("Tipo", "Type"),
      options: [
        { label: bl("Tentativa", "Attempt"), value: "attempt" },
        { label: bl("Captura", "Capture"), value: "capture" },
        { label: bl("Callback", "Callback"), value: "callback" },
        { label: bl("Reembolso", "Refund"), value: "refund" },
        { label: bl("Cancelamento", "Cancellation"), value: "cancellation" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      label: bl("Estado", "Status"),
      options: [
        { label: bl("Pendente", "Pending"), value: "pending" },
        { label: bl("Sucesso", "Succeeded"), value: "succeeded" },
        { label: bl("Falhou", "Failed"), value: "failed" },
        { label: bl("Reembolsado", "Refunded"), value: "refunded" },
        { label: bl("Cancelado", "Cancelled"), value: "cancelled" },
      ],
    },
    {
      name: "amount",
      type: "number",
      required: true,
      min: 0,
      label: bl("Valor", "Amount"),
      admin: {
        description: bl("Valor em EUR.", "Amount in EUR."),
      },
    },
    {
      name: "currency",
      type: "text",
      required: true,
      defaultValue: "EUR",
      label: bl("Moeda", "Currency"),
    },
    {
      name: "attemptNumber",
      type: "number",
      required: true,
      defaultValue: 1,
      min: 1,
      label: bl("Nº da tentativa", "Attempt number"),
    },
    {
      name: "providerPaymentId",
      type: "text",
      label: bl("ID do fornecedor", "Provider payment ID"),
      index: true,
      admin: {
        description: bl(
          "Ex.: PayPal order/capture ID, Multibanco requestId/referência.",
          "E.g. PayPal order/capture ID, Multibanco requestId/reference.",
        ),
      },
    },
    {
      name: "providerEventId",
      type: "text",
      unique: true,
      label: bl("ID do evento", "Provider event ID"),
      index: true,
      admin: {
        description: bl(
          "Chave de idempotência do webhook/evento do fornecedor.",
          "Idempotency key for the provider webhook/event.",
        ),
      },
    },
    {
      name: "rawPayload",
      type: "json",
      label: bl("Payload bruto", "Raw payload"),
    },
  ],
};
