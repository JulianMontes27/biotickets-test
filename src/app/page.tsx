import { Suspense } from "react";
import HeroSection from "@/components/ui/hero-section";
import HeroSectionLoading from "@/components/ui/hero-section-loading";
import EventsShowcase from "@/components/sections/events-showcase";
import ArtistTracker from "@/components/sections/artist-tracker";
import AboutUs from "@/components/sections/about-us";

// Enable ISR with 1 hour revalidation
// This reduces function invocations from every request to once per hour
export const revalidate = 3600; // 1 hour in seconds

export default function Home() {
  return (
    <div>
      <Suspense fallback={<HeroSectionLoading />}>
        <HeroSection />
      </Suspense>
      <EventsShowcase />

      <ArtistTracker />
      <AboutUs />
    </div>
  );
}
