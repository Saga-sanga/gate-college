import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { StudentLife } from 'src/payload-types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Life | GATE ATC',
  description:
    'The student life page of GATE ATC which shows the campus life to expect as a student who has enrolled into GATE',
}

export default async function StudentLifePage() {
  const studentLife = (await getCachedGlobal('student-life', 1)()) as StudentLife
  return <RichTextPage global={studentLife} />
}
