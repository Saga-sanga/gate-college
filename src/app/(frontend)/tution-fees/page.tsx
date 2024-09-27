import { CallToApply } from '@/components/CallToApply'
import { MainHero } from '@/components/MainHero'
import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { TutionFee } from 'src/payload-types'

export default async function TutionFeesPage() {
  const { hero, content } = (await getCachedGlobal('tution-fees', 1)()) as TutionFee
  return (
    <main>
      <MainHero hero={hero} />
      <article className="space-y-12">
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-xl prose-h2:text-primary" key={i} content={item.richText} />
          ))}
        <CallToApply />
      </article>
    </main>
  )
}
