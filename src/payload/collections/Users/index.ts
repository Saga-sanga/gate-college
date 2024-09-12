import type { CollectionConfig } from 'payload'

import { protectRoles } from 'src/payload/hooks/protectRoles'
import { checkRole } from 'src/payload/access/checkRole'
import { admin } from '@/payload/access/admin'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin', 'manager'], user),
    create: admin,
    delete: admin,
    read: admin,
    update: admin,
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
          label: 'Manager',
          value: 'manager',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        read: ({ req: { user } }) => checkRole(['admin'], user),
      },
    },
  ],
  timestamps: true,
}

export default Users
