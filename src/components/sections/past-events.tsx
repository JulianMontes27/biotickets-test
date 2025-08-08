import { pastEvents } from "@/data/events";
import EventCard from "@/components/ui/event-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PastEvents() {
  return (
    <section className="py-12 bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Momentos Inolvidables
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Revive los mejores eventos que hemos organizado y únete a la próxima experiencia única.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {pastEvents.slice(0, 2).map((event) => (
            <EventCard 
              key={event.id} 
              event={event}
              className="animate-fade-in opacity-60 hover:opacity-80 transition-opacity"
            />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="default" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/eventos/pasados">
              Ver Más Eventos Pasados →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}