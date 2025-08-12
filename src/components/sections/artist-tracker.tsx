"use client";

import { useRef, useEffect, useState } from "react";

export default function ArtistTracker() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es dispositivo móvil
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) {
      // Animación loop sutil para móvil
      let animationId: number;
      const startTime = Date.now();
      
      const animatePhone = () => {
        if (!phoneRef.current) return;
        
        const elapsed = (Date.now() - startTime) / 1000; // en segundos
        const rotateY = Math.sin(elapsed * 1.2) * 6; // Oscila entre -6 y 6 grados (más rápido y amplio)
        const rotateX = Math.cos(elapsed * 0.8) * 4; // Oscila entre -4 y 4 grados (más rápido y amplio)
        const translateY = Math.sin(elapsed * 1.0) * 4; // Movimiento vertical más pronunciado
        
        phoneRef.current.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateY(${translateY}px)
          translateZ(10px)
        `;
        
        animationId = requestAnimationFrame(animatePhone);
      };
      
      animatePhone();
      
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', checkMobile);
      };
    } else {
      // Efecto cursor para desktop
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
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [isMobile]);
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
    const glowClasses = "absolute inset-0 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-300";
    const containerClasses = "relative w-full h-full bg-zinc-800/50 backdrop-blur-xl rounded-2xl border border-zinc-700/50 shadow-2xl flex items-center justify-center group-hover:border-indigo-400/40 transition-all duration-300";

    switch (featureId) {
      case "wallet":
        return (
          <div className={baseClasses} style={{ perspective: "200px", transformStyle: "preserve-3d" }}>
            {/* Glow */}
            <div className={`${glowClasses} bg-indigo-400/20`} style={{ transform: "translateZ(-20px)" }} />
            
            {/* Container */}
            <div className={containerClasses} style={{ transform: "translateZ(0px)" }}>
              {/* 3D Wallet */}
              <div className="relative" style={{ transform: "translateZ(15px)" }}>
                {/* Wallet base */}
                <div className="w-8 h-6 bg-zinc-700 border border-zinc-600/50 shadow-lg transform -rotate-12 rounded-md" 
                     style={{ transformStyle: "preserve-3d" }}>
                  {/* Wallet depth */}
                  <div className="absolute inset-0 bg-zinc-800 transform translate-x-1 translate-y-1 rounded-md" 
                       style={{ transform: "translateZ(-2px)" }} />
                  {/* Cards inside */}
                  <div className="absolute top-1 left-1 w-6 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-sm" />
                  <div className="absolute top-2.5 left-1 w-5 h-1 bg-gradient-to-r from-indigo-400/60 to-purple-400/60 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        );

      case "contactless":
        return (
          <div className={baseClasses} style={{ perspective: "200px", transformStyle: "preserve-3d" }}>
            {/* Glow */}
            <div className={`${glowClasses} bg-indigo-400/20`} style={{ transform: "translateZ(-20px)" }} />
            
            {/* Container */}
            <div className={containerClasses} style={{ transform: "translateZ(0px)" }}>
              {/* 3D Phone */}
              <div className="relative" style={{ transform: "translateZ(15px)" }}>
                {/* Phone body */}
                <div className="w-5 h-8 bg-zinc-700 border border-zinc-600 shadow-lg rounded-lg" 
                     style={{ transformStyle: "preserve-3d" }}>
                  {/* Screen */}
                  <div className="absolute inset-1 bg-zinc-800 rounded-md">
                    {/* NFC waves */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-indigo-400 animate-ping opacity-60 rounded-full" />
                      <div className="absolute inset-0 w-3 h-3 border-2 border-indigo-400 animate-ping opacity-40 rounded-full" style={{ animationDelay: '0.5s' }} />
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
            <div className={`${glowClasses} bg-indigo-400/20`} style={{ transform: "translateZ(-20px)" }} />
            
            {/* Container */}
            <div className={containerClasses} style={{ transform: "translateZ(0px)" }}>
              {/* 3D QR Code */}
              <div className="relative" style={{ transform: "translateZ(15px)" }}>
                {/* QR Code direct - no container box */}
                <div className="w-8 h-8 bg-zinc-700 shadow-lg transform -rotate-6 rounded-md" 
                     style={{ transformStyle: "preserve-3d" }}>
                  {/* QR depth */}
                  <div className="absolute inset-0 bg-zinc-800 transform translate-x-1 translate-y-1 rounded-md" 
                       style={{ transform: "translateZ(-2px)" }} />
                  
                  {/* Corner detection patterns - QR standard positions */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-2 border-indigo-400 rounded-sm">
                    <div className="w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 m-0.5 rounded-sm"></div>
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 border-2 border-indigo-400 rounded-sm">
                    <div className="w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 m-0.5 rounded-sm"></div>
                  </div>
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-2 border-indigo-400 rounded-sm">
                    <div className="w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 m-0.5 rounded-sm"></div>
                  </div>
                  
                  {/* Data pattern - organized grid */}
                  {/* Row 1 */}
                  <div className="absolute top-1.5 left-4 w-0.5 h-0.5 bg-indigo-400 rounded-sm"></div>
                  <div className="absolute top-1.5 left-5 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  
                  {/* Row 2 */}
                  <div className="absolute top-2.5 left-4.5 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  <div className="absolute top-2.5 left-6 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  
                  {/* Row 3 */}
                  <div className="absolute top-3.5 left-4 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  <div className="absolute top-3.5 left-5.5 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  
                  {/* Bottom area data */}
                  <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  <div className="absolute bottom-1.5 left-5 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  <div className="absolute bottom-2.5 left-5.5 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  
                  {/* Side data */}
                  <div className="absolute top-4.5 left-3.5 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
                  <div className="absolute bottom-3.5 left-3 w-0.5 h-0.5 bg-[#D4A574] rounded-sm"></div>
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
    <section id="wallet" className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 xl:gap-32 items-center">
          {/* Left Content */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12 xl:space-y-16 order-1 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tight">
                <span className="text-white">Entrada </span>
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Digital</span>
              </h2>
            </div>

            <div className="space-y-10 sm:space-y-12 lg:space-y-16 xl:space-y-20">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16 group">
                  {/* Custom 3D Element */}
                  <div className="flex-shrink-0 scale-75 sm:scale-100">
                    {renderIcon3D(feature.id)}
                  </div>

                  {/* Content with enhanced styling */}
                  <div className="flex-1 pt-2 sm:pt-3">
                    <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-2xl xl:text-3xl mb-3 sm:mb-5 lg:mb-6 xl:mb-8 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-300 leading-relaxed text-base sm:text-lg lg:text-lg xl:text-xl group-hover:text-zinc-200 transition-colors duration-300 font-light tracking-wide">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Apple Wallet Mockup */}
          <div className="relative order-2 lg:order-2" style={{ perspective: "1000px" }}>
            <div className="relative mx-auto max-w-xs sm:max-w-sm">
              {/* Phone Frame with 3D effect */}
              <div 
                ref={phoneRef}
                className="relative bg-gray-800 p-3 rounded-[3rem] shadow-2xl transition-transform duration-300 ease-out will-change-transform border border-gray-700"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Screen */}
                <div className="bg-black rounded-[2.5rem] overflow-hidden border border-gray-700/50">
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
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4">
                    {/* Wallet Header */}
                    <div className="text-center py-1 sm:py-2">
                      <h3 className="text-white text-base sm:text-lg font-semibold">Wallet</h3>
                    </div>

                    {/* Ticket Cards Stack */}
                    <div className="relative space-y-2 sm:space-y-3" style={{ transformStyle: "preserve-3d" }}>
                      {/* Main Ticket - Music Festival */}
                      <div 
                        className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-3 sm:p-4 shadow-lg transform rotate-0 z-30 transition-transform duration-300 rounded-xl"
                        style={{ 
                          transformStyle: "preserve-3d",
                          transform: "translateZ(30px)",
                          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <div>
                            <div className="text-white text-[10px] sm:text-xs font-medium opacity-80">PASE DE EVENTO</div>
                            <div className="text-white text-sm sm:text-lg font-bold">Festival de Música 2024</div>
                            <div className="text-white text-xs sm:text-sm opacity-90">Escenario Electrónico</div>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-[10px] sm:text-xs opacity-80">ASIENTO</div>
                            <div className="text-white text-sm sm:text-lg font-bold">A-15</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-white text-[10px] sm:text-xs opacity-80">FECHA Y HORA</div>
                            <div className="text-white text-xs sm:text-sm font-semibold">25 Sept, 8:00 PM</div>
                            <div className="text-white text-[10px] sm:text-xs opacity-80 mt-1">Lugar: Centro de Convenciones</div>
                          </div>
                          <div className="bg-white p-1.5 sm:p-2 rounded-lg">
                            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="black" viewBox="0 0 24 24">
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
                        className="absolute top-8 left-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-500 p-4 shadow-lg transform rotate-1 z-20 opacity-80 transition-transform duration-300 rounded-xl"
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
                        className="absolute top-12 left-4 right-4 bg-gradient-to-r from-green-600 to-teal-500 p-4 shadow-lg transform -rotate-1 z-10 opacity-60 transition-transform duration-300 rounded-xl"
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
                    <div className="pt-8 sm:pt-12 px-2 sm:px-4">
                      <button className="group w-full bg-white hover:bg-black text-black hover:text-white text-sm sm:text-base font-semibold py-2.5 sm:py-3 px-3 sm:px-4 flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-white/20 rounded-xl">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
                className="absolute -top-6 -left-6 w-16 sm:w-20 h-16 sm:h-20 bg-purple-500/50 rounded-full blur-xl animate-pulse"
                style={{ 
                  transform: "translateZ(-50px)",
                  filter: "blur(20px)",
                  boxShadow: "0 0 60px rgba(168, 85, 247, 0.4)"
                }}
              />
              <div 
                className="absolute -bottom-6 -right-6 w-12 sm:w-16 h-12 sm:h-16 bg-cyan-500/50 rounded-full blur-xl animate-pulse"
                style={{ 
                  transform: "translateZ(-30px)",
                  filter: "blur(15px)",
                  boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)"
                }}
              />
              <div 
                className="absolute top-1/2 -right-4 sm:-right-8 w-8 sm:w-12 h-8 sm:h-12 bg-pink-500/40 rounded-full blur-lg animate-pulse"
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