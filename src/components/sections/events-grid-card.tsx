"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

// Assuming Event type structure - adjust as needed
interface Event {
  id: string;
  title: string;
  date: string;
  image: string | null; // Changed from image?: string to match your Event type
  status?: "past" | "upcoming";
}

interface EventsGridCardProps {
  event: Event;
}

// Month names mapping - moved outside component for better performance
const MONTH_NAMES = {
  0: "ENE",
  1: "FEB",
  2: "MAR",
  3: "ABR",
  4: "MAY",
  5: "JUN",
  6: "JUL",
  7: "AGO",
  8: "SEP",
  9: "OCT",
  10: "NOV",
  11: "DIC",
} as const;

// HTML entities mapping - more comprehensive and performant
const HTML_ENTITIES = {
  "&#8211;": "–",
  "&#8212;": "—",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
} as const;

export default function EventsGridCard({ event }: EventsGridCardProps) {
  const [imageError, setImageError] = useState(false);

  // Memoized date formatting for better performance
  const formattedDate = useMemo(() => {
    if (!event.date) return { day: "1", month: "ENE" };

    try {
      let date: Date;

      // Parse DD/MM/YYYY format
      const dateParts = event.date.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (dateParts) {
        const [, day, month, year] = dateParts;
        date = new Date(
          Number.parseInt(year),
          Number.parseInt(month) - 1,
          Number.parseInt(day)
        );
      } else {
        date = new Date(event.date);
      }

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const monthIndex = date.getMonth() as keyof typeof MONTH_NAMES;
      const month = MONTH_NAMES[monthIndex];
      const day = date.getDate().toString();

      return { day, month };
    } catch {
      console.warn("Invalid date string:", event.date);
      return { day: "1", month: "ENE" };
    }
  }, [event.date]);

  // Memoized title decoding
  const decodedTitle = useMemo(() => {
    let decoded = event.title;

    // Server-side safe HTML entity decoding
    Object.entries(HTML_ENTITIES).forEach(([entity, replacement]) => {
      decoded = decoded.replace(new RegExp(entity, "g"), replacement);
    });

    return decoded;
  }, [event.title]);

  // Memoized link configuration
  const linkConfig = useMemo(() => {
    const isPerroNegro = event.title.toLowerCase().includes("perro negro");
    return {
      href: isPerroNegro
        ? "https://perronegro.biotickets.com/"
        : `/evento/${event.id}`,
      target: isPerroNegro ? ("_blank" as const) : undefined,
      rel: isPerroNegro ? "noopener noreferrer" : undefined,
    };
  }, [event.title, event.id]);

  return (
    <Link
      href={linkConfig.href}
      target={linkConfig.target}
      rel={linkConfig.rel}
      className="block group"
      aria-label={`Ver evento: ${decodedTitle}`}
    >
      <article className="relative bg-zinc-900 overflow-hidden rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-500 flex flex-col cursor-pointer h-[390px] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(99,102,241,0.1),0_8px_24px_rgba(168,85,247,0.08)]">
        {/* Event Image */}
        {event.image && !imageError ? (
          <div className="relative overflow-hidden bg-black flex-shrink-0 h-[280px]">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={`Imagen del evento: ${decodedTitle}`}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              onError={() => setImageError(true)}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              quality={75}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Date Badge */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1.5 text-center min-w-[50px] rounded-lg border border-indigo-400/20">
              <div className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {formattedDate.day}
              </div>
              <div className="text-[9px] font-medium text-zinc-400 leading-tight">
                {formattedDate.month}
              </div>
            </div>

            {/* Status Badge */}
            {event.status === "past" && (
              <div className="absolute top-3 right-3 bg-zinc-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-xs font-medium text-zinc-400">
                  PASADO
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-zinc-800 to-zinc-900 h-[280px] flex items-center justify-center border-b border-zinc-700/50">
            <div className="flex flex-col items-center gap-2">
              <Calendar className="w-12 h-12 text-zinc-500" />
              <span className="text-xs text-zinc-500 font-medium">
                Sin imagen
              </span>
            </div>

            {/* Date Badge for no-image state */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1.5 text-center min-w-[50px] rounded-lg border border-indigo-400/20">
              <div className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {formattedDate.day}
              </div>
              <div className="text-[9px] font-medium text-zinc-400 leading-tight">
                {formattedDate.month}
              </div>
            </div>

            {/* Status Badge for no-image state */}
            {event.status === "past" && (
              <div className="absolute top-3 right-3 bg-zinc-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-xs font-medium text-zinc-400">
                  PASADO
                </span>
              </div>
            )}
          </div>
        )}

        {/* Card Content */}
        <div className="px-3 pb-3 pt-5 flex-1 flex flex-col justify-between h-[110px]">
          {/* Title */}
          <h3 className="text-base font-bold text-white line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight mb-1">
            {decodedTitle}
          </h3>

          {/* Event Info */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Calendar size={12} aria-hidden="true" />
            <time dateTime={event.date}>{event.date}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
