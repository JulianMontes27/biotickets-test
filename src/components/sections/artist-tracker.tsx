"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ArtistTracker() {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;

      const phone = phoneRef.current;
      const rect = phone.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const maxRotation = 15;
      const rotateX = (deltaY / window.innerHeight) * maxRotation * -1;
      const rotateY = (deltaX / window.innerWidth) * maxRotation;

      phone.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(50px)
      `;
    };

    const handleMouseLeave = () => {
      if (!phoneRef.current) return;
      phoneRef.current.style.transform = `
        perspective(1000px) 
        rotateX(0deg) 
        rotateY(0deg) 
        translateZ(0px)
      `;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  const features = [
    {
      id: "wallet",
      title: "Boletos digitales en tu wallet",
      description: "Guarda todos tus boletos de eventos de forma segura en Apple Wallet con acceso instantáneo."
    },
    {
      id: "contactless",
      title: "Entrada sin contacto a eventos",
      description: "Entrada rápida y segura solo con tu teléfono - no necesitas boletos físicos."
    },
    {
      id: "qr",
      title: "Código QR para escaneo instantáneo",
      description: "Ingreso rápido al evento con códigos QR seguros que se actualizan en tiempo real."
    }
  ];

  const renderIcon3D = (featureId: string) => {
    const baseClasses = "w-16 h-16 relative transition-all duration-300 group-hover:scale-110";
    const glowClasses = "absolute inset-0 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300";
    const containerClasses = "relative w-full h-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center group-hover:border-primary/40 transition-all duration-300";

    switch (featureId) {
      case "wallet":
        return (
          <div className={baseClasses} style={{ perspective: "200px", transformStyle: "preserve-3d" }}>
            {/* Glow */}
            <div className={`${glowClasses} bg-gradient-to-br from-primary/30 to-slate-500/40`} style={{ transform: "translateZ(-20px)" }} />
            
            {/* Container */}
            <div className={containerClasses} style={{ transform: "translateZ(0px)" }}>
              {/* 3D Wallet */}
              <div className="relative" style={{ transform: "translateZ(15px)" }}>
                {/* Wallet base */}
                <div className="w-8 h-6 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-slate-600/50 shadow-lg transform -rotate-12" 
                     style={{ transformStyle: "preserve-3d" }}>
                  {/* Wallet depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black rounded-lg transform translate-x-1 translate-y-1" 
                       style={{ transform: "translateZ(-2px)" }} />
                  {/* Cards inside */}
                  <div className="absolute top-1 left-1 w-6 h-1 bg-primary rounded-sm" />
                  <div className="absolute top-2.5 left-1 w-5 h-1 bg-primary/60 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        );

      case "contactless":
        return (
          <div className={baseClasses} style={{ perspective: "200px", transformStyle: "preserve-3d" }}>
            {/* Glow */}
            <div className={`${glowClasses} bg-gradient-to-br from-primary/30 to-slate-500/40`} style={{ transform: "translateZ(-20px)" }} />
            
            {/* Container */}
            <div className={containerClasses} style={{ transform: "translateZ(0px)" }}>
              {/* 3D Phone */}
              <div className="relative" style={{ transform: "translateZ(15px)" }}>
                {/* Phone body */}
                <div className="w-5 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-slate-600 shadow-lg" 
                     style={{ transformStyle: "preserve-3d" }}>
                  {/* Screen */}
                  <div className="absolute inset-1 bg-gradient-to-br from-slate-600/80 to-slate-700/80 rounded-md">
                    {/* NFC waves */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-primary rounded-full animate-ping opacity-60" />
                      <div className="absolute inset-0 w-3 h-3 border-2 border-primary rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "qr":
        return (
          <div className={baseClasses} style={{ perspective: "200px", transformStyle: "preserve-3d" }}>
            {/* Glow */}
            <div className={`${glowClasses} bg-gradient-to-br from-primary/30 to-slate-500/40`} style={{ transform: "translateZ(-20px)" }} />
            
            {/* Container */}
            <div className={containerClasses} style={{ transform: "translateZ(0px)" }}>
              {/* 3D QR Code */}
              <div className="relative" style={{ transform: "translateZ(15px)" }}>
                {/* QR Code base */}
                <div className="w-7 h-7 bg-slate-200 rounded-lg p-1 shadow-lg border border-slate-400" 
                     style={{ transformStyle: "preserve-3d" }}>
                  {/* QR Pattern */}
                  <div className="w-full h-full bg-slate-900 rounded-sm relative overflow-hidden">
                    {/* QR squares pattern */}
                    <div className="absolute top-0 left-0 w-2 h-2 bg-slate-200" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-slate-200" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-slate-200" />
                    <div className="absolute top-1 left-1 w-4 h-1 bg-slate-200" />
                    <div className="absolute top-2 left-0 w-1 h-3 bg-slate-200" />
                    <div className="absolute top-2 right-1 w-2 h-1 bg-slate-200" />
                    <div className="absolute bottom-1 left-2 w-3 h-1 bg-slate-200" />
                    
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-transparent h-full w-full animate-pulse" />
                  </div>
                  
                  {/* Scan corners */}
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-primary" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 border-primary" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 border-primary" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-primary" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-white">Tus boletos en </span>
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Apple
                </span>
                <br />
                <span className="text-white">Wallet</span>
              </h2>
            </div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-6 group">
                  {/* Custom 3D Element */}
                  <div className="flex-shrink-0">
                    {renderIcon3D(feature.id)}
                  </div>

                  {/* Content with enhanced styling */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-base group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Apple Wallet Mockup */}
          <div className="relative" style={{ perspective: "1000px" }}>
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame with 3D effect */}
              <div 
                ref={phoneRef}
                className="relative bg-gray-800 rounded-[3rem] p-3 shadow-2xl transition-transform duration-300 ease-out will-change-transform border border-gray-700"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Screen */}
                <div className="bg-black rounded-[2.2rem] overflow-hidden border border-gray-700/50">
                  {/* Status Bar */}
                  <div className="bg-black px-6 py-4 flex items-center justify-between">
                    <div className="text-white text-sm font-semibold">9:41</div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 17h20v2H2zm1.15-4.05L4 11l5 5 11-11 1.41 1.41L10 17.83l-6.85-4.88z"/>
                      </svg>
                      <svg className="w-6 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.67 4H14V2c0-1.1-.9-2-2-2s-2 .9-2 2v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Wallet Content */}
                  <div className="px-4 pb-4 space-y-4">
                    {/* Wallet Header */}
                    <div className="text-center py-2">
                      <h3 className="text-white text-lg font-semibold">Wallet</h3>
                    </div>

                    {/* Ticket Cards Stack */}
                    <div className="relative space-y-3" style={{ transformStyle: "preserve-3d" }}>
                      {/* Main Ticket - Music Festival */}
                      <div 
                        className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-2xl p-4 shadow-lg transform rotate-0 z-30 transition-transform duration-300"
                        style={{ 
                          transformStyle: "preserve-3d",
                          transform: "translateZ(30px)",
                          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-white text-xs font-medium opacity-80">PASE DE EVENTO</div>
                            <div className="text-white text-lg font-bold">Festival de Música 2024</div>
                            <div className="text-white text-sm opacity-90">Escenario Electrónico</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-xs opacity-80">ASIENTO</div>
                            <div className="text-white text-lg font-bold">A-15</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-white text-xs opacity-80">FECHA Y HORA</div>
                            <div className="text-white text-sm font-semibold">25 Sept, 8:00 PM</div>
                            <div className="text-white text-xs opacity-80 mt-1">Lugar: Centro de Convenciones</div>
                          </div>
                          <div className="bg-white rounded-lg p-2">
                            <svg className="w-12 h-12" fill="black" viewBox="0 0 24 24">
                              <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H15V11M19,11H21V13H19V11M5,7H9V9H7V7H5V7M3,5V7H5V5H3M3,15H5V17H3V15M5,19H7V21H5V19M3,19V21H5V19H3M11,1H13V3H11V1M15,1H17V3H15V1M19,1H21V3H19V1M15,7H17V9H15V7M19,7H21V9H19V7M11,15H13V17H11V15M15,15H17V17H15V15M19,15H21V17H19V15M7,15H9V17H7V15M7,19H9V21H7V19M11,19H13V21H11V19M15,19H17V21H15V19M19,19H21V21H19V19Z" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Wallet-style notches */}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-4 h-4 bg-black rounded-full"></div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-4 h-4 bg-black rounded-full"></div>
                      </div>

                      {/* Second Ticket - Jazz Concert (partially visible) */}
                      <div 
                        className="absolute top-8 left-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-4 shadow-lg transform rotate-1 z-20 opacity-80 transition-transform duration-300"
                        style={{ 
                          transformStyle: "preserve-3d",
                          transform: "rotateZ(1deg) translateZ(15px)",
                          boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white text-xs font-medium opacity-80">PASE DE EVENTO</div>
                            <div className="text-white text-lg font-bold">Festival de Jazz</div>
                            <div className="text-white text-sm opacity-90">Escenario Principal</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-xs opacity-80">ASIENTO</div>
                            <div className="text-white text-lg font-bold">B-8</div>
                          </div>
                        </div>
                      </div>

                      {/* Third Ticket - Rock Concert (least visible) */}
                      <div 
                        className="absolute top-12 left-4 right-4 bg-gradient-to-r from-green-600 to-teal-500 rounded-2xl p-4 shadow-lg transform -rotate-1 z-10 opacity-60 transition-transform duration-300"
                        style={{ 
                          transformStyle: "preserve-3d",
                          transform: "rotateZ(-1deg) translateZ(5px)",
                          boxShadow: "0 10px 20px rgba(34, 197, 94, 0.2)"
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-white text-xs font-medium opacity-80">PASE DE EVENTO</div>
                            <div className="text-white text-lg font-bold">Festival de Rock</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-xs opacity-80">ASIENTO</div>
                            <div className="text-white text-lg font-bold">C-12</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add to Apple Wallet Button */}
                    <div className="pt-12 px-4">
                      <button className="group w-full bg-white hover:bg-black text-black hover:text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-white/20">
                        <svg className="w-5 h-5 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.19 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                        </svg>
                        <span className="transition-colors duration-300">Añadir a Apple Wallet</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements with 3D effect */}
              <div 
                className="absolute -top-6 -left-6 w-20 h-20 bg-purple-500/50 rounded-full blur-xl animate-pulse"
                style={{ 
                  transform: "translateZ(-50px)",
                  filter: "blur(20px)",
                  boxShadow: "0 0 60px rgba(168, 85, 247, 0.4)"
                }}
              />
              <div 
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-cyan-500/50 rounded-full blur-xl animate-pulse"
                style={{ 
                  transform: "translateZ(-30px)",
                  filter: "blur(15px)",
                  boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)"
                }}
              />
              <div 
                className="absolute top-1/2 -right-8 w-12 h-12 bg-pink-500/40 rounded-full blur-lg animate-pulse"
                style={{ 
                  transform: "translateZ(-20px)",
                  filter: "blur(10px)",
                  animationDelay: "1s",
                  boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)"
                }}
              />

              {/* Additional glow around phone */}
              <div 
                className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/10 to-purple-500/10 blur-2xl scale-110"
                style={{ 
                  transform: "translateZ(-60px)",
                  filter: "blur(30px)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}