import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  className?: string;
}

export default function EventCard({ event, className }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={cn(
      "group relative bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-border/50",
      className
    )}>
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {formatPrice(event.ticketPrice)}
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <div className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium">
            🎵 {event.isPastEvent ? 'FINALIZADO' : 'DISPONIBLE'}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-2 py-1">
              <Calendar size={14} />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-2 py-1">
              <Clock size={14} />
              <span className="font-medium">{event.time}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            <span className="line-clamp-1 font-medium">{event.venue}</span>
          </div>
        </div>

        <div className="pt-3">
          {event.isPastEvent ? (
            <Button 
              variant="secondary" 
              className="w-full opacity-60" 
              disabled
            >
              Evento Finalizado
            </Button>
          ) : (
            <Button 
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🎫 Comprar Tickets
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}