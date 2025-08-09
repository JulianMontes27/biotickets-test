"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/data/events";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const mainEvent = upcomingEvents[0]; // Evento principal

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Full Screen Image */}
      <div className="absolute inset-0">
        <Image
          src={mainEvent?.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3"}
          alt={mainEvent?.title || "Event"}
          fill
          className={`object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Gradient Overlay Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Minimal Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-16 pt-40 lg:pt-48">
        

        {/* Center Content */}
        <div className="max-w-4xl">
          {/* Event Category */}
          <div className="mb-6">
            <span className="text-white/50 text-xs font-mono tracking-[0.3em] uppercase leading-relaxed">
              {mainEvent?.category || "Evento Principal"}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tight">
            <span className="text-white">{(mainEvent?.title || "FESTIVAL ÉPICO").split(' ').slice(0, -1).join(' ')} </span>
            <span className="text-[#FFD60A]">{(mainEvent?.title || "FESTIVAL ÉPICO 2024").split(' ').slice(-1)[0]}</span>
          </h1>

          {/* Event Details - Minimal */}
          <div className="flex flex-wrap items-center gap-6 text-white/70 mb-8">
            <span className="text-base font-medium tracking-wide">
              {new Date(mainEvent?.date || "2024-09-15").toLocaleDateString('es-ES', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-base font-medium tracking-wide">
              {mainEvent?.venue || "Bogotá, Colombia"}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-base font-semibold tracking-wide">
              Desde {formatPrice(mainEvent?.ticketPrice || 0)}
            </span>
          </div>

          {/* CTA Buttons - 3D Style */}
          <div className="flex flex-wrap gap-4">
            <button 
              className="relative px-8 py-3 bg-[#FFD60A] text-black font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 group hover:bg-[#FFCC00]"
              style={{
                boxShadow: '0 6px 20px rgba(255,214,10,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <span className="flex items-center">
                Comprar Boletos
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </span>
            </button>
            
            <button 
              className="relative px-8 py-3 bg-transparent text-white font-semibold border-2 border-white/30 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:border-[#FFD60A] hover:text-[#FFD60A]"
            >
              Ver Detalles
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-center">
          {/* Scroll Indicator */}
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-white/60 text-xs font-mono mb-3 tracking-[0.25em] leading-relaxed">DESCUBRE MÁS</span>
            <ChevronDown className="text-white/60" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}