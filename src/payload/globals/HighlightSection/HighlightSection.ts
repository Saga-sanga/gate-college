import { admin } from '@/payload/access/admin'
import { authenticated } from '@/payload/access/authenticated'
import { GlobalConfig } from 'payload'
import { revalidateHighlight } from './hooks/revalidateHighlight'

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
  hooks: {
    afterChange: [revalidateHighlight],
  },
}
