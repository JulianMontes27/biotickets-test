import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="biotickets-gradient w-8 h-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold text-foreground">Biotickets</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Tu plataforma de confianza para boletos de conciertos y eventos. 
              Vive la música como nunca antes.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Eventos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/eventos" className="text-muted-foreground hover:text-primary transition-colors">
                  Próximos Conciertos
                </Link>
              </li>
              <li>
                <Link href="/festivales" className="text-muted-foreground hover:text-primary transition-colors">
                  Festivales
                </Link>
              </li>
              <li>
                <Link href="/teatro" className="text-muted-foreground hover:text-primary transition-colors">
                  Teatro y Shows
                </Link>
              </li>
              <li>
                <Link href="/deportes" className="text-muted-foreground hover:text-primary transition-colors">
                  Eventos Deportivos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ayuda" className="text-muted-foreground hover:text-primary transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/politicas" className="text-muted-foreground hover:text-primary transition-colors">
                  Políticas de Reembolso
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Mail size={16} />
                <span>info@biotickets.com</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={16} />
                <span>+57 1 234 5678</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <MapPin size={16} />
                <span>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Biotickets. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}