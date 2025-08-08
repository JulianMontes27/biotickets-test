import HeroSection from "@/components/ui/hero-section";
import ArtistTracker from "@/components/sections/artist-tracker";
import EventsShowcase from "@/components/sections/events-showcase";
import CountdownTimer from "@/components/sections/countdown-timer";
import EventSchedule from "@/components/sections/event-schedule";

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <ArtistTracker />
      <EventsShowcase />
      <CountdownTimer />
      <EventSchedule />
    </div>
  );
}
