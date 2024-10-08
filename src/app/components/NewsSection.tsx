import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { CollectionArchive } from './CollectionArchive'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

export const dynamic = 'force-static'
export const revalidate = 600

export async function NewsSection() {
  const payload = await getPayloadHMR({ config })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 9,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <section className="py-20 space-y-10">
      <div className="container">
        <h3 className="font-serif text-5xl text-primary">{'News & Announcements'}</h3>
        <hr className="mt-5 border-secondary" />
      </div>
      {posts.docs.length > 0 ? (
        <CollectionArchive posts={posts.docs} />
      ) : (
        <div className="container">
          <p className="text-center text-muted-foreground col-span-4 py-16 border border-dashed">
            There are no news or announcements to display
          </p>
        </div>
      )}
      <div className="container text-center">
        <Link href="/posts" className={cn('capitalize fancy-button')}>
          See More News
        </Link>
      </div>
    </section>
  )
}
