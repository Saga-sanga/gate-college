import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { protectRoles } from 'src/payload/hooks/protectRoles'
import { checkRole } from 'src/payload/access/checkRole'
import { Label } from '@/components/ui/label'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      defaultValue: 'user',
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeValidate: [protectRoles],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
  timestamps: true,
}

export default Users
