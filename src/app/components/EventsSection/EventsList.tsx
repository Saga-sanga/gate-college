import { format } from 'date-fns'
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
            {' '}
            There are no events to display{' '}
          </p>
        )}
      </div>
    </div>
  )
}

function EventGroupCard({ group }: { group: GroupedEvent }) {
  return (
    <article>
      <h3>{format(group.date, 'MMMM dd')}</h3>
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
    <div>
      <p>{event.title}</p>
    </div>
  )
}
