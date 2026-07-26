import type { CollectionConfig } from "payload";

import { anyone, hideFromNonOperations, operationsAdmin } from "@/access/roles";
import { adminGroups } from "@/i18n/adminGroups";
import { bl } from "@/i18n/labels";

export const Orders: CollectionConfig = {
  slug: "orders",
  labels: {
    singular: { pt: "Encomenda", en: "Order" },
    plural: { pt: "Encomendas", en: "Orders" },
  },
  admin: {
    useAsTitle: "orderNumber",
    defaultColumns: [
      "orderNumber",
      "status",
      "paymentMethod",
      "multibancoReference",
      "customerEmail",
      "totalAmount",
      "createdAt",
    ],
    group: adminGroups.operations,
    hidden: hideFromNonOperations,
  },
  access: {
    read: operationsAdmin,
    create: anyone,
    update: operationsAdmin,
    delete: operationsAdmin,
  },
  fields: [
    {
      name: "orderNumber",
      type: "text",
      label: bl("Número da encomenda", "Order number"),
      required: true,
      unique: true,
      admin: {
        description: bl(
          "Identificador da encomenda (máx. 25 caracteres para Multibanco).",
          "Order identifier (max 25 chars for Multibanco).",
        ),
      },
    },
    {
      name: "status",
      type: "select",
      label: bl("Estado", "Status"),
      required: true,
      defaultValue: "pending",
      options: [
        { label: bl("Pendente", "Pending"), value: "pending" },
        {
          label: bl("Aguarda pagamento", "Awaiting payment"),
          value: "awaiting_payment",
        },
        { label: bl("Pago", "Paid"), value: "paid" },
        { label: bl("Falhou", "Failed"), value: "failed" },
        { label: bl("Expirado", "Expired"), value: "expired" },
        { label: bl("Cancelado", "Cancelled"), value: "cancelled" },
      ],
      admin: {
        description: bl(
          "Multibanco: marcar como Pago manualmente no dia da visita. PayPal: atualizado automaticamente.",
          "Multibanco: mark as Paid manually on visit day. PayPal: updated automatically.",
        ),
      },
    },
    {
      name: "paymentMethod",
      type: "select",
      label: bl("Método de pagamento", "Payment method"),
      required: true,
      options: [
        { label: bl("Multibanco", "Multibanco"), value: "multibanco" },
        { label: bl("PayPal", "PayPal"), value: "paypal" },
      ],
    },
    {
      name: "customerFirstName",
      type: "text",
      label: bl("Nome", "First name"),
      required: true,
    },
    {
      name: "customerLastName",
      type: "text",
      label: bl("Apelido", "Last name"),
      required: true,
    },
    {
      name: "customerEmail",
      type: "email",
      label: bl("Email", "Email"),
      required: true,
    },
    {
      name: "customerPhone",
      type: "text",
      label: bl("Telefone", "Phone"),
    },
    {
      name: "customerAddress",
      type: "text",
      label: bl("Morada", "Address"),
      required: true,
    },
    {
      name: "customerPostalCode",
      type: "text",
      label: bl("Código postal", "Postal code"),
      required: true,
    },
    {
      name: "customerCity",
      type: "text",
      label: bl("Cidade", "City"),
      required: true,
    },
    {
      name: "customerCountry",
      type: "text",
      label: bl("País", "Country"),
      required: true,
    },
    {
      name: "customerNif",
      type: "text",
      label: bl("NIF", "Tax ID (NIF)"),
    },
    {
      name: "acceptMarketing",
      type: "checkbox",
      label: bl("Aceita marketing", "Accept marketing"),
      defaultValue: false,
    },
    {
      name: "observations",
      type: "textarea",
      label: bl("Observações", "Observations"),
    },
    {
      name: "items",
      type: "json",
      label: bl("Itens", "Items"),
      required: true,
    },
    {
      name: "totalAmount",
      type: "number",
      label: bl("Valor total", "Total amount"),
      required: true,
      min: 0,
      admin: {
        description: bl("Total da encomenda em EUR.", "Order total in EUR."),
      },
    },
    {
      name: "multibancoEntity",
      type: "text",
      label: bl("Entidade Multibanco", "Multibanco entity"),
      admin: {
        condition: (data) => data.paymentMethod === "multibanco",
      },
    },
    {
      name: "multibancoReference",
      type: "text",
      label: bl("Referência Multibanco", "Multibanco reference"),
      admin: {
        condition: (data) => data.paymentMethod === "multibanco",
        description: bl(
          "Referência Multibanco apresentada ao cliente.",
          "Multibanco reference shown to the customer.",
        ),
      },
    },
    {
      name: "multibancoRequestId",
      type: "text",
      label: bl("ID do pedido Multibanco", "Multibanco request ID"),
      admin: {
        condition: (data) => data.paymentMethod === "multibanco",
      },
    },
    {
      name: "paypalOrderId",
      type: "text",
      label: bl("ID da encomenda PayPal", "PayPal order ID"),
      admin: {
        condition: (data) => data.paymentMethod === "paypal",
      },
    },
    {
      name: "paymentDetails",
      type: "json",
      label: bl("Detalhes de pagamento", "Payment details"),
      admin: {
        description: bl(
          "Metadados brutos da resposta do fornecedor de pagamento.",
          "Raw payment provider response metadata.",
        ),
      },
    },
  ],
};
