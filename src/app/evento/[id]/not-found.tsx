import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 flex items-center justify-center border border-indigo-400/20">
            <Calendar className="w-12 h-12 text-indigo-400" />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Evento no encontrado
        </h1>
        
        {/* Description */}
        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
          Lo sentimos, el evento que buscas no existe o ha sido eliminado. 
          Revisa nuestros eventos disponibles.
        </p>
        
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 hover:from-indigo-500 hover:to-purple-500"
          style={{
            boxShadow: '0 10px 30px rgba(99,102,241,0.4)'
          }}
        >
          <ArrowLeft size={18} />
          Ver Todos los Eventos
        </Link>
      </div>
    </div>
  );
}