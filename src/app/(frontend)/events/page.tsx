'use client'

import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react'
import { CalendarCard } from './components/CalendarCard'
import { DayTabContent } from './components/DayTabContent'
import { WeekTabContent } from './components/WeekTabContent'
import { MonthTabContent } from './components/MonthTabContent'

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

  // Ensure the selected date is never empty
  useEffect(() => {
    if (!date) setDate(today)
  }, [date])

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Calendar of Events</h1>
      <Tabs defaultValue="day" className="w-full">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              {
                //<TabsTrigger value="month">Month</TabsTrigger>
              }
            </TabsList>
            <CalendarCard date={date} today={today} setDate={setDate} />
          </div>
          <DayTabContent events={events} date={date} />
          <WeekTabContent events={events} date={date} />
          {
            //<MonthTabContent events={events} date={date} />
          }
        </div>
      </Tabs>
    </div>
  )
}
