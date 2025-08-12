import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react";

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
            <Image
              src="https://jtfcfsnksywotlbsddqb.supabase.co/storage/v1/object/public/perro-negro/biotickets_logo.png"
              alt="BioTickets Logo"
              width={200}
              height={45}
              className="h-8 w-auto brightness-0 invert"
            />
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"/>
                </svg>
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
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScatF_3WdwMzFEmY16DSU8r-bO88p2s6u-7DkuNgbQd7ufKZg/viewform" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Políticas de Reembolso
                </a>
              </li>
              <li>
                <Link href="/terminos-condiciones" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-tratamiento-datos" className="text-zinc-400 hover:text-indigo-400 transition-colors duration-300 font-medium tracking-wide flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-colors duration-300"></div>
                  Política de Tratamiento de Datos
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
                <span className="font-medium tracking-wide">+57 300 1234567</span>
              </li>
              <li className="group flex items-center space-x-3 text-zinc-400 hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                <div className="p-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full group-hover:border-[#D4A574]/40 transition-all duration-300">
                  <MapPin size={14} className="group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                <span className="font-medium tracking-wide">Cali, Colombia</span>
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