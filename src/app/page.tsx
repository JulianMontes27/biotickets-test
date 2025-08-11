import { Suspense } from "react";
import HeroSection from "@/components/ui/hero-section";
import HeroSectionLoading from "@/components/ui/hero-section-loading";
import EventsShowcase from "@/components/sections/events-showcase";
import EventsShowcaseLoading from "@/components/sections/events-showcase-loading";
import ArtistTracker from "@/components/sections/artist-tracker";
import AboutUs from "@/components/sections/about-us";

export default function Home() {
  // console.log('server')
  return (
    <div>
      <Suspense fallback={<HeroSectionLoading />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<EventsShowcaseLoading />}>
        <EventsShowcase />
      </Suspense>
      <ArtistTracker />
      <AboutUs />
    </div>
  );
}