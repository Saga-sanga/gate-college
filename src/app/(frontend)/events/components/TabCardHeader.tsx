'use client'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

type Props = {
  date: Date
  searchTerm: string
  setSearchTerm: (x: string) => void
}

export function TabCardHeader({ date, searchTerm, setSearchTerm }: Props) {
  return (
    <CardHeader>
      <CardTitle>Events</CardTitle>
      <CardDescription>
        Upcoming events for{' '}
        <b>
          {date?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </b>
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
