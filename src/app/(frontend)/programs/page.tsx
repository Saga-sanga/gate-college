import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Program } from 'src/payload-types'

export default async function ProgramsPage() {
  const programs = (await getCachedGlobal('programs', 1)()) as Program
  return <RichTextPage global={programs} />
}
