import { Hero } from '@/components/Hero'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { About } from 'src/payload-types'

export default async function AboutPage() {
  const url = '/about'

  const { hero, content } = (await getCachedGlobal('about', 1)()) as About

  if (!content) {
    ;<PayloadRedirects url={url} />
  }

  return (
    <main className="py-16">
      <Hero {...hero} />
      <article className="space-y-8 py-12">
        {content.length && content.map((item, i) => <RichText key={i} content={item.richText} />)}
      </article>
    </main>
  )
}
