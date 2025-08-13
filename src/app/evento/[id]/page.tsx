import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";
import { tribeEventsAdapter } from "@/services/tribe-events-adapter";
import EventPurchaseButton from "@/components/ui/event-purchase-button";
import ExpandableVenueMap from "@/components/ui/expandable-venue-map";
import BackButton from "@/components/ui/back-button";

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Efficient function to get event details by ID with request-level caching
async function getEventDetails(id: string) {
  // Check request-level cache first
  try {
    // Use the efficient getEventById method instead of fetching all events
    const event = await tribeEventsAdapter.getEventById(id);

    return event;
  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventDetails(id);

  if (!event) {
    return {
      title: "Evento no encontrado - BioTickets",
      description: "El evento que buscas no fue encontrado.",
    };
  }

  return {
    title: `${event.title} - BioTickets`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEventDetails(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Mobile Image - Square */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
          />
        </div>
        {/* Desktop Image - Banner */}
        <div className="absolute inset-0 hidden md:block">
          <Image
            src={event.bannerImage || event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={75}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Back Button */}
        <BackButton />

        {/* Event Title and Basic Info */}
        <div className="absolute bottom-16 left-0 right-0">
          <div className="container mx-auto px-6">
            <div className="mb-4">
              <span className="text-indigo-400 text-sm font-mono tracking-[0.2em] uppercase">
                {event.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{event.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Sobre el Evento
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Event Tags */}
            {event.tags && event.tags.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Etiquetas</h3>
                <div className="flex flex-wrap gap-3">
                  {event.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm"
                    >
                      <Tag size={14} />
                      <span className="capitalize">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Ticket Purchase Card */}
            {event.status === "upcoming" && (
              <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Comprar Entradas
                </h3>
                <EventPurchaseButton
                  eventLink={event.link}
                  ticketPrice={event.ticketPrice}
                  isUpcoming={event.status === "upcoming"}
                />
              </div>
            )}

            {/* Location Map */}
            {event.venueMapImage && (
              <ExpandableVenueMap
                imageUrl={event.venueMapImage}
                venue={event.venue}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
