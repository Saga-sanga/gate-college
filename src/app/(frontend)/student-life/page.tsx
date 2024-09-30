import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { StudentLife } from 'src/payload-types'

export default async function StudentLifePage() {
  const { hero, content } = (await getCachedGlobal('student-life', 1)()) as StudentLife
  return <RichTextPage hero={hero} content={content} />
}
