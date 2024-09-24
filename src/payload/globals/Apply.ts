import { GlobalConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { hero } from '../fields/hero'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../blocks/Banner'
import { MediaBlock } from '../blocks/MediaBlock'
import { revalidateGlobal } from '../hooks/revalidateGlobal'

export const Apply: GlobalConfig = {
  slug: 'apply',
  access: {
    read: authenticated,
    update: authenticated,
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
                        HTMLConverterFeature({}),
                      ]
                    },
                  }),
                  label: false,
                },
                lexicalHTML('richText', { name: 'richText_html' }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('apply')],
  },
}
