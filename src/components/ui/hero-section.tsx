"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { heroBannerService, HeroBanner } from "@/services/hero-banner-service";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heroBanner, setHeroBanner] = useState<HeroBanner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHeroBanner = async () => {
      try {
        const banner = await heroBannerService.getMainHeroBanner();
        setHeroBanner(banner);
      } catch (error) {
        console.error('Error loading hero banner:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHeroBanner();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Si estamos cargando, mostrar un estado de carga
  if (loading) {
    return (
      <section className="relative h-screen max-w-full bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-4 text-indigo-400" size={48} />
            <p className="text-white text-xl">Cargando banner principal...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen max-w-full bg-black overflow-hidden">
      {/* Full Screen Image */}
      <div className="absolute inset-0">
        <Image
          src={heroBanner?.imageUrl || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3"}
          alt={heroBanner?.title || "BioTickets Banner"}
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
      <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-16 pb-24 sm:pb-32 md:pb-40 lg:pb-48">
        

        {/* Main Content - Bottom Positioned */}
        <div className="container mx-auto px-4">
          {/* Brand Category */}
          <div className="mb-4 sm:mb-6">
            <span className="text-white/50 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-relaxed">
              {"Vive la música"}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-[0.9] tracking-tight">
            <span className="text-white">Los mejores eventos de </span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Colombia</span>
          </h1>

          {/* Description */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 md:gap-6 text-white/70 mb-6 sm:mb-8">
            <span className="text-sm sm:text-base font-medium tracking-wide">
              Descubre conciertos únicos
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-sm sm:text-base font-medium tracking-wide">
              Experiencias inolvidables
            </span>
          </div>

          {/* CTA Buttons - 3D Style */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 group hover:from-indigo-500 hover:to-purple-500"
              style={{
                boxShadow: '0 6px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <span className="flex items-center justify-center">
                Comprar Boletos
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </span>
            </button>
            
            <button 
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 bg-transparent text-white text-sm sm:text-base font-semibold border-2 border-white/30 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-400/10 hover:to-purple-400/10"
            >
              Ver Detalles
            </button>
          </div>
        </div>

        {/* Bottom Section - Scroll Indicator */}
        <div className="flex justify-center mt-8 sm:mt-12">
          {/* Scroll Indicator */}
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-white/60 text-[10px] sm:text-xs font-mono mb-2 sm:mb-3 tracking-[0.2em] sm:tracking-[0.25em] leading-relaxed">DESCUBRE MÁS</span>
            <ChevronDown className="text-white/60" size={20} />
          </div>
        </div>
      </div>
    </section>
  );
}