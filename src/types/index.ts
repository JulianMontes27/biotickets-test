export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  venue: string;
  ticketPrice: number;
  isPastEvent?: boolean;
  slug: string;
}