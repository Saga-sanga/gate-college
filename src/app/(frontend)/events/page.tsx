'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDays, Clock, MapPin, Search } from 'lucide-react'

// Mock data for events
const events = [
  {
    id: 1,
    title: 'Guest Lecture: AI in Healthcare',
    date: '2023-05-15',
    time: '14:00 - 16:00',
    location: 'Auditorium A',
  },
  {
    id: 2,
    title: 'Student Council Meeting',
    date: '2023-05-16',
    time: '12:30 - 13:30',
    location: 'Room 101',
  },
  {
    id: 3,
    title: 'Career Fair',
    date: '2023-05-18',
    time: '10:00 - 17:00',
    location: 'Main Hall',
  },
]

export default function EventsPage() {
  const today = new Date()
  const [date, setDate] = useState<Date | undefined>(today)
  const [month, setMonth] = useState(today)
  const [searchTerm, setSearchTerm] = useState('')

  // Ensure the selected date is never empty
  useEffect(() => {
    if (!date) setDate(today)
  }, [date])

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Calendar of Events</h1>
      <Tabs defaultValue="day" className="w-full">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            <Card>
              <CardContent className="p-0">
                <div className="flex justify-between items-center p-4 border-b">
                  <span className="text-lg font-semibold">
                    {date?.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDate(today)
                      setMonth(today)
                    }}
                  >
                    Today
                  </Button>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  month={month}
                  onMonthChange={setMonth}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
          </div>
          <Card className="order-first lg:order-last">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Upcoming events for {date?.toDateString()}</CardDescription>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <TabsContent value="day">
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col space-y-2 text-sm">
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
            </TabsContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}
