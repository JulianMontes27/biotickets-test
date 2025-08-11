import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (for demo - use KV store in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (value.resetTime < now) {
      rateLimit.delete(key);
    }
  }
}, 60000); // Clean every minute

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );
  
  // Cache static assets aggressively
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  
  // Rate limiting for API routes and expensive pages
  if (request.nextUrl.pathname.startsWith('/api/') || 
      request.nextUrl.pathname === '/') {
    
    const ip = request.headers.get('x-forwarded-for') ?? 
                request.headers.get('x-real-ip') ?? 
                'unknown';
    const key = `${ip}:${request.nextUrl.pathname}`;
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 30; // 30 requests per minute
    
    const current = rateLimit.get(key);
    
    if (!current || current.resetTime < now) {
      rateLimit.set(key, { count: 1, resetTime: now + windowMs });
    } else if (current.count >= maxRequests) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((current.resetTime - now) / 1000)),
          'X-RateLimit-Limit': String(maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(current.resetTime).toISOString(),
        },
      });
    } else {
      current.count++;
      rateLimit.set(key, current);
    }
    
    // Add rate limit headers
    const currentLimit = rateLimit.get(key)!;
    response.headers.set('X-RateLimit-Limit', String(maxRequests));
    response.headers.set('X-RateLimit-Remaining', String(maxRequests - currentLimit.count));
    response.headers.set('X-RateLimit-Reset', new Date(currentLimit.resetTime).toISOString());
  }
  
  // Add cache headers for HTML pages
  if (request.nextUrl.pathname === '/' || 
      request.nextUrl.pathname.startsWith('/events')) {
    response.headers.set(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=86400'
    );
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};