import { endOfDay, endOfWeek, getDate, getMonth, getYear, startOfDay, startOfWeek } from 'date-fns'
import { EventsContainer } from './components/EventsContainer'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import util from 'util'

// Mock data for events
const events = [
  {
    id: 1,
    title: 'Guest Lecture: AI in Healthcare',
    eventDate: '2024-09-11T06:00:00.000Z',
    endTime: '2024-09-11T06:30:00.000Z',
    location: 'Auditorium',
    slug: 'sabbath-school',
  },
  {
    id: 2,
    title: 'Student Council Meeting',
    eventDate: '2024-09-15T08:00:00.000Z',
    endTime: '2024-09-15T09:30:00.000Z',
    location: 'Classroom B',
    slug: 'student-council-meeting',
  },
  {
    id: 3,
    title: 'Career Fair',
    eventDate: '2024-09-22T06:00:00.000Z',
    endTime: '2024-09-22T06:30:00.000Z',
    location: 'Main Hall',
    slug: 'career-fair',
  },
]

export type Events = typeof events

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
  console.log(searchParams)
  const day = searchParams?.day ?? getDate(Date.now())
  const month = searchParams?.month ?? getMonth(Date.now()) + 1
  const year = searchParams?.year ?? getYear(Date.now())
  const mode = searchParams.mode ?? 'day'
  // console.log({ day, month, year, mode })

  const currentDate = new Date(`${year}-${month}-${day}`).toISOString()
  const startTime =
    mode === 'week' ? startOfWeek(currentDate).toISOString() : startOfDay(currentDate).toISOString()
  const endTime =
    mode === 'week' ? endOfWeek(currentDate).toISOString() : endOfDay(currentDate).toISOString()

  console.log({ currentDate, startTime, endTime })

  const payload = await getPayloadHMR({ config: configPromise })
  const payloadEvents = await payload.find({
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

  console.log(util.inspect(payloadEvents, { depth: null, colors: true }))
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Calendar of Events</h1>
      <EventsContainer events={events} />
    </div>
  )
}
