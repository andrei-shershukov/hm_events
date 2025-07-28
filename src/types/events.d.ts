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
    location: Event_Location
    ticket_price: number
    number_of_spots: number
  }

  const events: Record<string, Event>
  export default events
}
