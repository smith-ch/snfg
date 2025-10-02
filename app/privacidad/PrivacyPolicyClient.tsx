"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyClient() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Política de Privacidad"
            description="Última actualización: 20 de marzo de 2025"
            className="text-center mb-12"
          />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="lead">
                En SNG SERVIMAX, accesible desde sngservimax.com, una de nuestras principales prioridades es la
                privacidad de nuestros visitantes. Este documento de Política de Privacidad contiene los tipos de
                información que se recopilan y registran por SNG SERVIMAX y cómo la utilizamos.
              </p>

              <p>
                Si tiene preguntas adicionales o requiere más información sobre nuestra Política de Privacidad, no dude
                en contactarnos.
              </p>

              <h3>Información que recopilamos</h3>
              <p>
                Cuando se registra en nuestro sitio web, como parte del proceso, recopilamos la información personal que
                nos proporciona, como su nombre, dirección y dirección de correo electrónico. Su información personal
                será utilizada solo para los motivos específicos indicados a continuación.
              </p>

              <h3>Cómo utilizamos su información</h3>
              <p>Utilizamos la información que recopilamos de varias formas, incluyendo:</p>
              <ul>
                <li>Proporcionar, operar y mantener nuestro sitio web</li>
                <li>Mejorar, personalizar y expandir nuestro sitio web</li>
                <li>Entender y analizar cómo utiliza nuestro sitio web</li>
                <li>Desarrollar nuevos productos, servicios, características y funcionalidades</li>
                <li>
                  Comunicarnos con usted, ya sea directamente o a través de uno de nuestros socios, para proporcionarle
                  actualizaciones y otra información relacionada con el sitio web y para propósitos de marketing y
                  promocionales
                </li>
                <li>Enviarle correos electrónicos</li>
                <li>Encontrar y prevenir fraudes</li>
              </ul>

              <h3>Archivos de registro</h3>
              <p>
                SNG SERVIMAX sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a
                los visitantes cuando visitan sitios web. Todas las empresas de alojamiento hacen esto como parte de los
                servicios de análisis de alojamiento. La información recopilada por los archivos de registro incluye
                direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP),
                marca de fecha y hora, páginas de referencia/salida y posiblemente el número de clics. Estos no están
                vinculados a ninguna información que sea personalmente identificable. El propósito de la información es
                analizar tendencias, administrar el sitio, rastrear el movimiento de los usuarios en el sitio web y
                recopilar información demográfica.
              </p>

              <h3>Cookies y balizas web</h3>
              <p>
                Como cualquier otro sitio web, SNG SERVIMAX utiliza 'cookies'. Estas cookies se utilizan para almacenar
                información, incluidas las preferencias de los visitantes y las páginas del sitio web que el visitante
                accedió o visitó. La información se utiliza para optimizar la experiencia de los usuarios al
                personalizar el contenido de nuestra página web según el tipo de navegador de los visitantes y/u otra
                información.
              </p>

              <h3>Políticas de privacidad de socios publicitarios</h3>
              <p>
                Puede consultar esta lista para encontrar la Política de Privacidad de cada uno de los socios
                publicitarios de SNG SERVIMAX.
              </p>
              <p>
                Los servidores de anuncios o redes de anuncios de terceros utilizan tecnologías como cookies, JavaScript
                o balizas web que se utilizan en sus respectivos anuncios y enlaces que aparecen en SNG SERVIMAX, que se
                envían directamente al navegador de los usuarios. Reciben automáticamente su dirección IP cuando esto
                ocurre. Estas tecnologías se utilizan para medir la efectividad de sus campañas publicitarias y/o para
                personalizar el contenido publicitario que ve en los sitios web que visita.
              </p>
              <p>
                Tenga en cuenta que SNG SERVIMAX no tiene acceso ni control sobre estas cookies que utilizan los
                anunciantes de terceros.
              </p>

              <h3>Políticas de privacidad de terceros</h3>
              <p>
                La Política de Privacidad de SNG SERVIMAX no se aplica a otros anunciantes o sitios web. Por lo tanto,
                le aconsejamos que consulte las respectivas Políticas de Privacidad de estos servidores de anuncios de
                terceros para obtener información más detallada. Puede incluir sus prácticas e instrucciones sobre cómo
                excluirse de ciertas opciones.
              </p>

              <h3>Información de niños</h3>
              <p>
                Otra parte de nuestra prioridad es agregar protección para los niños mientras usan Internet. Alentamos a
                los padres y tutores a observar, participar y/o monitorear y guiar su actividad en línea.
              </p>
              <p>
                SNG SERVIMAX no recopila a sabiendas ninguna Información de Identificación Personal de niños menores de
                13 años. Si cree que su hijo proporcionó este tipo de información en nuestro sitio web, le recomendamos
                encarecidamente que nos contacte de inmediato y haremos nuestros mejores esfuerzos para eliminar
                rápidamente dicha información de nuestros registros.
              </p>

              <h3>Consentimiento</h3>
              <p>Al utilizar nuestro sitio web, usted acepta nuestra Política de Privacidad y acepta sus términos.</p>
            </div>

            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} /> Volver al inicio
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
