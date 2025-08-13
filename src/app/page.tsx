import HeroSection from "@/components/ui/hero-section";
import EventsShowcase from "@/components/sections/events-showcase";
import ArtistTracker from "@/components/sections/artist-tracker";
import AboutUs from "@/components/sections/about-us";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsShowcase />

      <ArtistTracker />
      <AboutUs />
    </div>
  );
}
