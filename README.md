# Biotickets - Landing Page

Rediseño completo de la plataforma Biotickets para venta de boletos de conciertos y eventos musicales, desarrollado con Next.js 14 y App Router.

## 🚀 Características

- **Next.js 14 con App Router**: Última versión de Next.js con routing optimizado
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework CSS utilitario para diseño responsive
- **SEO Optimizado**: Meta tags, sitemap, structured data (JSON-LD)
- **Responsive Design**: Diseño adaptable para todos los dispositivos
- **Core Web Vitals**: Optimizaciones para rendimiento web
- **Accessibility**: Diseño accesible siguiendo mejores prácticas

## 🛠️ Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (iconos)
- Radix UI (componentes primitivos)
- next-sitemap (generación automática de sitemap)

## 📁 Estructura del proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── globals.css        # Estilos globales
│   └── sitemap.ts         # Sitemap dinámico
├── components/
│   ├── layout/            # Componentes de layout
│   │   ├── Header.tsx     # Navegación principal
│   │   └── Footer.tsx     # Pie de página
│   ├── sections/          # Secciones de página
│   │   ├── upcoming-events.tsx
│   │   └── past-events.tsx
│   └── ui/               # Componentes de UI
│       ├── button.tsx    # Componente de botón
│       ├── event-card.tsx # Tarjeta de evento
│       └── hero-section.tsx # Hero principal
├── data/
│   └── events.ts         # Datos de eventos
├── lib/
│   ├── utils.ts          # Utilidades
│   └── structured-data.ts # Schemas JSON-LD
└── types/
    └── index.ts          # Tipos TypeScript
```

## 🚦 Comandos

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm start

# Linter
npm run lint
```

## 🔍 SEO y Migración desde WordPress

### Características SEO implementadas:
- Meta tags optimizados para Google
- Open Graph para redes sociales
- Twitter Cards
- Sitemap.xml automático
- Structured data (JSON-LD)
- Robots.txt configurado

### Estrategia de migración desde WordPress:
1. **Mantener URLs**: Implementar redirects 301 desde WordPress
2. **Meta tags idénticos**: Mismos títulos y descripciones
3. **Google Search Console**: Verificar y monitorear indexación
4. **Structured data**: Schema.org para eventos y organización

### Pasos para la migración:
1. Configurar dominio en el hosting de Next.js
2. Crear redirects 301 en WordPress hacia Next.js
3. Verificar dominio en Google Search Console
4. Monitorear rankings y tráfico durante la transición

## 🌐 Deploy

El proyecto está listo para deploy en Vercel, Netlify o cualquier hosting que soporte Node.js.

### Variables de entorno:
```env
SITE_URL=https://www.biotickets.com
```
