import type { GlobalConfig } from 'payload'

import { link } from '../../fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // {
    // name: 'tagline',
    // type: 'textarea',
    // required: true,
    // defaultValue: '',
    // },
    // {
    //   name: 'navItems',
    //   type: 'array',
    //   fields: [
    //     link({
    //       appearances: false,
    //     }),
    //   ],
    //   maxRows: 6,
    // },
    {
      name: 'contacts',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
