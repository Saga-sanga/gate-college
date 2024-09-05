'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { TabCardHeader } from './TabCardHeader'
import { filterEvents } from '@/utilities/filterEvents'
import { EventCard } from './EventCard'
import { Events } from '../page'

type Props = {
  events: Events
  date: Date
}

export function MonthTabContent({ events, date }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = filterEvents(events, searchTerm)

  return (
    <TabsContent value="month">
      <Card>
        <TabCardHeader
          date={date}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mode="month"
        />
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
