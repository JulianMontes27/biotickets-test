import { Event } from '@/types';
import { WordPressEvent, wordpressAPI } from './wordpress-api';

export class EventsAdapter {
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }

  private formatDate(dateString: string): string {
    console.log('🔧 EventsAdapter formatDate input:', dateString);
    
    const date = new Date(dateString);
    
    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      console.error('❌ EventsAdapter: Invalid date string:', dateString);
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
    
    console.log('✅ EventsAdapter formatted date:', formattedDate);
    return formattedDate;
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
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

  private getFeaturedImage(wpEvent: WordPressEvent): string {
    // Intentar obtener la imagen destacada desde _embedded
    if (wpEvent._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return wpEvent._embedded['wp:featuredmedia'][0].source_url;
    }
    
    // Fallback a imagen por defecto basada en el tipo de evento
    const eventTitle = wpEvent.title.rendered.toLowerCase();
    
    if (eventTitle.includes('concierto') || eventTitle.includes('música') || eventTitle.includes('musical')) {
      return 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3';
    } else if (eventTitle.includes('festival')) {
      return 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3';
    } else if (eventTitle.includes('teatro') || eventTitle.includes('obra')) {
      return 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3';
    } else if (eventTitle.includes('danza') || eventTitle.includes('baile')) {
      return 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?ixlib=rb-4.0.3';
    } else {
      return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3';
    }
  }

  private getBannerImage(wpEvent: WordPressEvent): string {
    // Intentar obtener la imagen de banner desde _embedded (imagen destacada en tamaño completo)
    const featuredMedia = wpEvent._embedded?.['wp:featuredmedia']?.[0];
    
    if (featuredMedia?.media_details?.sizes?.large?.source_url) {
      return featuredMedia.media_details.sizes.large.source_url;
    }
    
    if (featuredMedia?.source_url) {
      return featuredMedia.source_url;
    }
    
    // Fallback para banner específico del evento
    const eventTitle = wpEvent.title.rendered.toLowerCase();
    
    if (eventTitle.includes('fiesta de verano')) {
      return 'https://www.biotickets.com/wp-content/uploads/2025/07/Banner_-Fiesta-Verano_-1920-1024x576.jpg';
    } else if (eventTitle.includes('fiesta roja')) {
      return 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    }
    
    // Fallback general para banner
    return 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
  }

  private async getVenueName(venueId: string): Promise<string> {
    try {
      const venue = await wordpressAPI.getVenue(venueId);
      if (venue) {
        const venueName = this.stripHtml(venue.title.rendered);
        const city = venue.meta._VenueCity;
        
        if (city) {
          return `${venueName}, ${city}`;
        }
        return venueName;
      }
    } catch (error) {
      console.warn('Error fetching venue:', error);
    }
    
    return 'Bogotá, Colombia'; // Fallback
  }

  async convertToEvent(wpEvent: WordPressEvent): Promise<Event> {
    // Debug: Mostrar todos los datos de fecha disponibles
    console.log(`🔍 Event date analysis for "${wpEvent.title.rendered}":`, {
      wpDate: wpEvent.date,
      metaStartDate: wpEvent.meta?._tribe_events_start_date,
      metaEndDate: wpEvent.meta?._tribe_events_end_date,
      allMeta: wpEvent.meta
    });
    
    // Usar fechas disponibles, con fallback a la fecha de publicación
    const startDate = wpEvent.meta?._tribe_events_start_date || wpEvent.date;
    const endDate = wpEvent.meta?._tribe_events_end_date || wpEvent.date;
    
    // Extraer precio del título si no está en meta
    const cost = wpEvent.meta?._tribe_events_cost || this.extractPriceFromTitle(wpEvent.title.rendered);
    
    // Extraer venue del título/contenido si no está en meta
    const venue = await this.getVenueName(wpEvent.meta?._tribe_events_venue_id) || 
                  this.extractVenueFromContent(wpEvent.title.rendered, wpEvent.content.rendered);
    
    // Extraer fecha real del evento del título si no está en meta
    const realEventDate = this.extractEventDateFromTitle(wpEvent.title.rendered);
    const finalEventDate = realEventDate || startDate;
    
    // Determinar si es evento pasado o próximo
    const eventDate = new Date(finalEventDate);
    const now = new Date();
    const status = eventDate > now ? 'upcoming' : 'past';
    
    // Debug logging
    console.log(`📅 Event "${wpEvent.title.rendered}":`, {
      originalStartDate: startDate,
      extractedDate: realEventDate,
      finalDate: finalEventDate,
      eventDate: eventDate.toISOString(),
      now: now.toISOString(),
      status: status,
      isUpcoming: eventDate > now
    });
    
    return {
      id: wpEvent.id.toString(),
      title: this.stripHtml(wpEvent.title.rendered),
      description: this.stripHtml(wpEvent.excerpt.rendered || wpEvent.content.rendered) || 
                   this.generateDescriptionFromTitle(wpEvent.title.rendered),
      date: this.formatDate(finalEventDate),
      time: this.extractTimeFromTitle(wpEvent.title.rendered) || this.formatTime(finalEventDate),
      venue: venue,
      ticketPrice: this.formatPrice(cost),
      image: this.getFeaturedImage(wpEvent),
      bannerImage: this.getBannerImage(wpEvent), // Nueva propiedad para el hero
      category: this.getCategoryFromTitle(wpEvent.title.rendered),
      status: status,
      featured: wpEvent.meta?._tribe_featured || Math.random() > 0.7, // Marcar algunos como destacados aleatoriamente
      tags: this.extractTagsFromTitle(wpEvent.title.rendered),
      organizer: 'BioTickets',
      capacity: 500,
      soldTickets: Math.floor(Math.random() * 300), // Random para demo
      link: wpEvent.link,
      startDateTime: startDate,
      endDateTime: endDate,
      allDay: wpEvent.meta?._tribe_events_all_day || false
    };
  }

  private extractPriceFromTitle(title: string): string {
    // Buscar patrones de precio en el título
    const priceMatch = title.match(/\$?(\d+[.,]?\d*)/);
    return priceMatch ? priceMatch[1] : '0';
  }

  private extractVenueFromContent(title: string, content: string): string {
    // Buscar venue en el título
    if (title.toLowerCase().includes('bailatino menga')) {
      return 'Bailatino Menga, Cali';
    }
    if (title.toLowerCase().includes('menga')) {
      return 'Club Menga, Cali';
    }
    
    // Buscar otras ubicaciones comunes
    const commonVenues = [
      { pattern: /zona rosa/i, venue: 'Zona Rosa, Bogotá' },
      { pattern: /teatro/i, venue: 'Teatro Nacional, Bogotá' },
      { pattern: /coliseo/i, venue: 'Coliseo, Bogotá' },
      { pattern: /club/i, venue: 'Club Nocturno, Bogotá' }
    ];
    
    for (const venueInfo of commonVenues) {
      if (venueInfo.pattern.test(title) || venueInfo.pattern.test(content)) {
        return venueInfo.venue;
      }
    }
    
    return 'Bogotá, Colombia'; // Fallback
  }

  private extractTimeFromTitle(title: string): string | null {
    // Buscar patrones de hora en el título
    const timeMatch = title.match(/(\d{1,2}):(\d{2})|(\d{1,2})\s*(pm|am)/i);
    if (timeMatch) {
      if (timeMatch[1] && timeMatch[2]) {
        return `${timeMatch[1]}:${timeMatch[2]}`;
      } else if (timeMatch[3]) {
        return `${timeMatch[3]}:00`;
      }
    }
    
    // Si menciona "21:00" o similar en el título
    if (title.includes('21:00') || title.toLowerCase().includes('9 pm')) {
      return '21:00';
    }
    
    return null;
  }

  private getCategoryFromTitle(title: string): string {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('fiesta') || titleLower.includes('party')) {
      return 'Fiesta';
    } else if (titleLower.includes('salsa') || titleLower.includes('bachata')) {
      return 'Salsa';
    } else if (titleLower.includes('reggaeton') || titleLower.includes('urbano')) {
      return 'Reggaetón';
    } else if (titleLower.includes('rock')) {
      return 'Rock';
    } else if (titleLower.includes('jazz')) {
      return 'Jazz';
    } else if (titleLower.includes('electroni') || titleLower.includes('techno')) {
      return 'Electrónica';
    }
    
    return 'Música';
  }

  private extractTagsFromTitle(title: string): string[] {
    const tags: string[] = [];
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('verano')) tags.push('verano');
    if (titleLower.includes('roja') || titleLower.includes('red')) tags.push('dress-code');
    if (titleLower.includes('fiesta')) tags.push('fiesta');
    if (titleLower.includes('bailatino')) tags.push('bailatino');
    
    return tags;
  }

  private generateDescriptionFromTitle(title: string): string {
    const artist = this.extractArtistFromTitle(title);
    const venue = title.toLowerCase().includes('bailatino menga') ? 'Bailatino Menga' : 'el mejor venue de la ciudad';
    
    if (artist) {
      return `¡No te pierdas esta increíble presentación de ${artist} en ${venue}! Una noche llena de música, diversión y los mejores ritmos.`;
    }
    
    return `Una noche espectacular llena de música y diversión en ${venue}. ¡Ven y disfruta de los mejores ritmos!`;
  }

  private extractArtistFromTitle(title: string): string | null {
    // Buscar nombres de artistas conocidos en el título
    const artistPatterns = [
      /roberto blades/i,
      /osvaldo rom[aá]n/i,
      // Agregar más patrones según sea necesario
    ];
    
    for (const pattern of artistPatterns) {
      const match = title.match(pattern);
      if (match) {
        return match[0];
      }
    }
    
    return null;
  }

  private extractEventDateFromTitle(title: string): string | null {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    
    // Patrón para "15 AGOSTO" -> Agosto 15
    const monthDayPattern = /(\d{1,2})\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i;
    const match = title.match(monthDayPattern);
    
    if (match) {
      const day = parseInt(match[1]);
      const monthName = match[2].toLowerCase();
      
      const monthMap: {[key: string]: number} = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
        'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
        'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
      };
      
      const month = monthMap[monthName];
      if (month !== undefined) {
        // Si el mes ya pasó este año, usar el próximo año
        const now = new Date();
        const eventDateThisYear = new Date(currentYear, month, day);
        const eventYear = eventDateThisYear > now ? currentYear : nextYear;
        
        const eventDate = new Date(eventYear, month, day);
        return eventDate.toISOString();
      }
    }
    
    // Patrón para "26 SEPTIEMBRE" -> Septiembre 26
    const dayMonthPattern = /(\d{1,2})\s+(septiembre|agosto|enero|febrero|marzo|abril|mayo|junio|julio|octubre|noviembre|diciembre)/i;
    const match2 = title.match(dayMonthPattern);
    
    if (match2) {
      const day = parseInt(match2[1]);
      const monthName = match2[2].toLowerCase();
      
      const monthMap: {[key: string]: number} = {
        'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
        'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
        'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
      };
      
      const month = monthMap[monthName];
      if (month !== undefined) {
        // Si el mes ya pasó este año, usar el próximo año
        const now = new Date();
        const eventDateThisYear = new Date(currentYear, month, day);
        const eventYear = eventDateThisYear > now ? currentYear : nextYear;
        
        const eventDate = new Date(eventYear, month, day);
        return eventDate.toISOString();
      }
    }
    
    return null;
  }

  async convertMultipleEvents(wpEvents: WordPressEvent[]): Promise<Event[]> {
    const convertPromises = wpEvents.map(wpEvent => this.convertToEvent(wpEvent));
    return Promise.all(convertPromises);
  }

  // Método para obtener eventos próximos convertidos
  async getUpcomingEvents(limit: number = 12): Promise<Event[]> {
    try {
      // Obtener todos los eventos y filtrar después de convertir
      const wpEvents = await wordpressAPI.getEvents({
        per_page: 50, // Obtener más eventos para filtrar
        _embed: true
      });
      
      const allEvents = await this.convertMultipleEvents(wpEvents);
      
      // Filtrar eventos futuros
      const upcomingEvents = allEvents
        .filter(event => event.status === 'upcoming')
        .slice(0, limit);
      
      console.log('🔍 Total WP events:', wpEvents.length);
      console.log('🔍 Converted events:', allEvents.length);
      console.log('🔍 Upcoming events:', upcomingEvents.length);
      
      return upcomingEvents;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
  }

  // Método para obtener eventos pasados convertidos
  async getPastEvents(limit: number = 50): Promise<Event[]> {
    try {
      // Obtener eventos pasados específicos de WordPress
      const wpEvents = await wordpressAPI.getPastEvents(limit);
      
      const allEvents = await this.convertMultipleEvents(wpEvents);
      
      // Filtrar eventos pasados y ordenar de más reciente a más antiguo
      const pastEvents = allEvents
        .filter(event => event.status === 'past')
        .sort((a, b) => {
          // Ordenar por fecha de inicio, más reciente primero
          const dateA = new Date(a.startDateTime || a.date);
          const dateB = new Date(b.startDateTime || b.date);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, limit);
      
      console.log('🔍 Past events found:', pastEvents.length);
      
      return pastEvents;
    } catch (error) {
      console.error('Error fetching past events:', error);
      return [];
    }
  }

  // Método para buscar eventos convertidos
  async searchEvents(query: string, limit: number = 12): Promise<Event[]> {
    try {
      const wpEvents = await wordpressAPI.searchEvents(query, limit);
      return this.convertMultipleEvents(wpEvents);
    } catch (error) {
      console.error('Error searching events:', error);
      return [];
    }
  }
}

export const eventsAdapter = new EventsAdapter();