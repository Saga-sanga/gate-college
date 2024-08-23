import type { GlobalConfig } from 'payload'
import { anyone } from 'src/payload/access/anyone'
import { hero } from 'src/payload/fields/hero'
import { revalidateHero } from './hooks/revalidateHero'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from 'src/payload/fields/linkGroup'

export const Hero: GlobalConfig = {
  slug: 'hero',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateHero],
  },
}
