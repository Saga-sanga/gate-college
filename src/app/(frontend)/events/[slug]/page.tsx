import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PostHero } from '@/heros/PostHero'
import RichText from '@/components/RichText'

export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    limit: 1000,
    overrideAccess: false,
  })

  return events.docs.map(({ slug }) => slug)
}

export default async function Event({ params: { slug = '' } }) {
  const url = '/events' + slug
  const event = await queryEventBySlug({ slug })

  if (!event) return <PayloadRedirects url={url} />

  return (
    <article className="py-16">
      <PostHero post={event} />

      <div className="flex flex-col gap-4 pt-8">
        <div className="container lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[1fr]"
            content={event.content}
            enableGutter={false}
          />
        </div>
      </div>
    </article>
  )
}

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
