import { Event } from '@/types';
import { TribeEvent, wordpressAPI } from './wordpress-api';

export class TribeEventsAdapter {
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  private formatDate(dateString: string): string {
    console.log('🔧 TribeEventsAdapter formatDate input:', dateString);
    
    const date = new Date(dateString);
    
    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      console.error('❌ TribeEventsAdapter: Invalid date string:', dateString);
      const fallbackDate = new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      console.log('⚠️ Using fallback date:', fallbackDate);
      return fallbackDate;
    }
    
    const formattedDate = date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    console.log('✅ TribeEventsAdapter formatted date:', formattedDate);
    return formattedDate;
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  private formatPrice(cost: string): number {
    if (!cost || cost === '0' || cost.toLowerCase() === 'gratis' || cost.toLowerCase() === 'free') {
      return 0;
    }
    
    // Extraer números del string de costo
    const numericCost = cost.replace(/[^\d.,]/g, '');
    const parsedCost = parseFloat(numericCost.replace(',', '.'));
    
    return isNaN(parsedCost) ? 0 : parsedCost;
  }

  private getCategoryFromTribeEvent(tribeEvent: TribeEvent): string {
    if (tribeEvent.categories && tribeEvent.categories.length > 0) {
      // Priorizar categorías específicas
      const categoryNames = tribeEvent.categories.map(cat => cat.name.toLowerCase());
      
      if (categoryNames.some(name => name.includes('concert'))) return 'Concierto';
      if (categoryNames.some(name => name.includes('festival'))) return 'Festival';
      if (categoryNames.some(name => name.includes('show'))) return 'Show';
      if (categoryNames.some(name => name.includes('fiesta'))) return 'Fiesta';
      if (categoryNames.some(name => name.includes('salsa'))) return 'Salsa';
      if (categoryNames.some(name => name.includes('rock'))) return 'Rock';
      if (categoryNames.some(name => name.includes('electr'))) return 'Electrónica';
      
      // Si no encuentra categorías específicas, usar la primera
      return tribeEvent.categories[0].name;
    }
    
    return 'Evento';
  }

  private getVenueFromTribeEvent(tribeEvent: TribeEvent): string {
    if (tribeEvent.venue && tribeEvent.venue.venue) {
      const venue = tribeEvent.venue.venue;
      const city = tribeEvent.venue.city || tribeEvent.venue.state || tribeEvent.venue.province;
      
      if (city) {
        return `${venue}, ${city}`;
      }
      return venue;
    }
    
    return 'Por confirmar';
  }

  private getTagsFromTribeEvent(tribeEvent: TribeEvent): string[] {
    if (tribeEvent.tags && tribeEvent.tags.length > 0) {
      return tribeEvent.tags.map(tag => tag.name.toLowerCase());
    }
    return [];
  }

  convertToEvent(tribeEvent: TribeEvent): Event {
    // Determinar si es evento pasado o próximo
    const eventDate = new Date(tribeEvent.start_date);
    const now = new Date();
    const status = eventDate > now ? 'upcoming' : 'past';
    
    // Debug logging
    console.log(`📅 Tribe Event "${tribeEvent.title}":`, {
      startDate: tribeEvent.start_date,
      eventDate: eventDate.toISOString(),
      now: now.toISOString(),
      status: status,
      isUpcoming: eventDate > now
    });
    
    return {
      id: tribeEvent.id.toString(),
      title: tribeEvent.title,
      description: this.stripHtml(tribeEvent.description || tribeEvent.excerpt) || 
                   `¡No te pierdas este increíble evento en ${this.getVenueFromTribeEvent(tribeEvent)}!`,
      date: this.formatDate(tribeEvent.start_date),
      time: this.formatTime(tribeEvent.start_date),
      venue: this.getVenueFromTribeEvent(tribeEvent),
      ticketPrice: this.formatPrice(tribeEvent.cost),
      image: tribeEvent.image?.url || tribeEvent.image?.sizes?.large || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3',
      category: this.getCategoryFromTribeEvent(tribeEvent),
      status: status,
      featured: tribeEvent.featured || false,
      tags: this.getTagsFromTribeEvent(tribeEvent),
      organizer: 'BioTickets',
      capacity: 1000, // Default capacity
      soldTickets: Math.floor(Math.random() * 800), // Random for demo
      link: tribeEvent.url,
      startDateTime: tribeEvent.start_date,
      endDateTime: tribeEvent.end_date,
      allDay: tribeEvent.all_day
    };
  }

  async convertMultipleEvents(tribeEvents: TribeEvent[]): Promise<Event[]> {
    return tribeEvents.map(tribeEvent => this.convertToEvent(tribeEvent));
  }

  // Método para obtener eventos próximos convertidos
  async getUpcomingEvents(limit: number = 12): Promise<Event[]> {
    try {
      const tribeEvents = await wordpressAPI.getTribeUpcomingEvents(limit);
      const convertedEvents = await this.convertMultipleEvents(tribeEvents);
      
      console.log('🔍 Tribe upcoming events:', convertedEvents.length);
      return convertedEvents;
    } catch (error) {
      console.error('Error fetching tribe upcoming events:', error);
      return [];
    }
  }

  // Método para obtener eventos pasados convertidos
  async getPastEvents(limit: number = 50): Promise<Event[]> {
    try {
      const tribeEvents = await wordpressAPI.getTribePastEvents(limit);
      const convertedEvents = await this.convertMultipleEvents(tribeEvents);
      
      // Filtrar solo eventos pasados y ordenar de más reciente a más antiguo
      const pastEvents = convertedEvents
        .filter(event => event.status === 'past')
        .sort((a, b) => {
          // Ordenar por fecha de inicio, más reciente primero
          const dateA = new Date(a.startDateTime || a.date);
          const dateB = new Date(b.startDateTime || b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, limit);
      
      console.log('🔍 Tribe past events:', pastEvents.length);
      console.log('📝 First few past events (sorted):', pastEvents.slice(0, 3).map(e => ({ title: e.title, date: e.date, startDateTime: e.startDateTime })));
      
      return pastEvents;
    } catch (error) {
      console.error('Error fetching tribe past events:', error);
      return [];
    }
  }

  // Método para buscar eventos convertidos
  async searchEvents(query: string, limit: number = 12): Promise<Event[]> {
    try {
      const tribeEvents = await wordpressAPI.getTribeEvents({ search: query, per_page: limit });
      return this.convertMultipleEvents(tribeEvents);
    } catch (error) {
      console.error('Error searching tribe events:', error);
      return [];
    }
  }
}

export const tribeEventsAdapter = new TribeEventsAdapter();