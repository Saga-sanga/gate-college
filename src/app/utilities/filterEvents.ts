type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
}

export function filterEvents(events: Event[], searchTerm: string) {
  return events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))
}
