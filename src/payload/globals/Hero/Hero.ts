import type { GlobalConfig } from 'payload'
import { anyone } from 'src/payload/access/anyone'
import { hero } from 'src/payload/fields/hero'
import { revalidateHero } from './hooks/revalidateHero'

export const Hero: GlobalConfig = {
  slug: 'hero-main',
  access: {
    read: anyone,
  },
  fields: [hero],
  hooks: {
    afterChange: [revalidateHero],
  },
}
