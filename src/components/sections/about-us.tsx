"use client";

import { Music, Users, Heart, Star, Award, Sparkles } from "lucide-react";

export default function AboutUs() {
  const stats = [
    {
      number: "50K+",
      label: "Eventos Realizados",
      icon: Music
    },
    {
      number: "2M+",
      label: "Usuarios Felices",
      icon: Users
    },
    {
      number: "500+",
      label: "Artistas",
      icon: Star
    },
    {
      number: "4.9",
      label: "Calificación",
      icon: Award
    }
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#FFD60A] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 sm:right-20 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-[#FFD60A] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-16 sm:w-20 h-16 sm:h-20 bg-[#FFD60A] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-zinc-700/50">
                <Heart className="text-[#FFD60A]" size={16} />
                <span className="text-white font-medium text-xs sm:text-sm font-mono tracking-[0.15em] leading-relaxed">SOBRE NOSOTROS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight">
                <span className="text-white">Conectamos</span>
                <br />
                <span className="text-[#FFD60A]">
                  Experiencias
                </span>
                <br />
                <span className="text-white">Inolvidables</span>
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-light tracking-wide">
                Somos más que una plataforma de boletos. Creamos momentos que perduran en la memoria, 
                conectando artistas con audiencias apasionadas.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed font-light tracking-wide">
                Desde conciertos íntimos hasta festivales masivos, nuestra misión es hacer que cada 
                evento sea accesible, seguro y memorable para todos.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Confianza</span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed tracking-wide">Transacciones seguras y garantizadas</p>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Innovación</span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed tracking-wide">Tecnología de vanguardia</p>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Pasión</span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed tracking-wide">Amor por la música y cultura</p>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Comunidad</span>
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed tracking-wide">Construyendo conexiones reales</p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-zinc-800/50 hover:border-[#FFD60A]/40 transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-[#FFD60A]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <Icon className="text-zinc-400 group-hover:text-[#FFD60A] transition-colors duration-300" size={24} />
                        <Sparkles className="text-[#FFD60A] opacity-0 group-hover:opacity-100 transition-all duration-300" size={14} />
                      </div>
                      
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFD60A]">
                          {stat.number}
                        </div>
                        <div className="text-zinc-400 text-xs sm:text-sm font-medium mt-1">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-12 sm:w-16 h-12 sm:h-16 bg-[#FFD60A]/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-8 sm:w-12 h-8 sm:h-12 bg-[#FFD60A]/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}