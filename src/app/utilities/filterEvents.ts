import type { Event } from 'src/payload-types'

export function filterEvents(events: Event[], searchTerm: string) {
  return events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
}
