import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: [
      'orderNumber',
      'status',
      'paymentMethod',
      'multibancoReference',
      'customerEmail',
      'totalAmount',
      'createdAt',
    ],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Order identifier (max 25 chars for Multibanco).',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Awaiting Payment', value: 'awaiting_payment' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Expired', value: 'expired' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        description:
          'Multibanco: marca como Paid manualmente no dia da visita. PayPal: atualizado automaticamente.',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      options: [
        { label: 'Multibanco', value: 'multibanco' },
        { label: 'PayPal', value: 'paypal' },
      ],
    },
    {
      name: 'customerFirstName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerLastName',
      type: 'text',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
    },
    {
      name: 'customerAddress',
      type: 'text',
      required: true,
    },
    {
      name: 'customerPostalCode',
      type: 'text',
      required: true,
    },
    {
      name: 'customerCity',
      type: 'text',
      required: true,
    },
    {
      name: 'customerCountry',
      type: 'text',
      required: true,
    },
    {
      name: 'customerNif',
      type: 'text',
    },
    {
      name: 'acceptMarketing',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'observations',
      type: 'textarea',
    },
    {
      name: 'items',
      type: 'json',
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Order total in EUR.',
      },
    },
    {
      name: 'multibancoEntity',
      type: 'text',
      admin: {
        condition: (data) => data.paymentMethod === 'multibanco',
      },
    },
    {
      name: 'multibancoReference',
      type: 'text',
      admin: {
        condition: (data) => data.paymentMethod === 'multibanco',
        description: 'Referência Multibanco apresentada ao cliente.',
      },
    },
    {
      name: 'multibancoRequestId',
      type: 'text',
      admin: {
        condition: (data) => data.paymentMethod === 'multibanco',
      },
    },
    {
      name: 'paypalOrderId',
      type: 'text',
      admin: {
        condition: (data) => data.paymentMethod === 'paypal',
      },
    },
    {
      name: 'paymentDetails',
      type: 'json',
      admin: {
        description: 'Raw payment provider response metadata.',
      },
    },
  ],
};
