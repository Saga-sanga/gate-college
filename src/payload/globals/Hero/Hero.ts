import type { GlobalConfig } from 'payload'
import { hero } from 'src/payload/fields/hero'
import { revalidateHero } from './hooks/revalidateHero'
import { authenticated } from '@/payload/access/authenticated'

export const Hero: GlobalConfig = {
  lockDocuments: false,
  slug: 'hero-main',
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [hero],
  hooks: {
    afterChange: [revalidateHero],
  },
}
