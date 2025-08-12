import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Edit, Trash2, X, RefreshCw, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales - BioTickets',
  description: 'Política de tratamiento de datos personales de BIOTICKETS SAS en cumplimiento de la Ley 1581 de 2012.',
  openGraph: {
    title: 'Política de Tratamiento de Datos - BioTickets',
    description: 'Conoce cómo protegemos y tratamos tus datos personales',
    type: 'website',
  },
};

export default function PoliticaTratamientoDatos() {
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
                <Shield className="text-indigo-400" size={24} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  Política de Tratamiento de 
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> Datos Personales</span>
                </h1>
                <p className="text-zinc-400 text-lg mt-2">
                  En cumplimiento de la Ley 1581 de 2012
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

            {/* Policy Content */}
            <div className="space-y-8">
              
              {/* Introduction */}
              <section>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  BIOTICKETS SAS, identificado con NIT 901717324-8, en cumplimiento de la Ley colombiana de Protección de Datos Personales (Ley 1581 de 2012) y su decreto reglamentario (Decreto 1377 de 2013), establece la siguiente política para el tratamiento de datos personales:
                </p>
              </section>

              {/* Responsable del Tratamiento */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Shield size={16} className="text-indigo-400" />
                  </div>
                  Responsable del Tratamiento
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  BIOTICKETS SAS será responsable del tratamiento de los datos personales obtenidos en el desarrollo de sus actividades comerciales, específicamente en la venta de boletería en línea en la ciudad de Cali.
                </p>
              </section>

              {/* Finalidad del Tratamiento */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Eye size={16} className="text-indigo-400" />
                  </div>
                  Finalidad del Tratamiento
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  Los datos personales obtenidos serán utilizados para los siguientes propósitos:
                </p>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Gestión de la venta de boletas y servicios relacionados.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Contacto con los clientes para fines comerciales, de atención al cliente y de marketing, siempre y cuando se cuente con la autorización correspondiente.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span>Cumplimiento de obligaciones legales y contractuales.</span>
                  </li>
                </ul>
              </section>

              {/* Tipos de Datos */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Edit size={16} className="text-indigo-400" />
                  </div>
                  Tipos de Datos Personales Recolectados
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  La información recopilada incluirá, pero no se limitará a:
                </p>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span><strong>Datos de identificación:</strong> nombres, números de documento de identidad, fecha de nacimiento.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span><strong>Datos de contacto:</strong> dirección de correo electrónico, teléfono, dirección física.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span><strong>Datos financieros:</strong> información de pago, datos de tarjetas bancarias.</span>
                  </li>
                </ul>
              </section>

              {/* Consentimiento */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <RefreshCw size={16} className="text-indigo-400" />
                  </div>
                  Consentimiento
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  BIOTICKETS SAS obtendrá el consentimiento expreso y previo de los titulares de los datos para el tratamiento de su información personal, a menos que exista una excepción legal para su tratamiento sin consentimiento.
                </p>
              </section>

              {/* Seguridad */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Shield size={16} className="text-indigo-400" />
                  </div>
                  Seguridad de la Información
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  Se implementarán medidas de seguridad técnicas, administrativas y físicas para proteger los datos personales contra pérdida, robo, acceso no autorizado, divulgación, alteración o destrucción indebida.
                </p>
              </section>

              {/* Derechos de los Titulares */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Eye size={16} className="text-indigo-400" />
                  </div>
                  Derechos de los Titulares de los Datos
                </h3>
                <p className="text-zinc-300 leading-relaxed mb-4">
                  Los titulares de los datos tendrán los siguientes derechos:
                </p>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Eye size={14} className="text-indigo-400" />
                    </div>
                    <span>Acceder a sus datos personales.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Edit size={14} className="text-indigo-400" />
                    </div>
                    <span>Rectificar la información en caso de ser inexacta o incompleta.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trash2 size={14} className="text-indigo-400" />
                    </div>
                    <span>Suprimir sus datos cuando no sean necesarios para los fines que justificaron su obtención.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <X size={14} className="text-indigo-400" />
                    </div>
                    <span>Revocar el consentimiento otorgado para el tratamiento de sus datos, siempre que no exista un deber legal o contractual que lo impida.</span>
                  </li>
                </ul>
              </section>

              {/* Transferencia */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-400/10 border border-indigo-400/20 rounded-full flex items-center justify-center">
                    <Share2 size={16} className="text-indigo-400" />
                  </div>
                  Transferencia y Compartición de Datos
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  En caso de transferencia nacional o internacional de datos personales, se garantizará que terceros receptores cumplan con los estándares de seguridad y protección establecidos en esta política.
                </p>
              </section>

              {/* Vigencia */}
              <section>
                <h3 className="text-xl font-bold text-white mb-4">Vigencia</h3>
                <p className="text-zinc-300 leading-relaxed">
                  Esta política entra en vigencia a partir de su aprobación y será revisada periódicamente para asegurar su actualización y cumplimiento con la normativa vigente en materia de protección de datos personales.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 sm:p-8 mt-12">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">¿Tienes preguntas sobre esta política?</h3>
                  <p className="text-zinc-400 mb-6">
                    Si tienes alguna consulta sobre el tratamiento de tus datos personales, puedes contactarnos:
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