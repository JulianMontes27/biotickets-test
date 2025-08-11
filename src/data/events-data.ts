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
    console.log('🔄 Fetching upcoming events from Tribe Events API...');
    
    // Limpiar cache para debugging
    upcomingEventsCache = null;
    
    const tribeEvents = await tribeEventsAdapter.getUpcomingEvents(12);
    
    console.log('✅ Tribe Events upcoming events loaded:', tribeEvents.length);
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
    console.log(`🔄 Returning cached past events: ${pastEventsCache.length}`);
    return pastEventsCache;
  }

  try {
    console.log('🔄 Fetching past events from Tribe Events API...');
    
    // Limpiar cache para debugging - FORZAR NUEVA CARGA
    pastEventsCache = null;
    cacheTimestamp = 0;
    console.log('🔄 Cache cleared - forcing fresh API call');
    
    const tribeEvents = await tribeEventsAdapter.getPastEvents(50);
    
    console.log(`📊 Tribe Events past events found: ${tribeEvents.length}`);
    
    pastEventsCache = tribeEvents;
    cacheTimestamp = Date.now();
    return tribeEvents;
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