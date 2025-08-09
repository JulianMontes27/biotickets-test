import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Music, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-24 h-24 bg-[#FFD60A] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-32 w-32 h-32 bg-[#FFD60A] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-[#FFD60A] rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="text-white text-2xl font-bold font-mono tracking-[0.15em] leading-none">
                BIOTICKETS
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="text-white/60 text-sm font-mono tracking-[0.2em] leading-relaxed">
                LIVE EXPERIENCES
              </div>
            </div>
            <p className="text-zinc-400 text-base leading-relaxed font-light tracking-wide">
              Conectamos artistas con audiencias apasionadas. Tu plataforma de confianza para experiencias musicales inolvidables.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="group p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-[#FFD60A] hover:border-[#FFD60A]/40 transition-all duration-300">
                <Facebook size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link href="#" className="group p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-[#FFD60A] hover:border-[#FFD60A]/40 transition-all duration-300">
                <Twitter size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link href="#" className="group p-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-[#FFD60A] hover:border-[#FFD60A]/40 transition-all duration-300">
                <Instagram size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Music className="text-[#FFD60A]" size={20} />
              <h3 className="font-bold text-white text-lg tracking-wide">EVENTOS</h3>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#eventos" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Próximos Conciertos
                </Link>
              </li>
              <li>
                <Link href="#eventos" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Festivales
                </Link>
              </li>
              <li>
                <Link href="#eventos" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Teatro y Shows
                </Link>
              </li>
              <li>
                <Link href="#eventos" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Eventos Deportivos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-[#FFD60A]" size={20} />
              <h3 className="font-bold text-white text-lg tracking-wide">SOPORTE</h3>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#ayuda" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="#politicas" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Políticas de Reembolso
                </Link>
              </li>
              <li>
                <Link href="#terminos" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#privacidad" className="text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-[#FFD60A] transition-colors duration-300"></div>
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Mail className="text-[#FFD60A]" size={20} />
              <h3 className="font-bold text-white text-lg tracking-wide">CONTACTO</h3>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#FFD60A]/40 transition-all duration-300">
                  <Mail size={14} className="group-hover:text-[#FFD60A] transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">info@biotickets.com</span>
              </li>
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#FFD60A]/40 transition-all duration-300">
                  <Phone size={14} className="group-hover:text-[#FFD60A] transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">+57 1 234 5678</span>
              </li>
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-[#FFD60A] transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#FFD60A]/40 transition-all duration-300">
                  <MapPin size={14} className="group-hover:text-[#FFD60A] transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-zinc-500 font-light tracking-wide">
              © 2024 BIOTICKETS. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-mono">
              <span>Hecho con</span>
              <div className="text-[#FFD60A] animate-pulse">♪</div>
              <span>en Colombia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}