"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/types";
import EventsGridCard from "./events-grid-card";

interface EventsGridProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsGrid({ upcomingEvents, pastEvents }: EventsGridProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12;

  // Debug logs
  console.log('EventsGrid - upcomingEvents:', upcomingEvents?.length || 0);
  console.log('EventsGrid - pastEvents:', pastEvents?.length || 0);

  // Get current events based on active tab
  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  
  // Calculate pagination
  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = currentEvents.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when switching tabs
  const handleTabSwitch = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Tabs */}
      <div className="flex justify-start items-center mb-12 border-b border-zinc-800">
        <div className="flex gap-8">
          <button
            onClick={() => handleTabSwitch('upcoming')}
            className={`pb-6 px-2 text-sm font-bold transition-all duration-300 tracking-[0.2em] ${
              activeTab === 'upcoming'
                ? 'text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text border-b-2 border-indigo-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            PRÓXIMOS ({upcomingEvents.length})
          </button>
          
          <button
            onClick={() => handleTabSwitch('past')}
            className={`pb-6 px-2 text-sm font-bold transition-all duration-300 tracking-[0.2em] ${
              activeTab === 'past'
                ? 'text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text border-b-2 border-indigo-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            PASADOS ({pastEvents.length})
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {currentEvents.length === 0 ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 flex items-center justify-center border border-indigo-400/20 mx-auto mb-6">
              <svg 
                className="w-8 h-8 text-indigo-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 4v4m6-4v4m-8-8h12l-1 12H7L6 7z" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              No hay eventos {activeTab === 'upcoming' ? 'próximos' : 'pasados'}
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              {activeTab === 'upcoming' 
                ? 'Estamos preparando increíbles eventos para ti. ¡Regresa pronto!'
                : 'Aún no hay eventos pasados registrados.'
              }
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
            {paginatedEvents.map((event) => (
              <EventsGridCard key={event.id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              {/* Page Info */}
              <div className="text-zinc-400 text-sm">
                Mostrando {startIndex + 1}-{Math.min(endIndex, currentEvents.length)} de {currentEvents.length} eventos
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                    let page;
                    if (totalPages <= 5) {
                      page = index + 1;
                    } else if (currentPage <= 3) {
                      page = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + index;
                    } else {
                      page = currentPage - 2 + index;
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}