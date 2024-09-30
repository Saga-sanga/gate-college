import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { format, parseISO } from 'date-fns'

export const dynamicParams = true

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    limit: 1000,
    draft: false,
    overrideAccess: false,
  })

  return events.docs.map(({ slug }) => slug)
}

export default async function Event({ params: { slug = '' } }) {
  const url = '/events' + slug
  const event = await queryEventBySlug({ slug })

  if (!event) return <PayloadRedirects url={url} />

  return (
    <article className="container py-8 flex flex-col gap-4 mt-12">
      <div className="xl:grid xl:grid-cols-[380px_1fr]">
        <div className="flex flex-col space-y-4 text-sm mb-6">
          <div className="col-span-3 mb-6">
            <h1 className="text-5xl font-medium text-primary">{event.title}</h1>
            {event.meta.description && (
              <p className="text-lg mt-2 text-primary">{event.meta.description}</p>
            )}
          </div>
          <div className="bg-muted flex flex-col space-y-4 rounded p-6">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{format(parseISO(event.eventDate), 'eeee, MMM do, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {format(parseISO(event.eventDate), 'hh:mm aaa') + ' - '}
                {format(parseISO(event.endTime), 'hh:mm aaa')}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-[1fr_48rem_1fr] grid-rows-[1fr]">
          <RichText
            className="lg:grid lg:grid-cols-subgrid h-fit col-start-1 col-span-3 grid-rows-[1fr]"
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
