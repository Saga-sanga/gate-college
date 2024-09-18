import { Media } from '@/components/Media'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Leadership } from 'src/payload-types'

export default async function LeadershipPage() {
  const { highlight, content, ...leadership } = (await getCachedGlobal(
    'leadership',
    1,
  )()) as Leadership

  console.log('Leadership', highlight)

  return (
    <main className="my-16 container">
      <section>
        <h1 className="text-primary text-5xl font-serif">{leadership.title}</h1>
        <hr className="mt-5 border-secondary-muted" />
        <p className="p-16 text-muted-foreground">{leadership.description}</p>
      </section>
      <section className="flex flex-row">
        <div className="relative w-full bg-primary-muted basis-1/3">
          {!highlight.image && <div className="">No image</div>}
          {highlight.image && typeof highlight.image !== 'string' && (
            <Media resource={highlight.image} size="360" className="h-full" />
          )}
        </div>
        <div className="basis-2/3 relative bg-muted py-24 px-16 space-y-8">
          <hr className="border-8 w-1/2 border-secondary absolute top-0 left-0" />
          <h2 className="text-5xl text-primary font-medium font-serif">{highlight.name}</h2>
          <p className="text-lg text-muted-foreground">{highlight.description}</p>
        </div>
      </section>
    </main>
  )
}
