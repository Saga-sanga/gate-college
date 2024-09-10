'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { CalendarDays, Clock, MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import { TabCardHeader } from './TabCardHeader'
import { filterEvents } from '@/utilities/filterEvents'
import { EventCard } from './EventCard'
import type { Event } from 'src/payload-types'

type Props = {
  events: Event[]
  date: Date
}

export function DayTabContent({ events, date }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = filterEvents(events, searchTerm)

  return (
    <TabsContent value="day">
      <Card>
        <TabCardHeader date={date} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
