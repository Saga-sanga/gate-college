'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TabsContent } from '@/components/ui/tabs'
import { CalendarDays, Clock, MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import { TabCardHeader } from './TabCardHeader'
import { filterEvents } from '@/utilities/filterEvents'

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
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row space-x-8 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
