import { Loader2 } from "lucide-react";

export default function HeroSectionLoading() {
  return (
    <section className="relative h-screen max-w-full bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-indigo-400" size={48} />
          <p className="text-white text-xl">Cargando banner principal...</p>
        </div>
      </div>
    </section>
  );
}