"use client";

import { useState, useEffect } from "react";
import { getUpcomingEvents, getPastEvents } from "@/data/events-data";
import { Event } from "@/types";

export default function EventsDebug() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDebugData = async () => {
      try {
        console.log('🐛 Debug: Starting to load events...');
        
        const [upcoming, past] = await Promise.all([
          getUpcomingEvents(),
          getPastEvents()
        ]);
        
        console.log('🐛 Debug: Upcoming events loaded:', upcoming);
        console.log('🐛 Debug: Past events loaded:', past);
        
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error('🐛 Debug error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDebugData();
  }, []);

  if (loading) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-md">
        <h3 className="font-bold text-yellow-400 mb-2">🐛 Events Debug</h3>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg max-w-md max-h-96 overflow-auto text-xs">
      <h3 className="font-bold text-yellow-400 mb-2">🐛 Events Debug</h3>
      
      <div className="mb-3">
        <h4 className="font-semibold text-green-400">📅 Upcoming ({upcomingEvents.length})</h4>
        {upcomingEvents.length === 0 ? (
          <p className="text-red-400">No upcoming events found!</p>
        ) : (
          upcomingEvents.map(event => (
            <div key={event.id} className="border-b border-gray-600 py-1">
              <p><strong>Title:</strong> {event.title}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Status:</strong> {event.status}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h4 className="font-semibold text-red-400">📅 Past ({pastEvents.length})</h4>
        {pastEvents.length === 0 ? (
          <p className="text-gray-400">No past events found!</p>
        ) : (
          pastEvents.map(event => (
            <div key={event.id} className="border-b border-gray-600 py-1">
              <p><strong>Title:</strong> {event.title}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Status:</strong> {event.status}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}