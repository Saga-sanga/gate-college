import { endOfDay, endOfWeek, getDate, getMonth, getYear, startOfDay, startOfWeek } from 'date-fns'
import { EventsContainer } from './components/EventsContainer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import util from 'util'
import { Suspense } from 'react'
import { EventsSkeletion } from './components/EventsSkeletion'

export default async function EventsPage({
  searchParams,
}: {
  searchParams: {
    day?: string
    month?: string
    year?: string
    mode?: string
  }
}) {
  const day = searchParams?.day ?? getDate(Date.now())
  const month = searchParams?.month ?? getMonth(Date.now()) + 1
  const year = searchParams?.year ?? getYear(Date.now())
  const mode = searchParams.mode ?? 'day'

  const currentDate = new Date(`${year}-${month}-${day}`).toISOString()
  const startTime =
    mode === 'week' ? startOfWeek(currentDate).toISOString() : startOfDay(currentDate).toISOString()
  const endTime =
    mode === 'week' ? endOfWeek(currentDate).toISOString() : endOfDay(currentDate).toISOString()

  const payload = await getPayloadHMR({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    depth: 1,
    where: {
      and: [
        {
          eventDate: {
            greater_than_equal: startTime,
          },
        },
        {
          eventDate: {
            less_than_equal: endTime,
          },
        },
      ],
    },
  })

  console.log(util.inspect(events, { depth: null, colors: true }))
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Calendar of Events</h1>
      <Suspense key={currentDate} fallback={<EventsSkeletion />}>
        <EventsContainer events={events.docs} selectedDate={currentDate} mode={mode} />
      </Suspense>
    </div>
  )
}
