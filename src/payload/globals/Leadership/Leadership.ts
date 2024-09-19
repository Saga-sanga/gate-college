import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/payload/hooks/revalidateGlobal'

export const Leadership: GlobalConfig = {
  slug: 'leadership',
  access: {
    update: authenticated,
    read: authenticatedOrPublished,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'highlight',
      label: 'Highlight Header',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
        },
      ],
    },
    {
      name: 'content',
      type: 'array',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'descripton',
              type: 'textarea',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'images',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('leadership')],
  },
}
