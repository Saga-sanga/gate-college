import { Fragment } from 'react'
import { generateMetadata } from './[slug]/page'
import { MainHero } from '@/components/MainHero'
import { InfoCardList } from '@/components/InfoCardList'
import { NewsSection } from '@/components/NewsSection'
import { EventsSection } from '@/components/EventsSection'
import { HighlightSection } from '@/components/HighlightSection'

export default async function Page() {
  return (
    <Fragment>
      <MainHero />
      <InfoCardList />
      <NewsSection />
      <HighlightSection />
      <EventsSection />
    </Fragment>
  )
}

export { generateMetadata }
