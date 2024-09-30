import { format, parseISO } from 'date-fns'
import { Clock, MapPin } from 'lucide-react'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
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
    <article className="space-y-6">
      <h3 className="text-xl text-secondary font-medium">{format(group.date, 'MMMM dd')}</h3>
      <div className="space-y-4">
        {group.events.map((event) => (
          <EventHomeCard key={event.id} event={event} />
        ))}
      </div>
    </article>
  )
}

function EventHomeCard({ event }: { event: Event }) {
  return (
    <Link
      href={`events/${event.slug}`}
      className="group bg-white block p-4 rounded hover:shadow-md"
    >
      <p className="text-primary group-hover:underline group-hover:underline-offset-1">
        {event.title}
      </p>
      <div className="mt-1.5">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Clock className="h-2.5 w-2.5" />
          <span>
            {format(parseISO(event.eventDate), 'hh:mm aaa') + ' - '}
            {format(parseISO(event.endTime), 'hh:mm aaa')}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <MapPin className="h-2.5 w-2.5" />
          <span>{event.location}</span>
        </div>
      </div>
    </Link>
  )
}
