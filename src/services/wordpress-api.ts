const WORDPRESS_API_BASE = 'https://www.biotickets.com/wp-json/wp/v2';
const TRIBE_EVENTS_API_BASE = 'https://www.biotickets.com/wp-json/tribe/events/v1';

export interface WordPressEvent {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta?: {
    [key: string]: unknown; // Hacer meta opcional y flexible
    _tribe_featured?: boolean;
    _tribe_events_start_date?: string;
    _tribe_events_end_date?: string;
    _tribe_events_start_time?: string;
    _tribe_events_end_time?: string;
    _tribe_events_all_day?: boolean;
    _tribe_events_venue_id?: string;
    _tribe_events_organizer_id?: string;
    _tribe_events_cost?: string;
    _tribe_events_cost_currency?: string;
    _tribe_events_cost_currency_symbol?: string;
    _tribe_events_cost_currency_position?: string;
  };
  tags?: number[];
  tribe_events_cat?: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details?: {
        width: number;
        height: number;
        file: string;
        sizes?: {
          thumbnail?: {
            source_url: string;
            width: number;
            height: number;
          };
          medium?: {
            source_url: string;
            width: number;
            height: number;
          };
          large?: {
            source_url: string;
            width: number;
            height: number;
          };
          full?: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressVenue {
  id: number;
  title: {
    rendered: string;
  };
  meta: {
    _VenueAddress: string;
    _VenueCity: string;
    _VenueCountry: string;
    _VenueStateProvince: string;
    _VenueZip: string;
  };
}

export interface WordPressOrganizer {
  id: number;
  title: {
    rendered: string;
  };
  meta: {
    _OrganizerEmail: string;
    _OrganizerPhone: string;
    _OrganizerWebsite: string;
  };
}

export interface TribeEvent {
  id: number;
  global_id: string;
  global_id_lineage: string[];
  author: string;
  status: string;
  date: string;
  date_utc: string;
  modified: string;
  modified_utc: string;
  url: string;
  rest_url: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  image: {
    url: string;
    id: number;
    extension: string;
    width: number;
    height: number;
    filesize: number;
    alt: string;
    title: string;
    description: string;
    caption: string;
    name: string;
    sizes: {
      thumbnail: string;
      medium: string;
      large: string;
      full: string;
    };
  };
  all_day: boolean;
  start_date: string;
  start_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  end_date: string;
  end_date_details: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minutes: string;
    seconds: string;
  };
  utc_start_date: string;
  utc_end_date: string;
  timezone: string;
  timezone_abbr: string;
  cost: string;
  cost_details: {
    currency_symbol: string;
    currency_code: string;
    currency_position: string;
    values: unknown[];
  };
  website: string;
  show_map: boolean;
  show_map_link: boolean;
  hide_from_listings: boolean;
  sticky: boolean;
  featured: boolean;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
    urls: {
      self: string;
      collection: string;
    };
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
    taxonomy: string;
    urls: {
      self: string;
      collection: string;
    };
  }>;
  venue: {
    id: number;
    venue: string;
    slug: string;
    address: string;
    city: string;
    country: string;
    province: string;
    state: string;
    zip: string;
    phone: string;
    website: string;
    show_map: boolean;
    show_map_link: boolean;
    global_id: string;
    global_id_lineage: string[];
  };
  organizer: unknown[];
}

class WordPressAPI {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800',
        },
        // Longer cache duration to reduce Fast Origin Transfer
        next: { revalidate: 86400 }, // 24 hours
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      throw error;
    }
  }

  async getEvents(params: {
    per_page?: number;
    page?: number;
    status?: 'publish' | 'draft' | 'private';
    orderby?: 'date' | 'title' | 'menu_order';
    order?: 'asc' | 'desc';
    after?: string; // ISO 8601 date
    before?: string; // ISO 8601 date
    search?: string;
    _embed?: boolean;
  } = {}): Promise<WordPressEvent[]> {
    const defaultParams = {
      per_page: 12,
      status: 'publish' as const,
      orderby: 'date' as const,
      order: 'asc' as const,
      _embed: true,
      ...params
    };

    const queryString = new URLSearchParams(
      Object.entries(defaultParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `${WORDPRESS_API_BASE}/tribe_events?${queryString}`;
    return this.fetchWithErrorHandling<WordPressEvent[]>(url);
  }

  async getUpcomingEvents(limit: number = 12): Promise<WordPressEvent[]> {
    const now = new Date().toISOString();
    return this.getEvents({
      per_page: limit,
      after: now,
      orderby: 'date',
      order: 'asc',
      _embed: true
    });
  }

  async getPastEvents(limit: number = 12): Promise<WordPressEvent[]> {
    // Intentar obtener todos los eventos primero sin filtros
    return this.getEvents({
      per_page: limit * 3, // Pedir más eventos para filtrar localmente
      orderby: 'date',
      order: 'desc',
      _embed: true,
      status: 'publish'
    });
  }

  async getEventById(id: number): Promise<WordPressEvent> {
    const url = `${WORDPRESS_API_BASE}/tribe_events/${id}?_embed=true`;
    return this.fetchWithErrorHandling<WordPressEvent>(url);
  }

  async getVenue(id: string): Promise<WordPressVenue | null> {
    if (!id || id === '0') return null;
    const url = `${WORDPRESS_API_BASE}/tribe_venue/${id}`;
    try {
      return await this.fetchWithErrorHandling<WordPressVenue>(url);
    } catch (error) {
      console.warn(`Venue ${id} not found:`, error);
      return null;
    }
  }

  async getOrganizer(id: string): Promise<WordPressOrganizer | null> {
    if (!id || id === '0') return null;
    const url = `${WORDPRESS_API_BASE}/tribe_organizer/${id}`;
    try {
      return await this.fetchWithErrorHandling<WordPressOrganizer>(url);
    } catch (error) {
      console.warn(`Organizer ${id} not found:`, error);
      return null;
    }
  }

  async searchEvents(query: string, limit: number = 12): Promise<WordPressEvent[]> {
    return this.getEvents({
      search: query,
      per_page: limit,
      _embed: true
    });
  }

  // Métodos para la API de Tribe Events (más completa)
  async getTribeEvents(params: {
    per_page?: number;
    page?: number;
    start_date?: string;
    end_date?: string;
    starts_after?: string;
    starts_before?: string;
    ends_after?: string;
    ends_before?: string;
    search?: string;
    featured?: boolean;
    status?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<TribeEvent[]> {
    const defaultParams = {
      per_page: 12,
      ...params
    };

    const queryString = new URLSearchParams(
      Object.entries(defaultParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `${TRIBE_EVENTS_API_BASE}/events?${queryString}`;
    console.log('🔍 Final Tribe API URL:', url);
    const response = await this.fetchWithErrorHandling<{events: TribeEvent[]}>(url);
    console.log('🔍 Tribe API response:', {
      eventsCount: response.events?.length || 0,
      totalResponse: !!response,
      hasEvents: !!response.events
    });
    return response.events || [];
  }

  async getTribeUpcomingEvents(limit: number = 12): Promise<TribeEvent[]> {
    const now = new Date().toISOString();
    return this.getTribeEvents({
      per_page: limit,
      starts_after: now
    });
  }

  async getTribePastEvents(limit: number = 12): Promise<TribeEvent[]> {
    // Usar formato DD/MM/YYYY que espera la API
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${day}/${month}/${year}`;
    
    console.log('🔍 Fetching past events before:', currentDate);
    
    const params = {
      per_page: limit,
      ends_before: currentDate,
      orderby: 'start_date',
      order: 'desc'
    };
    
    console.log('🔍 API params:', params);
    
    const result = await this.getTribeEvents(params);
    console.log('🔍 getTribeEvents returned:', Array.isArray(result) ? result.length : typeof result, 'events');
    
    return result;
  }
}

export const wordpressAPI = new WordPressAPI();