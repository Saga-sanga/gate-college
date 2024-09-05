'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { TabCardHeader } from './TabCardHeader'
import { filterEvents } from '@/utilities/filterEvents'
import { EventCard } from './EventCard'
import { Events } from '../page'
import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from 'date-fns'

type Props = {
  events: Events
  date: Date
}

export function WeekTabContent({ events, date }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = filterEvents(events, searchTerm)
  const sundayEvents = filteredEvents.filter((event) => isSunday(event.eventDate))
  const mondayEvents = filteredEvents.filter((event) => isMonday(event.eventDate))
  const tuesdayEvents = filteredEvents.filter((event) => isTuesday(event.eventDate))
  const wednesdayEvents = filteredEvents.filter((event) => isWednesday(event.eventDate))
  const thursdayEvents = filteredEvents.filter((event) => isThursday(event.eventDate))
  const fridayEvents = filteredEvents.filter((event) => isFriday(event.eventDate))
  const saturdayEvents = filteredEvents.filter((event) => isSaturday(event.eventDate))

  return (
    <TabsContent value="week">
      <Card>
        <TabCardHeader
          date={date}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mode="week"
        />
        <CardContent>
          <div className="space-y-8">
            <WeekdayEventsList day="Sunday" events={sundayEvents} />
            <WeekdayEventsList day="Monday" events={mondayEvents} />
            <WeekdayEventsList day="Tuesday" events={tuesdayEvents} />
            <WeekdayEventsList day="Wednesday" events={wednesdayEvents} />
            <WeekdayEventsList day="Thursday" events={thursdayEvents} />
            <WeekdayEventsList day="Friday" events={fridayEvents} />
            <WeekdayEventsList day="Saturday" events={saturdayEvents} />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

function WeekdayEventsList({ day, events }: { day: string; events: Events }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl">{day}</h2>
      {events.length ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-sm w-full text-center text-muted-foreground p-6 border border-dashed">
          No events
        </p>
      )}
    </section>
  )
}
