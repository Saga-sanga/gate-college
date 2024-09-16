import { admin } from '@/payload/access/admin'
import { authenticated } from '@/payload/access/authenticated'
import { GlobalConfig } from 'payload'

export const HighlightSection: GlobalConfig = {
  slug: 'highlight-section',
  access: {
    read: authenticated,
    update: authenticated,
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
      name: 'youtube-link',
      type: 'text',
      required: true,
    },
  ],
}
