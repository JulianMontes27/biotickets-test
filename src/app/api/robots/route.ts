import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `# Biotickets Robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Crawl-delay: 1

# Block aggressive bots to save bandwidth
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: BLEXBot
Disallow: /

Sitemap: https://www.biotickets.com/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}