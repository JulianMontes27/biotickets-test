"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { upcomingEvents, pastEvents } from "@/data/events";
import { Event } from "@/types";

export default function EventsShowcase() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
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

  const EventCard = ({ event, index }: { event: Event; index: number }) => (
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
        <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-2 text-center min-w-[60px] rounded-xl shadow-lg border border-[#FFD60A]/20">
          <div className="text-xl font-bold text-[#FFD60A]">
            {formatDate(event.date).split(' ')[1]}
          </div>
          <div className="text-[10px] font-medium text-zinc-400 leading-tight">
            {formatDate(event.date).split(' ')[0]}
          </div>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4">
          <span className="text-white/60 text-sm">Desde</span>
          <div className="text-2xl font-bold text-[#FFD60A]">
            {formatPrice(event.ticketPrice)}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 bg-black/40">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-[#FFD60A] transition-all duration-300 leading-tight tracking-wide">
          {event.title}
        </h3>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed font-light tracking-wide">
          {event.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-[#FFD60A]" />
              <span>{event.venue}</span>
            </div>
            <span>{event.time}</span>
          </div>

          <button 
            className="p-2 bg-[#FFD60A] text-black opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 rounded-full shadow-lg hover:bg-[#FFCC00]"
            aria-label="Ver detalles"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tight">
            Próximos <span className="text-[#FFD60A]">Eventos</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed tracking-wide font-light">
            Descubre los mejores eventos musicales y culturales de la ciudad.
          </p>
        </div>

        {/* Tabs with Navigation Buttons */}
        <div className="flex justify-between items-end mb-16 border-b border-zinc-800">
          <div className="flex gap-12">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-6 px-2 text-sm font-bold transition-all duration-300 tracking-[0.2em] leading-none ${
                activeTab === 'upcoming'
                  ? 'text-[#FFD60A] border-b-2 border-[#FFD60A]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              PRÓXIMOS
            </button>
            
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-6 px-2 text-sm font-bold transition-all duration-300 tracking-[0.2em] leading-none ${
                activeTab === 'past'
                  ? 'text-[#FFD60A] border-b-2 border-[#FFD60A]'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              PASADOS
            </button>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4 pb-6">
            <button
              onClick={scrollLeft}
              className="p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-[#FFD60A] hover:border-[#FFD60A]/40 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-[#FFD60A] hover:border-[#FFD60A]/40 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Events Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {currentEvents.map((event, index) => (
              <div key={event.id} className="flex-shrink-0 w-80">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <button 
            className="group px-8 py-4 bg-[#FFD60A] text-black font-medium transition-all duration-300 rounded-full shadow-lg hover:bg-[#FFCC00]"
            style={{
              boxShadow: '0 10px 30px rgba(255, 214, 10, 0.3)'
            }}
          >
            <span className="flex items-center gap-2">
              Ver Todos los Eventos
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}