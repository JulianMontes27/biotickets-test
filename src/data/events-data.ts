import { Event } from '@/types';
import { eventsAdapter } from '@/services/events-adapter';
import { tribeEventsAdapter } from '@/services/tribe-events-adapter';

// Solo datos reales de WordPress API - sin fallbacks

// Cache para evitar múltiples llamadas a la API
let upcomingEventsCache: Event[] | null = null;
let pastEventsCache: Event[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour to reduce API calls

// Función para verificar si el cache es válido
function isCacheValid(): boolean {
  return Date.now() - cacheTimestamp < CACHE_DURATION;
}

// Función para obtener eventos próximos (Tribe API)
export async function getUpcomingEvents(): Promise<Event[]> {
  // Si tenemos cache válido, retornarlo
  if (upcomingEventsCache && isCacheValid()) {
    return upcomingEventsCache;
  }

  try {
    // Limpiar cache para debugging
    upcomingEventsCache = null;
    
    const tribeEvents = await tribeEventsAdapter.getUpcomingEvents(12);
    
    upcomingEventsCache = tribeEvents;
    cacheTimestamp = Date.now();
    return tribeEvents;
  } catch (error) {
    console.error('❌ Error loading Tribe Events upcoming events:', error);
    upcomingEventsCache = [];
    cacheTimestamp = Date.now();
    return [];
  }
}

// Función para obtener eventos pasados (WordPress + fallback)
export async function getPastEvents(): Promise<Event[]> {
  // Si tenemos cache válido, retornarlo
  if (pastEventsCache && isCacheValid()) {
    return pastEventsCache;
  }

  try {
    // Clear cache for debugging - but don't reset timestamp yet
    pastEventsCache = null;
    
    const tribeEvents = await tribeEventsAdapter.getPastEvents(50);
    
    // Ensure we have a valid array before caching
    if (Array.isArray(tribeEvents)) {
      pastEventsCache = tribeEvents;
      cacheTimestamp = Date.now();
      return tribeEvents;
    } else {
      console.warn('⚠️ getPastEvents: tribeEventsAdapter returned non-array:', typeof tribeEvents);
      pastEventsCache = [];
      cacheTimestamp = Date.now();
      return [];
    }
  } catch (error) {
    console.error('❌ Error loading Tribe Events past events:', error);
    pastEventsCache = [];
    cacheTimestamp = Date.now();
    return [];
  }
}

// Función para buscar eventos
export async function searchEvents(query: string): Promise<Event[]> {
  try {
    console.log('🔍 Searching events in WordPress:', query);
    const searchResults = await eventsAdapter.searchEvents(query, 20);
    
    if (searchResults.length > 0) {
      console.log('✅ Search results found:', searchResults.length);
      return searchResults;
    } else {
      console.log('⚠️ No WordPress search results found');
      return [];
    }
  } catch (error) {
    console.error('❌ Error searching events:', error);
    return [];
  }
}

// Función para limpiar cache (útil para desarrollo)
export function clearEventsCache(): void {
  upcomingEventsCache = null;
  pastEventsCache = null;
  cacheTimestamp = 0;
  console.log('🗑️ Events cache cleared');
}

// Todos los eventos vienen ahora exclusivamente de WordPress API