import { RichTextPage } from '@/components/RichTextPage'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { TutionFee } from 'src/payload-types'

export default async function TutionFeesPage() {
  const { hero, content } = (await getCachedGlobal('tution-fees', 1)()) as TutionFee
  return <RichTextPage hero={hero} content={content} />
}
