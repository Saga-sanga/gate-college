'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

type Props = {
  today: Date
  date: Date
  setDate: (x: Date) => void
}

export function CalendarCard({ today, date, setDate }: Props) {
  const [month, setMonth] = useState(date)
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold text-primary">
            {date?.toLocaleString('en-US', { day: 'numeric', month: 'long' })}
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
          className="rounded-md w-fit mx-auto"
        />
      </CardContent>
    </Card>
  )
}
