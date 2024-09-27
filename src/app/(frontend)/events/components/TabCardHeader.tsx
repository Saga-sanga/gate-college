'use client'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getFormattedWeekRange } from '@/utilities/getFormattedWeekRange'
import { Search } from 'lucide-react'

type Props = {
  date: Date
  searchTerm: string
  setSearchTerm: (x: string) => void
  mode?: 'day' | 'week' | 'month'
}

export function TabCardHeader({ date, searchTerm, setSearchTerm, mode = 'day' }: Props) {
  let dateString = date?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  if (date && mode === 'week') {
    dateString = getFormattedWeekRange(date)
  }

  return (
    <CardHeader>
      <CardTitle className="text-primary">Events</CardTitle>
      <CardDescription>
        Upcoming events for <b>{dateString}</b>
      </CardDescription>
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
  )
}
