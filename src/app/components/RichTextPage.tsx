import { Program } from 'src/payload-types'
import { CallToApply } from './CallToApply'
import { MainHero } from './MainHero'
import RichText from './RichText'

type Props = {
  hero: Program['hero']
  content: Program['content']
}

export function RichTextPage({ hero, content }: Props) {
  return (
    <>
      <MainHero hero={hero} />
      <article className="space-y-12 my-12">
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-xl prose-h2:text-primary" key={i} content={item.richText} />
          ))}
      </article>
      <CallToApply />
    </>
  )
}
