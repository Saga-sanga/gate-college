import { Fragment } from 'react'
import { generateMetadata } from './[slug]/page'
import { MainHero } from '@/components/MainHero'
import { InfoCardList } from '@/components/InfoCardList'
import { NewsSection } from '@/components/NewsSection'
import { EventsSection } from '@/components/EventsSection'
import { HighlightSection } from '@/components/HighlightSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeroMain } from 'src/payload-types'

export default async function Page() {
  const { hero } = (await getCachedGlobal('hero-main', 1)()) as HeroMain
  return (
    <Fragment>
      <MainHero hero={hero} />
      <InfoCardList />
      <NewsSection />
      <HighlightSection />
      <EventsSection />
    </Fragment>
  )
}

export { generateMetadata }
