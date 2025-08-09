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
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD60A] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-[#FFD60A] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-[#FFD60A] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-zinc-700/50">
                <Heart className="text-[#FFD60A]" size={18} />
                <span className="text-white font-medium text-sm font-mono tracking-[0.15em] leading-relaxed">SOBRE NOSOTROS</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tight">
                <span className="text-white">Conectamos</span>
                <br />
                <span className="text-[#FFD60A]">
                  Experiencias
                </span>
                <br />
                <span className="text-white">Inolvidables</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-zinc-300 leading-relaxed font-light tracking-wide">
                Somos más que una plataforma de boletos. Creamos momentos que perduran en la memoria, 
                conectando artistas con audiencias apasionadas.
              </p>
              
              <p className="text-lg text-zinc-400 leading-relaxed font-light tracking-wide">
                Desde conciertos íntimos hasta festivales masivos, nuestra misión es hacer que cada 
                evento sea accesible, seguro y memorable para todos.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white font-semibold tracking-wide">Confianza</span>
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed tracking-wide">Transacciones seguras y garantizadas</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white font-semibold tracking-wide">Innovación</span>
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed tracking-wide">Tecnología de vanguardia</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white font-semibold tracking-wide">Pasión</span>
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed tracking-wide">Amor por la música y cultura</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFD60A] rounded-full"></div>
                  <span className="text-white font-semibold tracking-wide">Comunidad</span>
                </div>
                <p className="text-zinc-400 text-sm font-light leading-relaxed tracking-wide">Construyendo conexiones reales</p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/50 hover:border-[#FFD60A]/40 transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-[#FFD60A]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative space-y-4">
                      <div className="flex items-center justify-between">
                        <Icon className="text-zinc-400 group-hover:text-[#FFD60A] transition-colors duration-300" size={32} />
                        <Sparkles className="text-[#FFD60A] opacity-0 group-hover:opacity-100 transition-all duration-300" size={16} />
                      </div>
                      
                      <div>
                        <div className="text-4xl font-bold text-[#FFD60A]">
                          {stat.number}
                        </div>
                        <div className="text-zinc-400 text-sm font-medium mt-1">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#FFD60A]/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-[#FFD60A]/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}