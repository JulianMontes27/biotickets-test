"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Event } from "@/types";
import EventCard from "./event-card";

interface EventsCarouselProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export default function EventsCarousel({ upcomingEvents, pastEvents }: EventsCarouselProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <>
      {/* Tabs with Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 md:mb-16 border-b border-zinc-800">
        <div className="flex gap-6 sm:gap-8 md:gap-12 mb-4 sm:mb-0">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 sm:pb-6 px-1 sm:px-2 text-xs sm:text-sm font-bold transition-all duration-300 tracking-[0.15em] sm:tracking-[0.2em] leading-none ${
              activeTab === 'upcoming'
                ? 'text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text border-b-2 border-indigo-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            PRÓXIMOS
          </button>
          
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-4 sm:pb-6 px-1 sm:px-2 text-xs sm:text-sm font-bold transition-all duration-300 tracking-[0.15em] sm:tracking-[0.2em] leading-none ${
              activeTab === 'past'
                ? 'text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text border-b-2 border-indigo-400'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            PASADOS
          </button>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2 sm:gap-4 pb-4 sm:pb-6">
          <button
            onClick={scrollLeft}
            className="p-2 sm:p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 sm:p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Events Display */}
      <div className="relative">
        {currentEvents.length === 0 ? (
          <div className="text-center py-16 sm:py-20 md:py-24">
            <div className="max-w-md mx-auto">
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 flex items-center justify-center border border-indigo-400/20">
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
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                No hay eventos {activeTab === 'upcoming' ? 'próximos' : 'pasados'}
              </h3>
              
              {/* Description */}
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                {activeTab === 'upcoming' 
                  ? 'Estamos preparando increíbles eventos para ti. ¡Regresa pronto para ver las novedades!'
                  : 'Aún no hay eventos pasados registrados. ¡Los próximos eventos serán memorables!'
                }
              </p>
              
              {/* CTA Button */}
              {activeTab === 'upcoming' && (
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm font-medium rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Actualizar eventos
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Carousel Container */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide py-4 sm:py-6 md:py-8 gap-8 sm:gap-12"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollSnapType: 'x mandatory'
              }}
            >
              {/* Create pages with responsive event counts */}
              {(() => {
                const eventsPerPage = isMobile ? 3 : 9; // 3 for mobile, 9 for larger screens
                const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
                
                return Array.from({ length: totalPages }, (_, pageIndex) => {
                  const pageEvents = currentEvents.slice(pageIndex * eventsPerPage, (pageIndex + 1) * eventsPerPage);
                  return (
                    <div 
                      key={pageIndex}
                      className="flex-shrink-0 w-full flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      {pageEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  );
                });
              })()}
            </div>
          </>
        )}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
        <Link 
          href="/eventos"
          className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm sm:text-base font-medium transition-all duration-300 rounded-full shadow-lg hover:from-indigo-500 hover:to-purple-500 inline-flex items-center gap-2"
          style={{
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
          }}
        >
          Ver Todos los Eventos
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
        </Link>
      </div>
    </>
  );
}