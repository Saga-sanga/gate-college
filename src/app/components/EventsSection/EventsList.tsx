import { format } from 'date-fns'
import Link from 'next/link'
import type { Event } from 'src/payload-types'

type GroupedEvent = {
  date: string
  events: Event[]
}

type Props = {
  groupedEvents: GroupedEvent[]
}

export function EventsList({ groupedEvents }: Props) {
  return (
    <div className="container">
      <div className="grid grid-cols-4">
        {groupedEvents.length ? (
          groupedEvents.map((group) => <EventGroupCard key={group.date} group={group} />)
        ) : (
          <p className="text-center text-muted-foreground col-span-4 py-16 border border-dashed">
            There are no events to display
          </p>
        )}
      </div>
    </div>
  )
}

function EventGroupCard({ group }: { group: GroupedEvent }) {
  return (
    <article className="space-y-4">
      <h3 className="text-2xl font-medium">{format(group.date, 'MMMM dd')}</h3>
      <div>
        {group.events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </article>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`events/${event.slug}`}>
      <p className="text-primary hover:underline hover:underline-offset-2">{event.title}</p>
    </Link>
  )
}
