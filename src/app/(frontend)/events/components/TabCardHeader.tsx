'use client'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { endOfWeek, startOfWeek } from 'date-fns'
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

  if (date)
    switch (mode) {
      case 'week':
        const startWeek = startOfWeek(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        const endWeek = endOfWeek(date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
        dateString = `${startWeek} - ${endWeek}`
        break
      case 'month':
        dateString = date.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
        break
    }

  return (
    <CardHeader>
      <CardTitle>Events</CardTitle>
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
