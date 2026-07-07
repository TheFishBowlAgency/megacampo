import type { CollectionConfig } from 'payload'

import { adminGroups } from '@/i18n/adminGroups'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { pt: 'Utilizador', en: 'User' },
    plural: { pt: 'Utilizadores', en: 'Users' },
  },
  admin: {
    useAsTitle: 'email',
    group: adminGroups.administration,
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
