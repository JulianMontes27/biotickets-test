"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Función para decodificar entidades HTML
  const decodeHtmlEntities = (text: string): string => {
    if (typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    }
    return text.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return 'ENE 1';
    }
    
    let date: Date;
    
    // First, try to parse DD/MM/YYYY format directly (most reliable)
    const dateParts = dateString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (dateParts) {
      const [, day, month, year] = dateParts;
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      // Fallback to standard Date parsing
      date = new Date(dateString);
    }
    
    // Verificar que la fecha sea válida después del parsing
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
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

  return (
    <Link href={`/evento/${event.id}`} className="block">
      <div
        className="group relative bg-zinc-900 overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col cursor-pointer"
        onMouseEnter={() => setHoveredCard(true)}
        onMouseLeave={() => setHoveredCard(false)}
        style={{
          transform: hoveredCard ? 'translateY(-4px) rotateY(2deg)' : 'translateY(0) rotateY(0deg)',
          boxShadow: hoveredCard ? '0 25px 50px rgba(99, 102, 241, 0.15), 0 10px 30px rgba(168, 85, 247, 0.1)' : 'none',
          height: '480px'
        }}
      >
      {/* Event Image */}
      <div className="relative overflow-hidden bg-black flex-shrink-0 rounded-t-2xl" style={{ width: '100%', height: '360px' }}>
        <Image
          src={imageError ? 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3' : event.image}
          alt={event.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 rounded-t-2xl"
          onError={() => setImageError(true)}
          unoptimized={imageError}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={60}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
      </div>

      {/* Card Content - Title Only */}
      <div className="p-4 bg-black/40 flex-1 flex flex-col justify-start min-h-0" style={{ height: '120px' }}>
        <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight tracking-wide text-left py-2">
          {decodeHtmlEntities(event.title)}
        </h3>
      </div>
      </div>
    </Link>
  );
}