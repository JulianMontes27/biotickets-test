"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return 'ENE 1';
    }
    
    let date = new Date(dateString);
    
    // Si la fecha no es válida, intentar parsear diferentes formatos
    if (isNaN(date.getTime())) {
      // Intentar formato DD/MM/YYYY
      const dateParts = dateString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (dateParts) {
        const [, day, month, year] = dateParts;
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        date = new Date(); // Fallback to current date
      }
    }
    
    // Verificar que la fecha sea válida después del parsing
    if (isNaN(date.getTime())) {
      return 'ENE 1';
    }
    
    const monthNames = {
      0: 'ENE', 1: 'FEB', 2: 'MAR', 3: 'ABR', 4: 'MAY', 5: 'JUN',
      6: 'JUL', 7: 'AGO', 8: 'SEP', 9: 'OCT', 10: 'NOV', 11: 'DIC'
    };
    
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex as keyof typeof monthNames];
    const day = date.getDate();
    
    // Verificar que tanto month como day sean válidos
    if (!month || isNaN(day) || day < 1 || day > 31) {
      return 'ENE 1'; // Fallback
    }
    
    return `${month} ${day}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="group relative bg-zinc-900 overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500 h-full"
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
      style={{
        transform: hoveredCard ? 'translateY(-4px) rotateY(2deg)' : 'translateY(0) rotateY(0deg)',
        boxShadow: hoveredCard ? '0 25px 50px rgba(255, 214, 10, 0.1), 0 10px 30px rgba(0, 0, 0, 0.4)' : 'none'
      }}
    >
      {/* Event Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
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
            {formatDate(event.date).split(' ')[1] || '1'}
          </div>
          <div className="text-[10px] font-medium text-zinc-400 leading-tight">
            {formatDate(event.date).split(' ')[0] || 'ENE'}
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
}