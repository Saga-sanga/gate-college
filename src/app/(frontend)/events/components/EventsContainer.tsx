'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarCard } from './CalendarCard'
import { DayTabContent } from './DayTabContent'
import { WeekTabContent } from './WeekTabContent'
import { useEffect, useState } from 'react'
import { Events } from '../page'

type Props = {
  events: Events
}

export function EventsContainer({ events }: Props) {
  const today = new Date()
  const [date, setDate] = useState<Date | undefined>(today)

  // Ensure the selected date is never empty
  useEffect(() => {
    if (!date) setDate(today)
  }, [date])

  return (
    <Tabs defaultValue="day" className="w-full">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6 mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
          </TabsList>
          <CalendarCard date={date} today={today} setDate={setDate} />
        </div>
        <DayTabContent events={events} date={date} />
        <WeekTabContent events={events} date={date} />
      </div>
    </Tabs>
  )
}
