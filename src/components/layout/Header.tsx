"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // En páginas de eventos, usar posición relativa en lugar de fixed
  const isEventPage = pathname?.startsWith('/evento/');
  const headerClasses = isEventPage 
    ? "relative bg-black border-b border-zinc-800/50" 
    : "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/50";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-4">
            <div className="text-white text-2xl font-bold font-mono tracking-[0.15em] leading-none">
              BIOTICKETS
            </div>
            <div className="hidden lg:block w-px h-6 bg-white/20"></div>
            <div className="hidden lg:block text-white/60 text-sm font-mono tracking-[0.2em] leading-relaxed">
              LIVE EXPERIENCES
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <a href="#eventos" className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-sm font-medium tracking-wide">
                Eventos
              </a>
              <a href="#wallet" className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-sm font-medium tracking-wide">
                Apple Wallet
              </a>
              <a href="#nosotros" className="text-white/70 hover:text-indigo-400 transition-colors duration-300 text-sm font-medium tracking-wide">
                Nosotros
              </a>
            </nav>

            
            <div className="w-px h-6 bg-white/20"></div>
            
            {/* CTA Button */}
            <button className="group relative px-6 py-2 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 backdrop-blur-sm border border-indigo-400/20 rounded-full text-indigo-400 font-medium text-sm transition-all duration-300 hover:from-indigo-400/20 hover:to-purple-400/20 hover:border-indigo-400/40">
              <span className="relative z-10">Iniciar Sesión</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-white/70 hover:text-indigo-400 transition-colors duration-300 p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-zinc-800/50 max-w-full overflow-hidden">
            <div className="px-4 py-4 space-y-2 max-w-full">
              <a 
                href="#eventos" 
                className="block px-4 py-3 text-white/70 hover:text-indigo-400 hover:bg-zinc-800/30 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                Eventos
              </a>
              <a 
                href="#wallet" 
                className="block px-4 py-3 text-white/70 hover:text-indigo-400 hover:bg-zinc-800/30 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                Apple Wallet
              </a>
              <a 
                href="#nosotros" 
                className="block px-4 py-3 text-white/70 hover:text-indigo-400 hover:bg-zinc-800/30 rounded-lg transition-all duration-200"
                onClick={toggleMenu}
              >
                Nosotros
              </a>
              <div className="pt-2 mt-2 border-t border-zinc-800/50">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 backdrop-blur-sm border border-indigo-400/20 rounded-full text-indigo-400 font-medium text-sm transition-all duration-300 hover:from-indigo-400/20 hover:to-purple-400/20 hover:border-indigo-400/40">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}