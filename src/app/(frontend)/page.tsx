import { Fragment } from 'react'
import { MainHero } from '@/components/MainHero'
import { InfoCardList } from '@/components/InfoCardList'
import { NewsSection } from '@/components/NewsSection'
import { EventsSection } from '@/components/EventsSection'
import { HighlightSection } from '@/components/HighlightSection'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeroMain } from 'src/payload-types'
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'GATE Adventist Training Center',
  description:
    'GATE ATC is an autonomous seminary College offering Bachelor of Theology. To be eligible for admission to the program, a candidate must obtain a pass certificate (XII) from any recognized board in India or even the Division eligibility exam.',
  openGraph: mergeOpenGraph(),
}

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
