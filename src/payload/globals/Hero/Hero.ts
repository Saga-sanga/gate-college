import type { GlobalConfig } from 'payload'
import { anyone } from 'src/payload/access/anyone'
import { hero } from 'src/payload/fields/hero'
import { revalidateHero } from './hooks/revalidateHero'
import { authenticated } from '@/payload/access/authenticated'

export const Hero: GlobalConfig = {
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
