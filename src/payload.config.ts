// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  BlockquoteFeature,
  BoldFeature,
  EXPERIMENTAL_TableFeature as TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { s3Storage } from '@payloadcms/storage-s3'

import Categories from './payload/collections/Categories'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Posts } from './payload/collections/Posts'
import Users from './payload/collections/Users'
import { revalidateRedirects } from './payload/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page, Post } from 'src/payload-types'
import { Hero } from './payload/globals/Hero/Hero'
import { Events } from './payload/collections/Events'
import { admin } from './payload/access/admin'
import { HighlightSection } from './payload/globals/HighlightSection/HighlightSection'
import { About } from './payload/globals/About/About'
import { StudentLife } from './payload/globals/StudentLife/StudentLife'
import { TutionFees } from './payload/globals/TutionFees/TutionFees'
import { Programs } from './payload/globals/Programs/Programs'
import { Leadership } from './payload/globals/Leadership/Leadership'
import { Images } from './payload/collections/Images'
import { Donation } from './payload/globals/Donation'
import { Apply } from './payload/globals/Apply'
import { Documents } from './payload/collections/Documents'
import { Footer } from './payload/globals/Footer/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL
}

const s3config = {
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: 'auto',
    endpoint: process.env.S3_ENDPOINT,
  },
  bucket: process.env.S3_BUCKET,
}

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['/payload/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: ['/payload/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        UnorderedListFeature(),
        OrderedListFeature(),
        TableFeature(),
        BlockquoteFeature(),
        LinkFeature({
          enabledCollections: ['posts', 'documents', 'media', 'images'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.SUPABASE_DATABASE_URL,
    },
  }),
  // db: sqliteAdapter({
  //   client: {
  //     // url: process.env.DATABASE_URI || '',
  //     url: process.env.TURSO_DATABASE_URL,
  //     authToken: process.env.TURSO_AUTH_TOKEN,
  //   },
  // }),
  collections: [Pages, Posts, Events, Media, Images, Documents, Categories, Users],
  upload: {
    limits: {
      fileSize: 4500000, // 4.5 mb in bytes
    },
  },
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    // {
    //   handler: seed,
    //   method: 'get',
    //   path: '/seed',
    // },
  ],
  globals: [
    Hero,
    HighlightSection,
    About,
    StudentLife,
    TutionFees,
    Programs,
    Donation,
    Leadership,
    Apply,
    Footer,
  ],
  plugins: [
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: {
        access: {
          read: admin,
          create: admin,
          update: admin,
        },
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    nestedDocsPlugin({
      collections: ['categories'],
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        access: {
          create: admin,
          read: admin,
          update: admin,
        },
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    ]
                  },
                }),
              }
            }
            return field
          })
        },
      },
      formSubmissionOverrides: {
        access: {
          read: admin,
        },
      },
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
        images: {
          prefix: 'images',
        },
        documents: {
          prefix: 'documents',
        },
      },
      config: s3config.config,
      bucket: s3config.bucket,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
