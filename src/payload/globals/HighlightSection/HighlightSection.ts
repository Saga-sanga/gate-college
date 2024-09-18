import { authenticated } from '@/payload/access/authenticated'
import { GlobalConfig } from 'payload'
import { revalidateGlobal } from '@/payload/hooks/revalidateGlobal'

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
    afterChange: [revalidateGlobal('highlight-section')],
  },
}
