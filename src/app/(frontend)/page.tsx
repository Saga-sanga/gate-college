import { generateMetadata } from './[slug]/page'
import { MainHero } from '@/components/MainHero'

export default async function Page() {
  return <MainHero />
}

export { generateMetadata }
