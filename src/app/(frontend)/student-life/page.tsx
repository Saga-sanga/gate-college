import { getCachedGlobal } from '@/utilities/getGlobals'
import { StudentLife } from 'src/payload-types'
import { Metadata } from 'next'
import { MainHero } from '@/components/MainHero'
import RichText from '@/components/RichText'
import { CallToApply } from '@/components/CallToApply'
import { EmblaOptionsType } from 'embla-carousel'
import Carousel, { Slider, SliderContainer, ThumsSlider } from '@/components/Carousel'
import Image from 'next/image'
import { ThumbnailSlider } from '@/components/ThumbnailSlider'

export const metadata: Metadata = {
  title: 'Student Life | GATE ATC',
  description:
    'The student life page of GATE ATC which shows the campus life to expect as a student who has enrolled into GATE',
}

export default async function StudentLifePage() {
  const {
    hero,
    content,
    'highlight-reel': highlightReel,
  } = (await getCachedGlobal('student-life', 1)()) as StudentLife
  return (
    <>
      <MainHero hero={hero} />
      <article className="container max-w[65ch] space-y-12 my-12">
        <ThumbnailSlider highlightReel={highlightReel} />
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-xl prose-h2:text-primary" key={i} content={item.richText} />
          ))}
      </article>
      <CallToApply />
    </>
  )
}
