import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Donation } from 'src/payload-types'

export default async function DonatePage() {
  const { title, content } = (await getCachedGlobal('donation')()) as Donation

  return (
    <article className="container my-20 space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-secondary capitalize">{title}</h1>
        <hr className="border-secondary-muted" />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-2/3">
          {content && <RichText className="prose-lg prose-h2:text-primary" content={content} />}
        </div>
        {/* container for donation widget */}
        <div className="lg:basis-1/3"></div>
      </div>
    </article>
  )
}
