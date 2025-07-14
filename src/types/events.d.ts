declare module '@/static/events.yaml' {
  interface Event_Location {
    name: string
    map_url: string
  }

  interface Event {
    title: string
    tagline: string
    description: string
    image: string
    date: string
    location: Event_Location | null
    ticket_price: number | null
    number_of_spots: number | null
  }

  const events: Record<string, Event>
  export default events
}
