import { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../blocks/Banner'
import { MediaBlock } from '../blocks/MediaBlock'
import { revalidateGlobal } from '../hooks/revalidateGlobal'

export const Donation: GlobalConfig = {
  slug: 'donation',
  access: {
    update: authenticated,
    read: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('donation')],
  },
}
