'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarCard } from './CalendarCard'
import { DayTabContent } from './DayTabContent'
import { WeekTabContent } from './WeekTabContent'
import { useEffect, useState } from 'react'
import type { Event } from 'src/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getDate, getMonth, getYear } from 'date-fns'

type Props = {
  events: Event[]
  selectedDate: string
  mode: string
}

export function EventsContainer({ events, selectedDate, mode }: Props) {
  const today = new Date()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [currentTab, setCurrentTab] = useState(mode ?? 'day')
  const [date, setDate] = useState<Date | undefined>(new Date(selectedDate))

  // Ensure the selected date is never empty
  useEffect(() => {
    if (!date) setDate(today)
  }, [date])

  // Whenever selected date changes update search params and call replace
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (date) {
      params.set('day', getDate(date).toString())
      params.set('month', (getMonth(date) + 1).toString())
      params.set('year', getYear(date).toString())
      params.set('mode', currentTab)
    }
    replace(`${pathname}?${params.toString()}`)
  }, [currentTab, date])

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} defaultValue="day" className="w-full">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6 mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="data-[state=active]:text-primary" value="day">
              Day
            </TabsTrigger>
            <TabsTrigger className="data-[state=active]:text-primary" value="week">
              Week
            </TabsTrigger>
          </TabsList>
          <CalendarCard date={date} today={today} setDate={setDate} />
        </div>
        <DayTabContent events={events} date={date} />
        <WeekTabContent events={events} date={date} />
      </div>
    </Tabs>
  )
}
