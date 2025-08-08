"use client";

import { useState, useMemo } from "react";
import { upcomingEvents } from "@/data/events";
import EventCard from "@/components/ui/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Filter, Calendar, MapPin, Music } from "lucide-react";

export default function UpcomingEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos", icon: Music },
    { id: "electronica", name: "Electrónica", icon: Music },
    { id: "rock", name: "Rock", icon: Music },
    { id: "jazz", name: "Jazz", icon: Music },
  ];

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
                             event.title.toLowerCase().includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-primary">✨ Próximos Eventos</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Conciertos que No Te Puedes Perder
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Descubre los eventos más esperados del año. Desde festivales masivos hasta conciertos íntimos, 
            encuentra tu próxima experiencia musical perfecta.
          </p>
        </div>

        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Buscar por artista, evento o lugar..."
                className="pl-10 py-3 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="lg:w-auto w-full">
              <Filter size={20} className="mr-2" />
              Filtros Avanzados
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  <IconComponent size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event}
                className="animate-fade-in transform hover:scale-105 transition-transform duration-300"
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2">No se encontraron eventos</h3>
              <p className="text-muted-foreground">Intenta con otros términos de búsqueda o categorías</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/eventos">
              Ver Todos los Eventos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}