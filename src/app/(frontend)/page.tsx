import { Fragment } from 'react'
import { generateMetadata } from './[slug]/page'
import { MainHero } from '@/components/MainHero'
import { InfoCardList } from '@/components/InfoCardList'

export default async function Page() {
  return (
    <Fragment>
      <MainHero />
      <InfoCardList />
    </Fragment>
  )
}

export { generateMetadata }
