import { HighlightSection } from '@/components/HighlightSection'
import { MainHero } from '@/components/MainHero'
import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { About } from 'src/payload-types'

export default async function ApplyPage() {
  const { hero, content } = (await getCachedGlobal('apply', 1)()) as About

  return (
    <div>
      <MainHero hero={hero} />
      <article className="container space-y-12 my-12">
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-lg prose-h2:text-primary" key={i} content={item.richText} />
          ))}
      </article>
      <section className="bg-muted py-20"></section>
      <HighlightSection />
    </div>
  )
}