export interface EventCardProps {
  event: Event;
}
export interface Event {
  id: string;
  name: string;
  venueName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  ticketLimit: number;
  price: string;
  category: string;
  status: string;
  genre: string;
  imageUrl: string;
  performers: string;
  description: string;
  eventUrl: string;
}
