export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  bannerImage?: string; // Nueva propiedad para imagen de banner del hero
  venue: string;
  venueAddress?: string; // Dirección completa del venue
  venueLatitude?: number; // Coordenadas para el mapa
  venueLongitude?: number; // Coordenadas para el mapa
  venueMapImage?: string; // Imagen del mapa de localidades del venue
  ticketPrice: number;
  category?: string;
  status: 'upcoming' | 'past';
  featured: boolean;
  tags: string[];
  organizer: string;
  capacity: number;
  soldTickets: number;
  link?: string;
  startDateTime?: string;
  endDateTime?: string;
  allDay?: boolean;
  // Mantener compatibilidad con código antiguo
  isPastEvent?: boolean;
  slug?: string;
}