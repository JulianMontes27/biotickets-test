import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/structured-data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
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
    <html lang="es">
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
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
