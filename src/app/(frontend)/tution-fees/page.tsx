import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { TutionFee } from 'src/payload-types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tuition Fees | GATE ATC',
  description:
    'The tuition fees page of GATE ATC which gives a detailed breakdown of the fees you will have to pay to enroll into GATE ATC',
}

export default async function TutionFeesPage() {
  const tuition = (await getCachedGlobal('tution-fees', 1)()) as TutionFee
  return <RichTextPage global={tuition} />
}
