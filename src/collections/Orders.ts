import type { CollectionConfig } from "payload";

import { anyone, hideFromNonOperations, operationsAdmin } from "@/access/roles";
import { adminGroups } from "@/i18n/adminGroups";
import { bl, common } from "@/i18n/labels";

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
      type: "tabs",
      tabs: [
        {
          label: bl("Resumo", "Summary"),
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
              type: "row",
              fields: [
                {
                  name: "status",
                  type: "select",
                  label: bl("Estado", "Status"),
                  required: true,
                  defaultValue: "pending",
                  admin: { width: "50%" },
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
                    { label: bl("Reembolsado", "Refunded"), value: "refunded" },
                  ],
                },
                {
                  name: "paymentMethod",
                  type: "select",
                  label: bl("Método de pagamento", "Payment method"),
                  required: true,
                  admin: { width: "50%" },
                  options: [
                    {
                      label: bl("Multibanco", "Multibanco"),
                      value: "multibanco",
                    },
                    { label: bl("PayPal", "PayPal"), value: "paypal" },
                  ],
                },
              ],
            },
            {
              name: "totalAmount",
              type: "number",
              label: bl("Valor total", "Total amount"),
              required: true,
              min: 0,
              admin: {
                description: bl(
                  "Total da encomenda em EUR.",
                  "Order total in EUR.",
                ),
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "paidAt",
                  type: "date",
                  label: bl("Pago em", "Paid at"),
                  admin: {
                    width: "50%",
                    date: { pickerAppearance: "dayAndTime" },
                  },
                },
                {
                  name: "paymentExpiresAt",
                  type: "date",
                  label: bl("Pagamento expira em", "Payment expires at"),
                  admin: {
                    width: "50%",
                    date: { pickerAppearance: "dayAndTime" },
                    description: bl(
                      "Após esta data, encomendas em aguarda pagamento podem ser marcadas como expiradas.",
                      "After this date, awaiting-payment orders may be marked expired.",
                    ),
                  },
                },
              ],
            },
            {
              name: "observations",
              type: "textarea",
              label: bl("Observações", "Observations"),
            },
          ],
        },
        {
          label: bl("Cliente", "Customer"),
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "customerFirstName",
                  type: "text",
                  label: bl("Nome", "First name"),
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "customerLastName",
                  type: "text",
                  label: bl("Apelido", "Last name"),
                  required: true,
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "customerEmail",
                  type: "email",
                  label: bl("Email", "Email"),
                  required: true,
                  admin: { width: "50%" },
                },
                {
                  name: "customerPhone",
                  type: "text",
                  label: bl("Telefone", "Phone"),
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "customerAddress",
              type: "text",
              label: bl("Morada", "Address"),
              required: true,
            },
            {
              type: "row",
              fields: [
                {
                  name: "customerPostalCode",
                  type: "text",
                  label: bl("Código postal", "Postal code"),
                  required: true,
                  admin: { width: "33%" },
                },
                {
                  name: "customerCity",
                  type: "text",
                  label: bl("Cidade", "City"),
                  required: true,
                  admin: { width: "33%" },
                },
                {
                  name: "customerCountry",
                  type: "text",
                  label: bl("País", "Country"),
                  required: true,
                  admin: { width: "34%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "customerNif",
                  type: "text",
                  label: bl("NIF", "Tax ID (NIF)"),
                  admin: { width: "50%" },
                },
                {
                  name: "acceptMarketing",
                  type: "checkbox",
                  label: bl("Aceita marketing", "Accept marketing"),
                  defaultValue: false,
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: bl("Itens", "Items"),
          fields: [
            {
              name: "items",
              type: "array",
              label: bl("Itens da encomenda", "Order items"),
              labels: {
                singular: bl("Item", "Item"),
                plural: bl("Itens", "Items"),
              },
              required: true,
              minRows: 1,
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: "lineId",
                  type: "text",
                  label: bl("ID da linha", "Line ID"),
                  required: true,
                  admin: {
                    description: bl(
                      "Identificador interno da linha do carrinho.",
                      "Internal cart line identifier.",
                    ),
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "itemType",
                      type: "select",
                      label: common.type,
                      defaultValue: "package",
                      admin: { width: "33%" },
                      options: [
                        { label: bl("Pacote", "Package"), value: "package" },
                        { label: bl("Extra", "Extra"), value: "extra" },
                      ],
                    },
                    {
                      name: "productName",
                      type: "text",
                      label: common.name,
                      required: true,
                      admin: { width: "67%" },
                    },
                  ],
                },
                {
                  name: "productSubtitle",
                  type: "text",
                  label: bl("Subtítulo", "Subtitle"),
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "quantity",
                      type: "number",
                      label: bl("Quantidade", "Quantity"),
                      required: true,
                      min: 1,
                      admin: { width: "33%" },
                    },
                    {
                      name: "unitPrice",
                      type: "number",
                      label: bl("Preço unitário (EUR)", "Unit price (EUR)"),
                      required: true,
                      min: 0,
                      admin: { width: "33%" },
                    },
                    {
                      name: "packageId",
                      type: "text",
                      label: bl("ID catálogo", "Catalog ID"),
                      admin: { width: "34%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "date",
                      type: "text",
                      label: bl("Data", "Date"),
                      admin: {
                        width: "50%",
                        description: bl(
                          "ISO (AAAA-MM-DD).",
                          "ISO (YYYY-MM-DD).",
                        ),
                      },
                    },
                    {
                      name: "period",
                      type: "text",
                      label: bl("Período", "Period"),
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "imageUrl",
                  type: "text",
                  label: bl("URL da imagem", "Image URL"),
                },
                {
                  name: "details",
                  type: "array",
                  label: bl("Detalhes", "Details"),
                  labels: {
                    singular: bl("Detalhe", "Detail"),
                    plural: bl("Detalhes", "Details"),
                  },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: common.label,
                      required: true,
                    },
                    {
                      name: "value",
                      type: "text",
                      label: bl("Valor", "Value"),
                      required: true,
                    },
                  ],
                },
                {
                  name: "selections",
                  type: "array",
                  label: bl("Seleções de opções", "Option selections"),
                  labels: {
                    singular: bl("Seleção", "Selection"),
                    plural: bl("Seleções", "Selections"),
                  },
                  admin: {
                    initCollapsed: true,
                    description: bl(
                      "IDs técnicos das opções escolhidas (para revalidação).",
                      "Technical IDs of chosen options (for revalidation).",
                    ),
                  },
                  fields: [
                    {
                      name: "groupId",
                      type: "text",
                      label: bl("ID do grupo", "Group ID"),
                      required: true,
                    },
                    {
                      name: "optionId",
                      type: "text",
                      label: bl("ID da opção", "Option ID"),
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: bl("Pagamento", "Payment"),
          fields: [
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
              index: true,
              admin: {
                condition: (data) => data.paymentMethod === "paypal",
              },
            },
            {
              name: "paypalCaptureId",
              type: "text",
              label: bl("ID da captura PayPal", "PayPal capture ID"),
              admin: {
                condition: (data) => data.paymentMethod === "paypal",
              },
            },
            {
              name: "paymentEvents",
              type: "join",
              collection: "payments",
              on: "order",
              label: bl("Eventos de pagamento", "Payment events"),
              admin: {
                description: bl(
                  "Histórico de tentativas e confirmações (coleção Pagamentos).",
                  "Attempt and confirmation history (Payments collection).",
                ),
                defaultColumns: [
                  "provider",
                  "type",
                  "status",
                  "amount",
                  "providerPaymentId",
                  "createdAt",
                ],
              },
            },
            {
              name: "paymentDetails",
              type: "json",
              label: bl("Payload bruto (avançado)", "Raw payload (advanced)"),
              admin: {
                readOnly: true,
                description: bl(
                  "Metadados brutos do fornecedor — só para suporte técnico. Preferir os campos acima e a coleção Pagamentos.",
                  "Raw provider metadata — support only. Prefer the fields above and the Payments collection.",
                ),
              },
            },
          ],
        },
      ],
    },
  ],
};
