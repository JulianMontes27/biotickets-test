"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Event } from "@/types";
import { Calendar } from "lucide-react";

interface EventsGridCardProps {
  event: Event;
}

export default function EventsGridCard({ event }: EventsGridCardProps) {
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/evento/${event.id}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'ENE 1';
    
    let date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      const dateParts = dateString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (dateParts) {
        const [, day, month, year] = dateParts;
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        date = new Date();
      }
    }
    
    if (isNaN(date.getTime())) return 'ENE 1';
    
    const monthNames = {
      0: 'ENE', 1: 'FEB', 2: 'MAR', 3: 'ABR', 4: 'MAY', 5: 'JUN',
      6: 'JUL', 7: 'AGO', 8: 'SEP', 9: 'OCT', 10: 'NOV', 11: 'DIC'
    };
    
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex as keyof typeof monthNames];
    const day = date.getDate();
    
    if (!month || isNaN(day) || day < 1 || day > 31) return 'ENE 1';
    
    return `${month} ${day}`;
  };

  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    if (typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    }
    return text.replace(/&#8211;/g, '–').replace(/&#8212;/g, '—');
  };

  return (
    <div
      className="group relative bg-zinc-900 overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col cursor-pointer"
      onMouseEnter={() => setHoveredCard(true)}
      onMouseLeave={() => setHoveredCard(false)}
      onClick={handleCardClick}
      style={{
        transform: hoveredCard ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hoveredCard ? '0 20px 40px rgba(99, 102, 241, 0.1), 0 8px 24px rgba(168, 85, 247, 0.08)' : 'none',
        height: '390px' // Compact size for grid efficiency
      }}
    >
      {/* Event Image - Optimized for bandwidth */}
      <div className="relative overflow-hidden bg-black flex-shrink-0" style={{ width: '100%', height: '280px' }}>
        <Image
          src={imageError ? 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3' : event.image}
          alt={event.title}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
          onError={() => setImageError(true)}
          loading="lazy" // Always lazy load for grid view
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          quality={50} // Lower quality for grid view to save bandwidth
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1.5 text-center min-w-[50px] rounded-lg border border-indigo-400/20">
          <div className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {formatDate(event.date).split(' ')[1] || '1'}
          </div>
          <div className="text-[9px] font-medium text-zinc-400 leading-tight">
            {formatDate(event.date).split(' ')[0] || 'ENE'}
          </div>
        </div>

        {/* Status Badge for Past Events */}
        {event.status === 'past' && (
          <div className="absolute top-3 right-3 bg-zinc-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-zinc-400">PASADO</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="px-3 pb-3 pt-5 flex-1 flex flex-col justify-between" style={{ height: '110px' }}>
        {/* Title */}
        <h3 className="text-base font-bold text-white line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight mb-1">
          {decodeHtmlEntities(event.title)}
        </h3>

        {/* Event Info */}
        <div className="text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>{event.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}