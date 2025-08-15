import { Event } from "@/types";
import { TribeEvent, wordpressAPI } from "./wordpress-api";
import { getEventStatus } from "@/lib/date-utils";

export class TribeEventsAdapter {
  private stripHtml(html: string): string {
    // Primero decodificar entidades HTML
    let decodedHtml = this.decodeHtmlEntities(html);

    // Remover contenido CSS y Elementor antes de procesar HTML
    decodedHtml = decodedHtml
      // Remover bloques de estilo completos
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      // Remover comentarios CSS (incluye Elementor)
      .replace(/\/\*[\s\S]*?\*\//g, "")
      // Remover shortcodes de WordPress
      .replace(/\[[\s\S]*?\]/g, "")
      // Remover atributos de estilo inline
      .replace(/\sstyle\s*=\s*["'][^"']*["']/gi, "")
      // Remover atributos de clase de Elementor
      .replace(/\sclass\s*=\s*["'][^"']*elementor[^"']*["']/gi, "")
      // Remover divs vacíos o solo con espacios/saltos
      .replace(/<div[^>]*>\s*<\/div>/gi, "")
      // Remover spans vacíos
      .replace(/<span[^>]*>\s*<\/span>/gi, "");

    // Convertir tags HTML a saltos de línea antes de quitarlos
    decodedHtml = decodedHtml
      .replace(/<br\s*\/?>/gi, "\n") // <br> -> salto de línea
      .replace(/<\/p>/gi, "\n\n") // </p> -> doble salto
      .replace(/<p[^>]*>/gi, "") // quitar <p> (no agregar salto aquí)
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "$1") // mantener texto en strong
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "$1") // mantener texto en b
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "$2") // mantener texto del link
      .replace(/<[^>]*>/g, "") // quitar otros tags
      .replace(/\n{3,}/g, "\n\n") // máximo 2 saltos seguidos
      .replace(/^\n+/, "") // quitar saltos al inicio
      .replace(/\n+$/, "") // quitar saltos al final
      .replace(/\n\s*COMPRAR\s*$/i, "") // quitar "COMPRAR" al final
      .replace(/COMPRAR\s*$/i, "") // quitar "COMPRAR" al final sin salto
      .trim();

    // Final cleanup para contenido CSS residual
    decodedHtml = decodedHtml
      // Remover líneas que parezcan CSS (contienen : y ;)
      .replace(/^.*[{;}].*$/gm, "")
      // Remover líneas que empiecen con puntos o # (selectores CSS)
      .replace(/^[.#][^\n]*$/gm, "")
      // Remover líneas solo con caracteres CSS especiales
      .replace(/^[{}();,.*#@\-\s]*$/gm, "")
      // Limpiar saltos múltiples nuevamente
      .replace(/\n{3,}/g, "\n\n")
      .replace(/^\n+/, "")
      .replace(/\n+$/, "")
      .trim();

    return decodedHtml;
  }

  private decodeHtmlEntities(text: string): string {
    // Fallback manual para server-side (más robusto)
    const entityMap: { [key: string]: string } = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'",
      "&nbsp;": " ",
      "&hellip;": "...", // ellipsis
      "&#8211;": "–", // en dash
      "&#8212;": "—", // em dash
      "&#8216;": "\u2018", // left single quotation mark
      "&#8217;": "\u2019", // right single quotation mark
      "&#8220;": "\u201c", // left double quotation mark
      "&#8221;": "\u201d", // right double quotation mark
      "&#038;": "&", // ampersand
      "&#039;": "'", // apostrophe
      "&#x2013;": "–", // en dash hex
      "&#x2014;": "—", // em dash hex
      "&#45;": "-", // hyphen-minus
    };

    let decodedText = text;

    // Procesar entidades con nombre primero
    for (const [entity, character] of Object.entries(entityMap)) {
      decodedText = decodedText.replace(new RegExp(entity, "g"), character);
    }

    // Procesar entidades numéricas genéricas &#XXX;
    decodedText = decodedText.replace(/&#(\d+);/g, (match, num) => {
      return String.fromCharCode(parseInt(num, 10));
    });

    // Procesar entidades hexadecimales genéricas &#xXXX;
    decodedText = decodedText.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });

    return decodedText;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
      console.error("❌ TribeEventsAdapter: Invalid date string:", dateString);
      return new Date().toLocaleDateString("es-CO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  private formatPrice(cost: string): number {
    if (
      !cost ||
      cost === "0" ||
      cost.toLowerCase() === "gratis" ||
      cost.toLowerCase() === "free"
    ) {
      return 0;
    }

    // Extraer números del string de costo
    const numericCost = cost.replace(/[^\d.,]/g, "");
    const parsedCost = parseFloat(numericCost.replace(",", "."));

    return isNaN(parsedCost) ? 0 : parsedCost;
  }

  private getBannerImageFromDescription(description: string): string | null {
    // Extraer la imagen del banner desde la descripción HTML
    const imgMatch = description.match(
      /src="([^"]*Banner[^"]*1920[^"]*\.jpg)"/i
    );
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    // Buscar cualquier imagen grande en la descripción (width >= 1000)
    const largeImgMatch = description.match(
      /src="([^"]*\.(jpg|jpeg|png))"[^>]*width="(\d+)"/gi
    );
    if (largeImgMatch) {
      for (const match of largeImgMatch) {
        const urlMatch = match.match(/src="([^"]*)"/);
        const widthMatch = match.match(/width="(\d+)"/);
        if (urlMatch && widthMatch && parseInt(widthMatch[1]) >= 1000) {
          return urlMatch[1];
        }
      }
    }

    return null;
  }

  private getVenueMapFromDescription(description: string): string | null {
    if (!description) return null;

    // Buscar CUALQUIER imagen que contenga palabras relacionadas con mapas/localidades
    const allImages =
      description.match(/src="([^"]*\.(jpg|jpeg|png)[^"]*)"/gi) || [];

    // Expanded keywords for better map detection
    const mapKeywords = [
      "mapa",
      "map",
      "localidades",
      "seating",
      "asientos",
      "plano",
      "layout",
      "venue",
      "teatro",
      "coliseo",
      "estadio",
      "auditorio",
      "zones",
      "zonas",
      "sectores",
      "sectors",
      "ubicaciones",
      "locations",
    ];

    for (const imgTag of allImages) {
      const urlMatch = imgTag.match(/src="([^"]*)"/);
      if (urlMatch && urlMatch[1]) {
        const imageUrl = urlMatch[1].toLowerCase();

        // Check if the URL contains any map-related keyword
        const hasMapKeyword = mapKeywords.some((keyword) =>
          imageUrl.includes(keyword)
        );

        if (hasMapKeyword) {
          return urlMatch[1]; // Return original URL (not lowercase)
        }
      }
    }

    return null;
  }

  private getTicketLinkFromDescription(description: string): string | null {
    if (!description) return null;

    // Buscar enlaces a ordertickets.asp (sistema de boletos)
    const ticketMatch = description.match(
      /href="([^"]*ordertickets\.asp[^"]*)"/i
    );
    if (ticketMatch && ticketMatch[1]) {
      // Decodificar entidades HTML en el link
      return ticketMatch[1].replace(/&#038;/g, "&");
    }

    // Buscar otros enlaces a eventos.biotickets.com
    const eventMatch = description.match(
      /href="([^"]*eventos\.biotickets\.com[^"]*)"/i
    );
    if (eventMatch && eventMatch[1]) {
      return eventMatch[1].replace(/&#038;/g, "&");
    }

    return null;
  }

  private getCategoryFromCategories(
    categories: TribeEvent["categories"]
  ): string {
    if (!categories || !Array.isArray(categories) || categories.length === 0)
      return "Evento";

    const firstCategory = categories[0];
    if (!firstCategory || !firstCategory.name) return "Evento";

    const categoryName = firstCategory.name.toLowerCase();

    if (categoryName.includes("concert")) return "Concierto";
    if (categoryName.includes("festival")) return "Festival";
    if (categoryName.includes("show")) return "Show";
    if (categoryName.includes("party") || categoryName.includes("fiesta"))
      return "Fiesta";

    return firstCategory.name;
  }

  private getVenueInfo(venue: TribeEvent["venue"]): {
    name: string;
    address?: string;
  } {
    // Verificar que venue existe y es un array con elementos
    if (!venue || !Array.isArray(venue) || venue.length === 0) {
      return {
        name: "Bogotá, Colombia",
        address: "Bogotá, Colombia",
      };
    }

    const venueData = venue[0];

    // Verificar que venueData existe
    if (!venueData) {
      return {
        name: "Bogotá, Colombia",
        address: "Bogotá, Colombia",
      };
    }

    const name = venueData.venue || "Venue";
    const city = venueData.city || "Bogotá";
    const address = venueData.address;

    const fullName = city ? `${name}, ${city}` : name;
    const fullAddress =
      address && city ? `${address}, ${city}` : address || fullName;

    return {
      name: fullName,
      address: fullAddress,
    };
  }

  convertToEvent(tribeEvent: TribeEvent): Event {
    // Determinar si es evento pasado o próximo basado en fecha de fin
    // Use consistent date handling to prevent hydration mismatches
    const status = getEventStatus(tribeEvent.end_date);

    // Extraer imagen de banner desde la descripción
    const bannerImage = this.getBannerImageFromDescription(
      tribeEvent.description
    );

    // Extraer imagen de mapa del venue desde la descripción
    const venueMapImage = this.getVenueMapFromDescription(
      tribeEvent.description
    );

    // Extraer link de compra de boletos desde la descripción
    const ticketLink = this.getTicketLinkFromDescription(
      tribeEvent.description
    );

    // Obtener información del venue
    const venueInfo = this.getVenueInfo(tribeEvent.venue);

    // Extraer tags
    const tags = (Array.isArray(tribeEvent.tags) ? tribeEvent.tags : [])
      .filter((tag) => tag && tag.name)
      .map((tag) => tag.name.toLowerCase());

    // Usar SOLO description completo, nunca excerpt
    const rawDescription = tribeEvent.description;
    const cleanDescription =
      this.stripHtml(rawDescription) ||
      `Disfruta de este increíble evento: ${tribeEvent.title}`;

    return {
      id: tribeEvent.id.toString(),
      title: this.stripHtml(tribeEvent.title),
      description: cleanDescription,
      date: this.formatDate(tribeEvent.start_date),
      time: this.formatTime(tribeEvent.start_date),
      venue: venueInfo.name,
      venueAddress: venueInfo.address,
      // No hay coordenadas disponibles en la API
      venueLatitude: undefined,
      venueLongitude: undefined,
      venueMapImage: venueMapImage || undefined,
      ticketPrice: this.formatPrice(tribeEvent.cost || "0"),
      image: (tribeEvent.image && tribeEvent.image.url) || null,
      bannerImage: bannerImage || (tribeEvent.image && tribeEvent.image.url),
      category: this.getCategoryFromCategories(tribeEvent.categories),
      status: status,
      featured: tribeEvent.featured || false,
      tags: tags,
      organizer: "BioTickets",
      capacity: 500, // No disponible en API
      soldTickets: Math.floor(Math.random() * 300), // No disponible en API
      link: ticketLink || tribeEvent.url,
      startDateTime: tribeEvent.start_date,
      endDateTime: tribeEvent.end_date,
      allDay: tribeEvent.all_day || false,
    };
  }

  convertMultipleEvents(tribeEvents: TribeEvent[]): Event[] {
    return tribeEvents.map((event) => this.convertToEvent(event));
  }

  // Método para obtener eventos próximos
  async getUpcomingEvents(limit: number = 12): Promise<Event[]> {
    try {
      const tribeEvents = await wordpressAPI.getTribeUpcomingEvents(limit);

      // Verificar que tribeEvents sea un array
      if (!Array.isArray(tribeEvents)) {
        console.warn(
          "TribeEventsAdapter: Expected array but got:",
          typeof tribeEvents
        );
        return [];
      }

      return this.convertMultipleEvents(tribeEvents);
    } catch (error) {
      console.error("Error fetching upcoming tribe events:", error);
      return [];
    }
  }

  // Método para obtener eventos pasados
  async getPastEvents(limit: number = 12): Promise<Event[]> {
    try {
      const tribeEvents = await wordpressAPI.getTribePastEvents(limit);

      // Verificar que tribeEvents sea un array
      if (!Array.isArray(tribeEvents)) {
        console.warn(
          "TribeEventsAdapter: Expected array but got:",
          typeof tribeEvents
        );
        return [];
      }

      // If no events returned, return empty array
      if (tribeEvents.length === 0) {
        return [];
      }

      const events = this.convertMultipleEvents(tribeEvents);

      // Verificar que events sea un array
      if (!Array.isArray(events)) {
        console.warn(
          "TribeEventsAdapter: convertMultipleEvents did not return array"
        );
        return [];
      }

      // Ordenar manualmente del más reciente al más antiguo
      const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(a.startDateTime || a.date);
        const dateB = new Date(b.startDateTime || b.date);
        return dateB.getTime() - dateA.getTime();
      });

      const finalEvents = sortedEvents.slice(0, limit);
      return finalEvents;
    } catch (error) {
      console.error("❌ Error fetching past tribe events:", error);
      return [];
    }
  }

  // Nuevo método para obtener eventos pasados con paginación
  async getPastEventsPage(
    offset: number,
    limit: number = 12
  ): Promise<Event[]> {
    try {
      const tribeEvents = await wordpressAPI.getTribePastEventsPage(
        offset,
        limit
      );

      // Verificar que tribeEvents sea un array
      if (!Array.isArray(tribeEvents)) {
        console.warn(
          "TribeEventsAdapter: Expected array but got:",
          typeof tribeEvents
        );
        return [];
      }

      // If no events returned, return empty array
      if (tribeEvents.length === 0) {
        return [];
      }

      const events = this.convertMultipleEvents(tribeEvents);

      // Verificar que events sea un array
      if (!Array.isArray(events)) {
        console.warn(
          "TribeEventsAdapter: convertMultipleEvents did not return array"
        );
        return [];
      }

      // Ordenar manualmente del más reciente al más antiguo
      const sortedEvents = events.sort((a, b) => {
        const dateA = new Date(a.startDateTime || a.date);
        const dateB = new Date(b.startDateTime || b.date);
        return dateB.getTime() - dateA.getTime();
      });

      return sortedEvents;
    } catch (error) {
      console.error("❌ Error fetching paginated past tribe events:", error);
      return [];
    }
  }

  // Método para obtener un evento específico por ID
  async getEventById(id: string): Promise<Event | null> {
    try {
      const tribeEvent = await wordpressAPI.getTribeEventById(id);

      if (!tribeEvent) {
        return null;
      }

      return this.convertToEvent(tribeEvent);
    } catch (error) {
      console.error("❌ Error fetching event by ID:", error);
      return null;
    }
  }
}

export const tribeEventsAdapter = new TribeEventsAdapter();
