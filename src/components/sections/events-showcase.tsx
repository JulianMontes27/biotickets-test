"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { upcomingEvents, pastEvents } from "@/data/events";
import { Event } from "@/types";

export default function EventsShowcase() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = {
      0: 'ENE', 1: 'FEB', 2: 'MAR', 3: 'ABR', 4: 'MAY', 5: 'JUN',
      6: 'JUL', 7: 'AGO', 8: 'SEP', 9: 'OCT', 10: 'NOV', 11: 'DIC'
    };
    
    const month = monthNames[date.getMonth() as keyof typeof monthNames];
    const day = date.getDate();
    
    return `${month} ${day}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  const EventCard = ({ event }: { event: Event }) => (
    <div
      className="group relative bg-zinc-900 overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500 h-full"
      onMouseEnter={() => setHoveredCard(event.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{
        transform: hoveredCard === event.id ? 'translateY(-4px) rotateY(2deg)' : 'translateY(0) rotateY(0deg)',
        boxShadow: hoveredCard === event.id ? '0 25px 50px rgba(255, 214, 10, 0.1), 0 10px 30px rgba(0, 0, 0, 0.4)' : 'none'
      }}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden bg-black">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-2 text-center min-w-[60px] rounded-xl shadow-lg border border-indigo-400/20">
          <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {formatDate(event.date).split(' ')[1]}
          </div>
          <div className="text-[10px] font-medium text-zinc-400 leading-tight">
            {formatDate(event.date).split(' ')[0]}
          </div>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="text-white/60 text-sm">Desde</span>
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {formatPrice(event.ticketPrice)}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 bg-black/40">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight tracking-wide">
          {event.title}
        </h3>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed font-light tracking-wide">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-indigo-400" />
              <span>{event.venue}</span>
            </div>
            <span>{event.time}</span>
          </div>

          <button 
            className="p-2 bg-gradient-to-r from-indigo-400 to-purple-400 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 rounded-full shadow-lg hover:from-indigo-500 hover:to-purple-500"
            aria-label="Ver detalles"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 xl:py-40 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight">
            Próximos <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Eventos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed tracking-wide font-light">
            Descubre los mejores eventos musicales y culturales de la ciudad.
          </p>
        </div>

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

        {/* Events Carousel with Grid Pages */}
        <div className="relative">
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
            {/* Create pages of 9 events each (3x3 grid) */}
            {Array.from({ length: Math.ceil(currentEvents.length / 9) }, (_, pageIndex) => {
              const pageEvents = currentEvents.slice(pageIndex * 9, (pageIndex + 1) * 9);
              return (
                <div 
                  key={pageIndex}
                  className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  {pageEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
          <button 
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm sm:text-base font-medium transition-all duration-300 rounded-full shadow-lg hover:from-indigo-500 hover:to-purple-500"
            style={{
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)'
            }}
          >
            <span className="flex items-center gap-2">
              Ver Todos los Eventos
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}