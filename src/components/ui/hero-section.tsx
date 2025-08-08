"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Calendar, MapPin, Users, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/data/events";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredEvents = upcomingEvents.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      month: 'long', 
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
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <Image
          src={featuredEvents[currentSlide]?.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"}
          alt="Concert Background"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-pulse blur-sm" />
      <div className="absolute top-1/3 right-32 w-2 h-2 bg-purple-500 rounded-full animate-pulse blur-sm" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Event Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-medium">EN VIVO AHORA</span>
              <Sparkles size={16} className="text-yellow-400" />
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-none">
                <span className="block">EL EVENTO</span>
                <span className="block bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent">
                  MÁS ESPERADO
                </span>
                <span className="block">DEL AÑO</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                3 días de música épica con los artistas más grandes del mundo. 
                Una experiencia que cambiará tu vida para siempre.
              </p>
            </div>

            {/* Event Info Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar size={20} className="text-primary" />
                  <span className="text-white font-semibold">Fecha</span>
                </div>
                <p className="text-gray-300">15-17 Septiembre</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={20} className="text-primary" />
                  <span className="text-white font-semibold">Lugar</span>
                </div>
                <p className="text-gray-300">Bogotá, Colombia</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                🎫 COMPRAR BOLETOS
                <ArrowRight size={20} className="ml-2" />
              </Button>
              
              <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm">
                <Play size={20} className="mr-2" />
                Ver Trailer
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Boletos Vendidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-sm text-gray-400">Artistas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-gray-400">Días Épicos</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Event Card */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative group">
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-primary font-bold text-sm">DESTACADO</span>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-white">{formatPrice(featuredEvents[currentSlide]?.ticketPrice || 0)}</div>
                    <div className="text-gray-400 text-sm">Desde</div>
                  </div>
                </div>

                {/* Event Image */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={featuredEvents[currentSlide]?.image || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                    alt="Featured Event"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                      <Play size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    {featuredEvents[currentSlide]?.title || "Festival de Música"}
                  </h3>
                  
                  <p className="text-gray-300 text-sm">
                    {featuredEvents[currentSlide]?.description || "Una experiencia musical única"}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(featuredEvents[currentSlide]?.date || "2024-09-15")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>5,000 personas</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl">
                    Reservar Ahora
                  </Button>
                </div>
              </div>

              {/* Floating Elements around Card */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/30 rounded-full blur-sm animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-purple-500/30 rounded-full blur-sm animate-pulse" />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-pink-500/30 rounded-full blur-sm animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm font-medium">Descubre más</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}