import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { CollectionArchive } from './CollectionArchive'

export const dynamic = 'force-static'
export const revalidate = 600

export async function NewsList() {
  const payload = await getPayloadHMR({ config })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 9,
  })
  return (
    <section className="py-8 space-y-10">
      <div className="container">
        <h3 className="font-serif text-lg text-foreground/60">{'News & Announcements'}</h3>
        <hr className="mt-5" />
      </div>
      <CollectionArchive posts={posts.docs} />
    </section>
  )
}

function NewsCard() {
  return (
    <article>
      <span>August 20, 2024</span>
      <div>
        <div>
          <h2>Something interesting that happened</h2>
          <p>
            In fermentum et sollicitudin ac orci phasellus. Sit amet commodo nulla facilisi nullam
            vehicula ipsum a. Et sollicitudin ac orci phasellus egestas. Arcu cursus euismod quis
            viverra nibh cras pulvinar mattis.
          </p>
        </div>
      </div>
    </article>
  )
}
