import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Program } from 'src/payload-types'

export default async function ProgramsPage() {
  const { hero, content } = (await getCachedGlobal('programs', 1)()) as Program
  return <RichTextPage hero={hero} content={content} />
}
