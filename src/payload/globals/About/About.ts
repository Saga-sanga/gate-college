import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { Banner } from '@/payload/blocks/Banner'
import { MediaBlock } from '@/payload/blocks/MediaBlock'
import { hero } from '@/payload/fields/hero'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { GlobalConfig } from 'payload'
import { revalidateAbout } from './hooks/revalidateaAbout'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    update: authenticated,
    read: authenticatedOrPublished,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'array',
              fields: [
                {
                  name: 'richText',
                  type: 'richText',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
                        BlocksFeature({ blocks: [Banner, MediaBlock] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                      ]
                    },
                  }),
                  label: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
}
