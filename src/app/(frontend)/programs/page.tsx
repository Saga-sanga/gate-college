import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Program } from 'src/payload-types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Programs Page | GATE ATC',
  description:
    'The programs page of GATE ATC which contains a list of all the courses available for the college',
}

export default async function ProgramsPage() {
  const programs = (await getCachedGlobal('programs', 1)()) as Program
  return <RichTextPage global={programs} />
}
