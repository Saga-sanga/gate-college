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
import { revalidateGlobal } from '@/payload/hooks/revalidateGlobal'

export const StudentLife: GlobalConfig = {
  slug: 'student-life',
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
              name: 'highlight-reel',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'highlight-images',
                  type: 'array',
                  fields: [
                    {
                      name: 'picture',
                      label: false,
                      type: 'upload',
                      relationTo: 'images',
                    },
                  ],
                },
              ],
            },
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
    afterChange: [revalidateGlobal('student-life')],
  },
}
