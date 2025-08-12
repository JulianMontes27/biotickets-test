import { Metadata } from 'next';
import { getUpcomingEvents, getPastEvents } from '@/data/events-data';
import EventsGrid from '@/components/sections/events-grid';

// Enable ISR with 1 hour revalidation for cost optimization
export const revalidate = 3600;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Todos los Eventos - BioTickets',
  description: 'Descubre todos los eventos disponibles en BioTickets. Conciertos, festivales y shows en vivo.',
  openGraph: {
    title: 'Todos los Eventos - BioTickets',
    description: 'Descubre todos los eventos disponibles en BioTickets',
    type: 'website',
  },
};

export default async function EventosPage() {
  // Fetch events on the server, just like in EventsShowcase
  const [upcomingEvents, pastEvents] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents()
  ]);

  // Debug logs
  console.log('EventosPage - upcomingEvents loaded:', upcomingEvents?.length || 0);
  console.log('EventosPage - pastEvents loaded:', pastEvents?.length || 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page Header */}
      <div className="py-16 sm:py-20 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tight">
              Todos los <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Eventos</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl">
              Descubre la mejor selección de conciertos, festivales y experiencias musicales.
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="pb-16 sm:pb-20 md:pb-24">
        <EventsGrid 
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
        />
      </div>
    </div>
  );
}