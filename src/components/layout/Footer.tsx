import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, MessageCircle, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 sm:left-20 w-20 sm:w-24 h-20 sm:h-24 bg-indigo-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 sm:right-32 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-12 sm:w-16 h-12 sm:h-16 bg-indigo-400 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 md:col-span-1">
            <div className="text-white text-xl sm:text-2xl font-bold font-mono tracking-[0.15em] leading-none">
              BIOTICKETS
            </div>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light tracking-wide">
              Conectamos artistas con audiencias apasionadas. Tu plataforma de confianza para experiencias musicales inolvidables.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <Link href="https://www.instagram.com/biotickets" target="_blank" rel="noopener noreferrer" className="group p-2.5 sm:p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300">
                <Instagram size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link href="https://www.facebook.com/biotickets" target="_blank" rel="noopener noreferrer" className="group p-2.5 sm:p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300">
                <Facebook size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link href="https://wa.me/+573001234567" target="_blank" rel="noopener noreferrer" className="group p-2.5 sm:p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300">
                <MessageCircle size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link href="mailto:info@biotickets.com" className="group p-2.5 sm:p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300">
                <Mail size={16} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="text-indigo-400" size={18} />
              <h3 className="font-bold text-white text-base sm:text-lg tracking-wide">SOPORTE</h3>
            </div>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li>
                <Link href="#ayuda" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="#politicas" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Políticas de Reembolso
                </Link>
              </li>
              <li>
                <Link href="#terminos" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#privacidad" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-6 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <Mail className="text-indigo-400" size={18} />
              <h3 className="font-bold text-white text-base sm:text-lg tracking-wide">CONTACTO</h3>
            </div>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#D4A574]/40 transition-all duration-300">
                  <Mail size={14} className="group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">info@biotickets.com</span>
              </li>
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#D4A574]/40 transition-all duration-300">
                  <Phone size={14} className="group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">+57 1 234 5678</span>
              </li>
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#D4A574]/40 transition-all duration-300">
                  <MapPin size={14} className="group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-zinc-500 font-light tracking-wide text-center sm:text-left">
              © 2024 BIOTICKETS. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
              <span>Hecho con</span>
              <div className="text-indigo-400 animate-pulse">♪</div>
              <span>en Colombia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}