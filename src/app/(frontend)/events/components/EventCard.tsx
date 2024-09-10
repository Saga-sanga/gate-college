import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, Clock, MapPin } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import type { Event } from 'src/payload-types'

type Props = {
  event: Event
}

export function EventCard({ event }: Props) {
  return (
    <Card className="group cursor-pointer border-none shadow-none bg-muted hover:shadow-lg">
      <CardHeader>
        <CardTitle className="group-hover:text-secondary">{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row space-x-8 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{format(parseISO(event.eventDate), 'MMM do, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {format(parseISO(event.eventDate), 'kk:mm') + ' - '}
              {format(parseISO(event.endTime), 'kk:mm')}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
