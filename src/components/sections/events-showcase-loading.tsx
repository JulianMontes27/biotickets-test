import { Loader2 } from "lucide-react";

export default function EventsShowcaseLoading() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 xl:py-40 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight">
            Próximos <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Eventos</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed tracking-wide font-light">
            Descubre los mejores eventos musicales y culturales de la ciudad.
          </p>
        </div>

        {/* Loading State */}
        <div className="flex justify-center items-center py-20">
          <div className="flex items-center space-x-3 text-indigo-400">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-lg">Cargando eventos...</span>
          </div>
        </div>
      </div>
    </section>
  );
}