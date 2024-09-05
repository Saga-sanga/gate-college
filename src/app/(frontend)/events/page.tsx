import { EventsContainer } from './components/EventsContainer'

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

export default async function EventsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Calendar of Events</h1>
      <EventsContainer events={events} />
    </div>
  )
}
