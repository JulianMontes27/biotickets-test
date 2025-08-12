import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, User, Ticket, CreditCard, Shield, RefreshCw, AlertTriangle, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - BioTickets',
  description: 'Términos y condiciones del servicio de compraventa de boletería para el acceso al evento de BIOTICKETS SAS.',
  openGraph: {
    title: 'Términos y Condiciones - BioTickets',
    description: 'Conoce nuestros términos y condiciones de servicio',
    type: 'website',
  },
};

export default function TerminosCondiciones() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-full text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Volver al inicio</span>
            </Link>
          </div>

          {/* Page Title */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-400/10 border border-indigo-400/20 rounded-full">
                <FileText className="text-indigo-400" size={24} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  Términos y 
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Condiciones</span>
                </h1>
                <p className="text-zinc-400 text-lg mt-2">
                  Del Servicio de Compraventa de Boletería
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-16 sm:pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Company Info */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="text-center">
                <h2 className="text-xl font-bold text-white mb-2">BIOTICKETS SAS</h2>
                <p className="text-zinc-400">NIT: 901717324-8</p>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-zinc-300 leading-relaxed">
                Al aceptar los Términos y Condiciones del Servicio de Compraventa de Boletería (en adelante los «T&C»), el Comprador y BIOTIOCKETS SAS (en adelante &quot;BIOTIOCKETS&quot;) se obligan en los siguientes términos:
              </p>
            </div>

            {/* Terms Content */}
            <div className="space-y-8">
              
              {/* 1. Declaraciones del Comprador */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <User size={16} className="text-indigo-400" />
                  </div>
                  1. DECLARACIONES DEL COMPRADOR
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  El «Comprador», entendido como la persona que adquiere una boleta a través de BIOTIOCKETS, comprende y acepta que:
                </p>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">1.1.</span>
                    <span>BIOTIOCKETS es un operador de boletería de eventos públicos, conciertos, eventos deportivos, conferencias u otros (en adelante los «Eventos» o el «Evento»).</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">1.2.</span>
                    <span>BIOTIOCKETS comercializa boletas de Eventos por mandato de sus organizadores (en adelante los «Productores» o el «Productor»), cuyo nombre y NIT se indican en la información de cada Evento.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">1.3.</span>
                    <span>BIOTIOCKETS únicamente comercializa la boletería del Evento, por lo que es un tercero ajeno a su organización y no es responsable por la modificación, aplazamiento, cancelación, cambios de precios, reprogramación, calidad, contenido, actos o consecuencias que se deriven del Evento.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">1.4.</span>
                    <span>BIOTIOCKETS presta un servicio de atención al cliente, software y call center, por lo que cobra un cargo por servicio que está sujeto al IVA.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">1.5.</span>
                    <span>Toda la información del Evento publicada en la página web de BIOTIOCKETS ha sido suministrada por los Productores.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">1.6.</span>
                    <span>La compra de boletería está sujeta a la aprobación y verificación de la transacción por parte del banco o entidad financiera.</span>
                  </div>
                </div>
              </section>

              {/* 2. Condiciones para la entrada */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Ticket size={16} className="text-indigo-400" />
                  </div>
                  2. CONDICIONES PARA LA ENTRADA AL EVENTO
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">2.1.</span>
                    <span>La entrada al Evento está condicionada a la presentación de la boleta válida y a la revisión de seguridad. El personal de seguridad podrá negar el acceso por razones justificadas.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">2.2.</span>
                    <span>La boleta sólo será válida para el Evento en la fecha, ubicación y hora indicadas.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">2.3.</span>
                    <span>El Comprador deberá conservar la boleta en todo momento durante el Evento.</span>
                  </div>
                </div>
              </section>

              {/* 3. Entrega de boletería */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Ticket size={16} className="text-indigo-400" />
                  </div>
                  3. ENTREGA DE BOLETERÍA
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">3.1.</span>
                    <span>Si el Comprador selecciona el servicio «pick-up», podrá recoger la boleta hasta un día antes del Evento en Puntos de Venta autorizados o en taquilla el día del Evento.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">3.2.</span>
                    <span>Si el Comprador selecciona el servicio «Electronic-Ticket», podrá descargar la boleta desde la cuenta de usuario creada en el sitio web de BIOTIOCKETS.</span>
                  </div>
                </div>
              </section>

              {/* 4. Cargo por servicio */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <CreditCard size={16} className="text-indigo-400" />
                  </div>
                  4. CARGO POR SERVICIO
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">4.1.</span>
                    <span>El Comprador entiende y acepta que BIOTIOCKETS es un intermediario que presta el servicio de generación de boletería y atención al usuario.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">4.2.</span>
                    <span>El Cargo por Servicio de Boletería y su valor se informan al Comprador en el proceso de compra.</span>
                  </div>
                </div>
              </section>

              {/* 5. Servicios adicionales */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Shield size={16} className="text-indigo-400" />
                  </div>
                  5. SERVICIOS ADICIONALES
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">5.1.</span>
                    <span>La boleta para ingresar al Evento se generará a través de alguna de las siguientes modalidades:</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Pick-Up:</strong> recoger una boleta física en puntos de venta autorizados y/o taquilla del Evento.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Electronic Ticket:</strong> descargar la boleta desde la cuenta de BIOTIOCKETS.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Live Access:</strong> acceder al Evento en línea a través de la cuenta de BIOTIOCKETS.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. Otros cobros */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <CreditCard size={16} className="text-indigo-400" />
                  </div>
                  6. OTROS COBROS
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">6.1.</span>
                    <span>El Comprador deberá asumir el costo adicional que se genere si realiza el pago a través de plataformas que cobren comisión por su servicio.</span>
                  </div>
                </div>
              </section>

              {/* 7. Derecho de retracto */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <RefreshCw size={16} className="text-indigo-400" />
                  </div>
                  7. DERECHO DE RETRACTO Y REVERSIÓN DE PAGO
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">7.1.</span>
                    <span>El Comprador tendrá derecho a retractarse de conformidad con el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor). Si decide ejercer el derecho de retracto, deberá solicitarlo a través del Centro de Atención Telefónica de BIOTIOCKETS.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">7.2.</span>
                    <span>La Reversión de Pagos aplica únicamente para pagos realizados por medio de tarjeta de crédito, débito u otro instrumento de pago electrónico, en el sitio web o Call Center de BIOTIOCKETS.</span>
                  </div>
                </div>
              </section>

              {/* 8. Política de devoluciones */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <RefreshCw size={16} className="text-indigo-400" />
                  </div>
                  8. POLÍTICA DE DEVOLUCIONES Y CAMBIOS
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">8.1.</span>
                    <span>BIOTIOCKETS se compromete a devolver el precio pagado por el Acceso al Evento solo en los siguientes casos:</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ejercicio del derecho de retracto o la opción de reversión de pago según lo previsto en los artículos 47 y 51 de la Ley 1480 de 2011.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Cancelación del Evento.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Posposición y/o reprogramación del Evento.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 9. Devolución del cargo por servicio */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <RefreshCw size={16} className="text-indigo-400" />
                  </div>
                  9. DEVOLUCIÓN DEL CARGO POR SERVICIO
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">9.1.</span>
                    <span>Se devolverá el cargo por servicio en caso de:</span>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ejercicio del derecho de retracto.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Reversión del pago.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Incumplimiento de BIOTIOCKETS de sus obligaciones como operador de boletería.</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 10. Transferencia de boletas */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Ticket size={16} className="text-indigo-400" />
                  </div>
                  10. TRANSFERENCIA DE BOLETAS
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <p>El usuario que recibe una boleta transferida declara y acepta:</p>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">10.1.</span>
                    <span>Comprende que la herramienta de transferencia de boletería no es para reventa.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">10.2.</span>
                    <span>El titular del medio de pago puede ejercer el derecho de retracto ante las entidades financieras.</span>
                  </div>
                </div>
              </section>

              {/* 11. Suministro de información */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <User size={16} className="text-indigo-400" />
                  </div>
                  11. SUMINISTRO DE INFORMACIÓN VERAZ, EXACTA Y COMPLETA
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">11.1.</span>
                    <span>El Comprador se obliga a suministrar información veraz, exacta y completa en el proceso de compra del servicio de boletería.</span>
                  </div>
                </div>
              </section>

              {/* 12. Normativa aplicable */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <FileText size={16} className="text-indigo-400" />
                  </div>
                  12. NORMATIVA APLICABLE Y RESOLUCIÓN DE CONTROVERSIAS
                </h3>
                <div className="space-y-3 text-zinc-300">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">12.1.</span>
                    <span>Las compras se realizan de acuerdo con estos T&C y la normativa colombiana.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold flex-shrink-0">12.2.</span>
                    <span>En caso de conflicto, se presentará una reclamación por escrito. Si no se resuelve, las partes aceptan someter la controversia a la jurisdicción ordinaria de Colombia.</span>
                  </div>
                </div>
              </section>

              {/* Important Notice */}
              <section className="bg-amber-400/5 border border-amber-400/20 rounded-2xl p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-full flex-shrink-0">
                    <AlertTriangle className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-amber-400 mb-3">Recuerda:</h4>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      Siempre existe la posibilidad de que ocurra alguna circunstancia extraordinaria que te impida asistir al evento. Por este motivo, resulta fundamental que cuentes con el respaldo de un servicio de asistencia en tu compra.
                    </p>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      BIOTICKETS SAS realizará las gestiones necesarias para comprobar los hechos, la veracidad de la información y ampliar cualquier detalle requerido. El cliente es responsable de la información y soportes entregados. Cualquier inconsistencia, falsedad en documentos, alteración de datos y/o información podrá ser reportada y denunciada ante las autoridades correspondientes.
                    </p>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      No estaremos en la obligación de reconocer reembolsos por circunstancias que no hayan sido justificadas o que no demuestren de manera suficiente la ocurrencia del hecho que le impide asistir al evento. BIOTICKETS se reserva el derecho, luego de la revisión de los soportes, de objetar la solicitud o pedir más información.
                    </p>
                    <p className="text-zinc-300 leading-relaxed">
                      De acuerdo con lo establecido en el artículo 47 de la Ley 1480 de 2011, el consumidor podrá ejercer el Derecho de Retracto del servicio de asistencia dentro de los cinco (5) días hábiles contados desde la fecha en que se efectuó la compra. Ten en cuenta que una vez te retractes y en caso de que posteriormente se presente alguna situación de inasistencia, no podrás acceder a la devolución por asistencia.
                    </p>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 sm:p-8 mt-12">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Phone className="text-indigo-400" size={20} />
                    <h3 className="text-xl font-bold text-white">¿Tienes consultas o dudas?</h3>
                  </div>
                  <p className="text-zinc-400 mb-6">
                    En caso de cualquier consulta o duda, BIOTICKETS pone a tu disposición nuestros canales de atención, en los que también podrás hacer seguimiento a tu solicitud.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a 
                      href="mailto:info@biotickets.com"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 border border-indigo-400/20 rounded-full text-indigo-400 hover:from-indigo-400/20 hover:to-purple-400/20 hover:border-indigo-400/40 transition-all duration-300"
                    >
                      <span>info@biotickets.com</span>
                    </a>
                    <a 
                      href="tel:+573001234567"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 border border-indigo-400/20 rounded-full text-indigo-400 hover:from-indigo-400/20 hover:to-purple-400/20 hover:border-indigo-400/40 transition-all duration-300"
                    >
                      <span>+57 300 1234567</span>
                    </a>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}