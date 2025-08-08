import { Event } from '@/types';

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Biotickets",
    "description": "Plataforma de venta de boletos para conciertos y eventos musicales",
    "url": "https://www.biotickets.com",
    "logo": "https://www.biotickets.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/biotickets",
      "https://www.twitter.com/biotickets",
      "https://www.instagram.com/biotickets"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-1-234-5678",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Biotickets",
    "description": "Compra boletos para los mejores conciertos y eventos de música",
    "url": "https://www.biotickets.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.biotickets.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateEventSchema(event: Event) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    "name": event.title,
    "description": event.description,
    "image": event.image,
    "startDate": `${event.date}T${event.time}:00`,
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": event.venue
    },
    "offers": {
      "@type": "Offer",
      "price": event.ticketPrice,
      "priceCurrency": "COP",
      "availability": event.isPastEvent ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      "url": `https://www.biotickets.com/eventos/${event.slug}`
    },
    "organizer": {
      "@type": "Organization",
      "name": "Biotickets",
      "url": "https://www.biotickets.com"
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}