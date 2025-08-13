import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "600"], // Reduced weights to save bandwidth
  display: "swap", // Better performance
  preload: true,
  fallback: ["system-ui", "arial"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400"], // Only essential weight
  display: "swap",
  preload: false, // Don't preload secondary font
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: "Biotickets - Boletos para Conciertos y Eventos",
  description:
    "Compra boletos para los mejores conciertos y eventos de música. Encuentra tickets para festivales, shows en vivo y más entretenimiento.",
  keywords:
    "boletos, conciertos, eventos, música, tickets, festivales, espectáculos",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Biotickets - Boletos para Conciertos y Eventos",
    description:
      "Compra boletos para los mejores conciertos y eventos de música",
    siteName: "Biotickets",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biotickets - Boletos para Conciertos y Eventos",
    description:
      "Compra boletos para los mejores conciertos y eventos de música",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="es" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
      >
        <Header />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
