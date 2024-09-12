import { cn } from '@/utilities/cn'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Link from 'next/link'
import { startOfToday } from 'date-fns'
import type { Event } from 'src/payload-types'
import { EventsList } from './EventsList'

export const dynamic = 'force-static'
export const revalidate = 600

export async function EventsSection() {
  const payload = await getPayloadHMR({ config: configPromise })

  const events = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 20,
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          eventDate: {
            greater_than_equal: startOfToday().toISOString(),
          },
        },
      ],
    },
  })

  const groupedEvents = events.docs.reduce<{ [date: string]: Event[] }>((acc, event) => {
    const date = event.eventDate.split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})

  const selectedGroups = Object.entries(groupedEvents)
    .map((entry) => ({ date: entry[0], events: entry[1] }))
    .slice(0, 4)

  return (
    <section className="py-20 bg-muted space-y-10">
      <div className="container">
        <h3 className="font-serif text-5xl text-primary">Upcoming Events</h3>
        <hr className="mt-5" />
      </div>
      <EventsList groupedEvents={selectedGroups} />
      <div className="container text-center">
        <Link href="/events" className={cn('capitalize fancy-button')}>
          View All Events
        </Link>
      </div>
    </section>
  )
}
