import { Event } from '@/types';

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Festival de Música Electrónica',
    description: 'La mejor música electrónica con los DJs más reconocidos de la escena internacional.',
    date: '2024-09-15',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Centro de Convenciones',
    ticketPrice: 45000,
    slug: 'festival-musica-electronica'
  },
  {
    id: '2',
    title: 'Concierto de Rock Nacional',
    description: 'Las mejores bandas de rock nacional en una noche épica llena de energía.',
    date: '2024-09-20',
    time: '19:30',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Estadio Municipal',
    ticketPrice: 35000,
    slug: 'concierto-rock-nacional'
  },
  {
    id: '3',
    title: 'Festival de Jazz',
    description: 'Una experiencia única con los mejores exponentes del jazz contemporáneo.',
    date: '2024-09-25',
    time: '18:00',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Teatro Nacional',
    ticketPrice: 25000,
    slug: 'festival-jazz'
  },
  {
    id: '6',
    title: 'Pop Latino Fest',
    description: 'Los mejores exponentes del pop latino en una sola noche llena de color y ritmo.',
    date: '2024-10-05',
    time: '21:00',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Arena Central',
    ticketPrice: 55000,
    slug: 'pop-latino-fest'
  },
  {
    id: '7',
    title: 'Techno Underground',
    description: 'Una experiencia inmersiva en los sonidos más profundos del techno underground.',
    date: '2024-10-12',
    time: '22:00',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c0bb4ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Club Industrial',
    ticketPrice: 30000,
    slug: 'techno-underground'
  },
  {
    id: '8',
    title: 'Festival Acústico',
    description: 'Música íntima y emocional con los mejores cantautores nacionales e internacionales.',
    date: '2024-10-18',
    time: '19:00',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Auditorio Mayor',
    ticketPrice: 40000,
    slug: 'festival-acustico'
  }
];

export const pastEvents: Event[] = [
  {
    id: '4',
    title: 'Reggaetón Fest 2024',
    description: 'Los artistas más populares del reggaetón en una sola noche.',
    date: '2024-07-15',
    time: '21:00',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Coliseo Mayor',
    ticketPrice: 50000,
    isPastEvent: true,
    slug: 'reggaeton-fest-2024'
  },
  {
    id: '5',
    title: 'Festival Indie Rock',
    description: 'Bandas independientes emergentes en una celebración del rock alternativo.',
    date: '2024-06-30',
    time: '19:00',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Club Nocturno',
    ticketPrice: 20000,
    isPastEvent: true,
    slug: 'festival-indie-rock'
  },
  {
    id: '9',
    title: 'Urban Beats Festival',
    description: 'El mejor hip-hop, trap y urban music con artistas nacionales e internacionales.',
    date: '2024-05-20',
    time: '20:30',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Parque de la Música',
    ticketPrice: 42000,
    isPastEvent: true,
    slug: 'urban-beats-festival'
  },
  {
    id: '10',
    title: 'Salsa & Bachata Night',
    description: 'Una noche llena de ritmo caribeño con las mejores orquestas de salsa.',
    date: '2024-04-15',
    time: '21:00',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c0bb4ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Casa de la Música',
    ticketPrice: 28000,
    isPastEvent: true,
    slug: 'salsa-bachata-night'
  },
  {
    id: '11',
    title: 'Metal Apocalypse',
    description: 'El evento más brutal del año con las mejores bandas de metal extremo.',
    date: '2024-03-10',
    time: '19:00',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Venue Underground',
    ticketPrice: 38000,
    isPastEvent: true,
    slug: 'metal-apocalypse'
  },
  {
    id: '12',
    title: 'Cumbia Fest',
    description: 'Celebración de la cumbia tradicional y moderna con artistas de toda Latinoamérica.',
    date: '2024-02-25',
    time: '18:30',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    venue: 'Plaza de Eventos',
    ticketPrice: 32000,
    isPastEvent: true,
    slug: 'cumbia-fest'
  }
];