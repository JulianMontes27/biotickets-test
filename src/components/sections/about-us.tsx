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
    <section id="nosotros" className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 sm:right-20 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-16 sm:w-20 h-16 sm:h-20 bg-indigo-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-32 items-center">
          
          {/* Left Content */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 xl:space-y-16">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-3 bg-zinc-800/50 backdrop-blur-sm rounded-full px-5 sm:px-7 py-3 sm:py-4 border border-zinc-700/50">
                <Heart className="text-indigo-400" size={18} />
                <span className="text-white font-medium text-sm sm:text-base font-mono tracking-[0.15em] leading-relaxed">SOBRE NOSOTROS</span>
              </div>

            </div>

            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-light tracking-wide">
                Somos más que una plataforma de boletos. Creamos momentos que perduran en la memoria, 
                conectando artistas con audiencias apasionadas.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Confianza</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Innovación</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Pasión</span>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                <span className="text-white text-sm sm:text-base font-semibold tracking-wide">Comunidad</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-zinc-800/50 hover:border-indigo-400/40 transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <Icon className="text-zinc-400 group-hover:text-indigo-400 transition-colors duration-300" size={24} />
                        <Sparkles className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300" size={14} />
                      </div>
                      
                      <div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
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
            <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-12 sm:w-16 h-12 sm:h-16 bg-indigo-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-8 sm:w-12 h-8 sm:h-12 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}