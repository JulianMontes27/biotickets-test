import { NextResponse } from 'next/server';
import { heroBannerService } from '@/services/hero-banner-service';

export async function GET() {
  try {
    const heroBanner = await heroBannerService.getMainHeroBanner();
    return NextResponse.json(heroBanner);
  } catch (error) {
    console.error('Error fetching hero banner:', error);
    return NextResponse.json(
      {
        imageUrl: "https://www.biotickets.com/wp-content/uploads/2025/07/Banner_-Kris_-1920-scaled.jpg",
        title: "KRISR U.V.E.S LIVE"
      },
      { status: 200 }
    );
  }
}