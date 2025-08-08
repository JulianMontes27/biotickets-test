"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventSchedule() {
  const [selectedDay, setSelectedDay] = useState(0);

  const days = [
    { id: 0, name: "Day 1", date: "Wed, 11 October, 2023" },
    { id: 1, name: "Day 2", date: "Thu, 13 October 2024" },
    { id: 2, name: "Day 3", date: "Fri, 14 October 2023" }
  ];

  const events = [
    {
      time: "20:30",
      title: "Rock and Roll Festival",
      artist: "Various Artists",
      venue: "Main Stage Arena",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isLive: false
    },
    {
      time: "22:00",
      title: "Let it Breathe",
      artist: "Electronic Masters",
      venue: "Electronic Stage",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isLive: true
    },
    {
      time: "23:30",
      title: "Rock and Roll Festival",
      artist: "Rock Legends",
      venue: "Main Stage Arena",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      isLive: false
    }
  ];

  const galleryEvents = [
    {
      title: "Mumbai Kochinha",
      subtitle: "Kolkata",
      price: "$49.90",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Electronic Night",
      subtitle: "Delhi",
      price: "$39.90", 
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Jazz Evening",
      subtitle: "Bangalore",
      price: "$29.90",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Event Schedule */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                <span className="text-white">Event </span>
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Schedule
                </span>
              </h2>
            </div>

            {/* Day Selector */}
            <div className="flex space-x-4 mb-8">
              {days.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedDay === day.id
                      ? 'bg-primary text-slate-900'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold">{day.name}</div>
                  <div className="text-xs opacity-80">{day.date}</div>
                </button>
              ))}
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {events.map((event, index) => (
                <div 
                  key={index}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {event.isLive && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-primary" />
                        <span className="text-primary font-semibold text-sm">{event.time}</span>
                        {event.isLive && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">LIVE</span>
                        )}
                      </div>
                      
                      <h3 className="text-white font-semibold mb-1">{event.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{event.artist}</p>
                      
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-500" />
                        <span className="text-slate-400 text-sm">{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {event.isLive && (
                        <button className="w-10 h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors">
                          <Play size={16} className="text-primary ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Events */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Gallery
                </span>
                <span className="text-white"> Event</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Featured Event */}
              <div className="relative group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 hover:border-primary/30 transition-all duration-300">
                <div className="relative h-48">
                  <Image
                    src={galleryEvents[0].image}
                    alt={galleryEvents[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white font-bold text-xl mb-1">{galleryEvents[0].title}</h3>
                        <p className="text-slate-300">{galleryEvents[0].subtitle}</p>
                      </div>
                      <div className="bg-primary text-slate-900 px-3 py-1 rounded-full font-semibold">
                        {galleryEvents[0].price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Events */}
              <div className="grid grid-cols-2 gap-4">
                {galleryEvents.slice(1).map((event, index) => (
                  <div 
                    key={index}
                    className="relative group bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/30 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="relative h-32">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="text-white font-semibold text-sm mb-1">{event.title}</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-slate-300 text-xs">{event.subtitle}</p>
                          <div className="bg-primary text-slate-900 px-2 py-1 rounded text-xs font-semibold">
                            {event.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Your Seat */}
            <div className="relative group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-2xl" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4">Book Your Seat Now</h3>
                <p className="text-slate-300 mb-6">
                  Get the best seats for the most anticipated music festival of the year.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-slate-900 px-6 py-3 rounded-full font-semibold">
                  Reserve Now
                </Button>
              </div>
            </div>

            {/* Event Sponsorships */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
              <h3 className="text-lg font-semibold mb-4">
                <span className="text-white">Event </span>
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Sponsorships
                </span>
              </h3>
              <div className="grid grid-cols-4 gap-4 opacity-60">
                {/* Placeholder for sponsor logos */}
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-slate-500 text-xs">Sponsor</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-slate-500 text-xs">Sponsor</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-slate-500 text-xs">Sponsor</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-slate-500 text-xs">Sponsor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}