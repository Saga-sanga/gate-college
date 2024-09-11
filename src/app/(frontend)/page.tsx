import { Fragment } from 'react'
import { generateMetadata } from './[slug]/page'
import { MainHero } from '@/components/MainHero'
import { InfoCardList } from '@/components/InfoCardList'
import { NewsSection } from '@/components/NewsSection'
import { EventsSection } from '@/components/EventsSection'

export default async function Page() {
  return (
    <Fragment>
      <MainHero />
      <InfoCardList />
      <NewsSection />
      <EventsSection />
    </Fragment>
  )
}

export { generateMetadata }
