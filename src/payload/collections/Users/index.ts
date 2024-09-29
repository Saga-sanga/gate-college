import type { CollectionConfig } from 'payload'

import { protectRoles } from 'src/payload/hooks/protectRoles'
import { checkRole } from 'src/payload/access/checkRole'
import { admin, adminFieldLevel } from '@/payload/access/admin'
import { adminOrSelf } from '@/payload/access/adminOrSelf'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin', 'manager'], user),
    create: admin,
    delete: admin,
    read: adminOrSelf,
    update: adminOrSelf,
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
        read: adminFieldLevel,
        update: adminFieldLevel,
        create: adminFieldLevel,
      },
    },
  ],
  timestamps: true,
}

export default Users
