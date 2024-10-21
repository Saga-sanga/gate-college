import { Config } from 'src/payload-types'
import { CallToApply } from './CallToApply'
import { MainHero } from './MainHero'
import RichText from './RichText'

type PickedGlobals = Pick<
  Config['globals'],
  'programs' | 'student-life' | 'tution-fees'
>[keyof Pick<Config['globals'], 'programs' | 'student-life' | 'tution-fees'>]

type Props = {
  global: PickedGlobals
}

export function RichTextPage({ global: { hero, content } }: Props) {
  return (
    <>
      <MainHero hero={hero} />
      <article className="space-y-16 my-16">
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-xl prose-h2:text-primary" key={i} content={item.richText} />
          ))}
      </article>
      <CallToApply />
    </>
  )
}
