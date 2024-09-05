import type { Events } from '@/(frontend)/events/page'

export function filterEvents(events: Events, searchTerm: string) {
  return events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
}
