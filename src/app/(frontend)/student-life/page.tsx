import { MainHero } from '@/components/MainHero'
import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { StudentsLife } from 'src/payload-types'

export default async function StudentLifePage() {
  const { hero, content } = (await getCachedGlobal('students-life')()) as StudentsLife
  return (
    <main>
      <MainHero hero={hero} />
      <article className="space-y-12">
        {content.length > 0 &&
          content.map((item, i) => (
            <RichText className="prose-xl prose-h2:text-primary" key={i} content={item.richText} />
          ))}
      </article>
    </main>
  )
}
