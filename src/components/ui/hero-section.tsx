"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import HeroImage from "./hero-image";
import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroBanner {
  imageUrl: string;
  title: string;
}

export default function HeroSection() {
  const [heroBanner, setHeroBanner] = useState<HeroBanner | null>(null);

  useEffect(() => {
    const loadHeroBanner = async () => {
      try {
        const response = await fetch('/api/hero-banner');
        const banner = await response.json();
        setHeroBanner(banner);
      } catch (error) {
        console.error('Error loading hero banner:', error);
        // Fallback en caso de error
        setHeroBanner({
          imageUrl: "https://www.biotickets.com/wp-content/uploads/2025/07/Banner_-Kris_-1920-scaled.jpg",
          title: "KRISR U.V.E.S LIVE"
        });
      }
    };

    loadHeroBanner();
  }, []);

  return (
    <section className="relative h-screen max-w-full bg-black overflow-hidden">
      {/* Full Screen Image */}
      <div className="absolute inset-0">
        <HeroImage
          src={heroBanner?.imageUrl || "https://www.biotickets.com/wp-content/uploads/2025/07/Banner_-Kris_-1920-scaled.jpg"}
          alt={heroBanner?.title || "KRISR U.V.E.S LIVE"}
        />
        {/* Mobile Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-md md:backdrop-blur-none" />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Gradient Overlay Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Minimal Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-16 pb-24 sm:pb-32 md:pb-40 lg:pb-48">
        

        {/* Mobile Featured Image - Only on mobile */}
        <div className="block md:hidden mb-6 sm:mb-8 text-center">
          <div className="inline-block relative">
            <Image 
              src="https://www.biotickets.com/wp-content/uploads/elementor/thumbs/Banner_-Kris_-640-1-r8fg73hxfl1jrs83v93kgygr17mmd3ptcky6gdinc0.jpg"
              alt="KRISR Banner Mobile"
              width={320}
              height={320}
              className="w-80 h-80 sm:w-96 sm:h-96 object-cover rounded-2xl shadow-2xl border border-white/20"
              loading="lazy"
            />
            {/* Mobile image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Main Content - Bottom Positioned */}
        <div className="container mx-auto px-4">
          {/* Brand Category */}
          <div className="mb-4 sm:mb-6">
            <span className="text-white/50 text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-relaxed">
              {"Vive la música"}
            </span>
          </div>

          {/* Event Title */}
          <div className="mb-4 sm:mb-6">
            <span className="text-indigo-400 text-xs sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-relaxed">
              EVENTO ESPECIAL
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4 leading-[0.9] tracking-tight">
            <span className="text-white">KRISR U.V.E.S LIVE</span>
          </h1>

          {/* Venue */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 mb-6 sm:mb-8 leading-tight">
            Centro de Eventos Valle del Pacífico
          </h2>

          {/* CTA Buttons - 3D Style */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={() => window.open('https://eventos.biotickets.com/ordertickets.asp?p=152&a=0&src=&backurl=%2F%2Feventos%2Ebiotickets%2Ecom%2Fdefault%2Easp', '_blank')}
              className="relative w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 group hover:from-indigo-500 hover:to-purple-500"
              style={{
                boxShadow: '0 6px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}
            >
              <span className="flex items-center justify-center">
                Comprar Entradas
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </span>
            </button>
            
            <button 
              onClick={() => window.open('https://eventos.biotickets.com/ordertickets.asp?p=152&a=0&src=&backurl=%2F%2Feventos%2Ebiotickets%2Ecom%2Fdefault%2Easp', '_blank')}
              className="relative hidden sm:block w-full sm:w-auto px-6 sm:px-8 py-3 bg-transparent text-white text-sm sm:text-base font-semibold border-2 border-white/30 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-400/10 hover:to-purple-400/10"
            >
              Más Información
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