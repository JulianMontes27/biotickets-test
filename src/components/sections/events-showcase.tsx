"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, Star, Sparkles, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents, pastEvents } from "@/data/events";
import { Event } from "@/types";

export default function EventsShowcase() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !hoveredCard) return;

      const cards = containerRef.current.querySelectorAll('[data-card-id]');
      const hoveredCardElement = Array.from(cards).find(
        card => card.getAttribute('data-card-id') === hoveredCard
      ) as HTMLElement;

      if (!hoveredCardElement) return;

      const rect = hoveredCardElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxRotation = 8;
      const rotateX = (deltaY / window.innerHeight) * maxRotation * -1;
      const rotateY = (deltaX / window.innerWidth) * maxRotation;

      hoveredCardElement.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
        scale(1.02)
      `;
    };

    const handleMouseLeave = () => {
      if (!containerRef.current || !hoveredCard) return;
      
      const cards = containerRef.current.querySelectorAll('[data-card-id]');
      const hoveredCardElement = Array.from(cards).find(
        card => card.getAttribute('data-card-id') === hoveredCard
      ) as HTMLElement;

      if (hoveredCardElement) {
        hoveredCardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
      }
    };

    if (hoveredCard) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hoveredCard]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
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
      data-card-id={event.id}
      className="relative group transition-all duration-300 will-change-transform"
      style={{ 
        transformStyle: "preserve-3d",
        animationDelay: `${index * 0.1}s` 
      }}
      onMouseEnter={() => setHoveredCard(event.id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      {/* Card Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500 transform scale-105" />
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 group-hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-2xl">
        
        {/* Event Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${
              activeTab === 'upcoming' 
                ? 'bg-green-500/20 border-green-400/30 text-green-300' 
                : 'bg-slate-500/20 border-slate-400/30 text-slate-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                activeTab === 'upcoming' ? 'bg-green-400 animate-pulse' : 'bg-slate-400'
              }`} />
              <span className="text-sm font-medium">
                {activeTab === 'upcoming' ? 'PRÓXIMO' : 'FINALIZADO'}
              </span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-md rounded-full px-4 py-2 border border-primary/30">
            <span className="text-primary font-bold text-sm">
              {formatPrice(event.ticketPrice)}
            </span>
          </div>

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Sparkles size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
              {event.description}
            </p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              <Calendar size={16} className="text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              <Clock size={16} className="text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              <MapPin size={16} className="text-primary" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
              <Users size={16} className="text-primary" />
              <span>2K+ personas</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button 
              className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105 ${
                activeTab === 'upcoming' 
                  ? 'bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-500 text-slate-900'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
              }`}
            >
              {activeTab === 'upcoming' ? (
                <>
                  <span>Comprar Boleto</span>
                  <ArrowRight size={16} className="ml-2" />
                </>
              ) : (
                <>
                  <span>Ver Detalles</span>
                  <Star size={16} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 3D depth effects */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-slate-700/10 to-slate-900/10 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(-5px)" }}
        />
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-black via-slate-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-cyan-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-md rounded-full px-6 py-3 border border-slate-700/50">
            <Sparkles size={20} className="text-primary" />
            <span className="text-slate-300 font-medium">Descubre Eventos</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-none">
            <span className="block">EVENTOS</span>
            <span className="block bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent">
              INCREÍBLES
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explora los mejores eventos de música y entretenimiento. 
            Desde próximos conciertos hasta eventos pasados épicos.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-2 border border-slate-700/50">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-primary to-cyan-400 text-slate-900 shadow-lg'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar size={18} />
                  Próximos Eventos
                </span>
                {activeTab === 'upcoming' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-400/20 rounded-xl blur-xl" />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('past')}
                className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'past'
                    ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Star size={18} />
                  Eventos Pasados
                </span>
                {activeTab === 'past' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-700/20 rounded-xl blur-xl" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "1000px" }}
        >
          {currentEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Sparkles size={20} className="mr-2" />
            Ver Todos los Eventos
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}