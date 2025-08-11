"use client";

import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      <button 
        onClick={() => window.open('https://eventos.biotickets.com/ordertickets.asp?p=152&a=0&src=&backurl=%2F%2Feventos%2Ebiotickets%2Ecom%2Fdefault%2Easp', '_blank')}
        className="relative w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 group hover:from-indigo-500 hover:to-purple-500"
        style={{
          boxShadow: '0 6px 20px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
        }}
      >
        <span className="flex items-center justify-center">
          Comprar Entradas
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
        </span>
      </button>
      
      <button 
        onClick={() => window.open('https://eventos.biotickets.com/ordertickets.asp?p=152&a=0&src=&backurl=%2F%2Feventos%2Ebiotickets%2Ecom%2Fdefault%2Easp', '_blank')}
        className="relative hidden sm:block w-full sm:w-auto px-6 sm:px-8 py-3 bg-transparent text-white text-sm sm:text-base font-semibold border-2 border-white/30 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-400/10 hover:to-purple-400/10"
      >
        Más Información
      </button>
    </div>
  );
}