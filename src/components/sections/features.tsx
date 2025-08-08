import { Shield, Clock, Star, CreditCard, Smartphone, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Transacciones 100% seguras con los mejores estándares de protección de datos."
  },
  {
    icon: Clock,
    title: "Confirmación Instantánea",
    description: "Recibe tus tickets al instante por email y WhatsApp. Sin esperas, sin complicaciones."
  },
  {
    icon: Star,
    title: "Eventos Únicos",
    description: "Acceso exclusivo a los mejores eventos de música, festivales y experiencias VIP."
  },
  {
    icon: CreditCard,
    title: "Múltiples Métodos de Pago",
    description: "Paga como prefieras: tarjetas, PSE, Nequi, Daviplata y más opciones disponibles."
  },
  {
    icon: Smartphone,
    title: "Entrada Digital",
    description: "Tus tickets siempre contigo en tu celular. QR code para acceso rápido y sin contacto."
  },
  {
    icon: Users,
    title: "Soporte 24/7",
    description: "Nuestro equipo está siempre disponible para ayudarte antes, durante y después del evento."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary/10 rounded-full px-4 py-2 mb-4">
            <span className="text-sm font-medium text-primary">🚀 ¿Por qué elegir Biotickets?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            La Mejor Experiencia en Tickets
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Más de 50,000 clientes confían en nosotros para vivir sus eventos favoritos. 
            Descubre por qué somos la plataforma #1 en Colombia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-card/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">4.8/5</div>
              <div className="text-sm text-muted-foreground">Rating promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime garantizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}