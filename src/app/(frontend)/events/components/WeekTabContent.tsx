'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'
import { TabCardHeader } from './TabCardHeader'
import { filterEvents } from '@/utilities/filterEvents'
import { EventCard } from './EventCard'

type Props = {
  events: {
    id: number
    title: string
    date: string
    time: string
    location: string
  }[]
  date: Date
}

export function WeekTabContent({ events, date }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = filterEvents(events, searchTerm)

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
