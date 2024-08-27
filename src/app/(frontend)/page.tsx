import { Fragment } from 'react'
import { generateMetadata } from './[slug]/page'
import { MainHero } from '@/components/MainHero'
import { InfoCardList } from '@/components/InfoCardList'
import { SpotlightPreview } from '@/components/SpotlightPreview'
import { NewsList } from '@/components/NewsList'

export default async function Page() {
  return (
    <Fragment>
      <MainHero />
      <InfoCardList />
      <NewsList />
    </Fragment>
  )
}

export { generateMetadata }
