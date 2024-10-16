import { CollectionConfig } from 'payload'
import { adminOrSelf } from '../access/adminOrSelf'

const UserInfo: CollectionConfig = {
  slug: 'user-info',
  access: {
    create: adminOrSelf,
    delete: adminOrSelf,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {},
  fields: [
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'dob',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'address1',
          type: 'text',
        },
        {
          name: 'address2',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'pincode',
          type: 'number',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
        },
      ],
    },
  ],
  timestamps: true,
}

export default UserInfo
