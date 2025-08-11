interface HeroBanner {
  id: number;
  title: string;
  imageUrl: string;
  slug: string;
  dimensions: {
    width: number;
    height: number;
  };
  filesize: number;
  buttonText?: string;
  buttonUrl?: string;
}

interface WordPressBanner {
  id: number;
  title: { rendered: string };
  source_url: string;
  slug: string;
  media_details: {
    width: number;
    height: number;
    filesize: number;
  };
}

class HeroBannerService {
  private readonly API_BASE = 'https://www.biotickets.com/wp-json/wp/v2';

  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 86400 } // 24 hours cache to reduce costs
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
      throw error;
    }
  }

  async getBanners(): Promise<HeroBanner[]> {
    try {
      const banners = await this.fetchWithErrorHandling<WordPressBanner[]>(
        `${this.API_BASE}/media?search=banner&per_page=20&_embed=true`
      );

      // Filtrar solo banners de 1920px (formato hero) y ordenar por fecha
      return banners
        .filter(banner => 
          banner.media_details.width >= 1200 && // Solo banners grandes
          !banner.slug.includes('640') // Excluir versiones pequeñas
        )
        .map(banner => ({
          id: banner.id,
          title: banner.title.rendered.replace(/Banner_\s*|\s*_\s*1920/g, '').trim(),
          imageUrl: banner.source_url,
          slug: banner.slug,
          dimensions: {
            width: banner.media_details.width,
            height: banner.media_details.height
          },
          filesize: banner.media_details.filesize
        }))
        .sort((a, b) => b.id - a.id); // Más recientes primero
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  }

  async getMainHeroBanner(): Promise<HeroBanner | null> {
    try {
      // Basado en el Revolution Slider del HTML proporcionado
      // El slider principal usa el banner de Kris
      const banners = await this.getBanners();
      
      // Buscar específicamente el banner de Kris que está en el Revolution Slider
      const krisBanner = banners.find(b => 
        b.slug.toLowerCase().includes('kris') && 
        b.dimensions.width >= 1200
      );
      
      if (krisBanner) {
        console.log(`🎯 Using Revolution Slider banner: ${krisBanner.title}`);
        // Agregar información del botón del slider
        return {
          ...krisBanner,
          buttonText: 'COMPRAR',
          buttonUrl: 'https://eventos.biotickets.com/ordertickets.asp?p=152'
        };
      }

      // Fallback a otros banners si Kris no está disponible
      const priorityBanners = [
        'fiesta-verano',
        'festival-djs',
        'amor-y-amistad'
      ];

      for (const priority of priorityBanners) {
        const banner = banners.find(b => 
          b.slug.toLowerCase().includes(priority.toLowerCase())
        );
        if (banner) {
          console.log(`🎯 Using fallback banner: ${banner.title}`);
          return banner;
        }
      }

      console.warn('⚠️ No banners found');
      return null;
    } catch (error) {
      console.error('Error getting main hero banner:', error);
      return null;
    }
  }

  // Método para obtener banner específico por slug
  async getBannerBySlug(slug: string): Promise<HeroBanner | null> {
    try {
      const banners = await this.getBanners();
      return banners.find(banner => banner.slug.includes(slug)) || null;
    } catch (error) {
      console.error(`Error getting banner by slug ${slug}:`, error);
      return null;
    }
  }

  // Método para obtener banners aleatorios para rotación
  async getRandomBanners(count: number = 3): Promise<HeroBanner[]> {
    try {
      const banners = await this.getBanners();
      const shuffled = [...banners].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Error getting random banners:', error);
      return [];
    }
  }
}

export const heroBannerService = new HeroBannerService();
export type { HeroBanner };