"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsClient() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Términos de Servicio"
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
                Bienvenido a SNG SERVIMAX. Estos términos y condiciones describen las reglas y regulaciones para el uso
                del sitio web de SNG SERVIMAX, ubicado en sngservimax.com.
              </p>

              <p>
                Al acceder a este sitio web, asumimos que acepta estos términos y condiciones. No continúe usando SNG
                SERVIMAX si no está de acuerdo con todos los términos y condiciones establecidos en esta página.
              </p>

              <h3>Licencia</h3>
              <p>
                A menos que se indique lo contrario, SNG SERVIMAX y/o sus licenciantes poseen los derechos de propiedad
                intelectual de todo el material en SNG SERVIMAX. Todos los derechos de propiedad intelectual están
                reservados. Puede acceder a esto desde SNG SERVIMAX para su uso personal sujeto a las restricciones
                establecidas en estos términos y condiciones.
              </p>

              <p>No debe:</p>
              <ul>
                <li>Republicar material de SNG SERVIMAX</li>
                <li>Vender, alquilar o sublicenciar material de SNG SERVIMAX</li>
                <li>Reproducir, duplicar o copiar material de SNG SERVIMAX</li>
                <li>Redistribuir contenido de SNG SERVIMAX</li>
              </ul>

              <p>Este Acuerdo comenzará en la fecha presente.</p>

              <h3>Hipervínculos a nuestro contenido</h3>
              <p>
                Las siguientes organizaciones pueden vincular a nuestro sitio web sin aprobación previa por escrito:
              </p>
              <ul>
                <li>Agencias gubernamentales;</li>
                <li>Motores de búsqueda;</li>
                <li>Organizaciones de noticias;</li>
                <li>
                  Los distribuidores de directorios en línea pueden vincular a nuestro sitio web de la misma manera que
                  vinculan a los sitios web de otras empresas enumeradas; y
                </li>
                <li>
                  Empresas acreditadas en todo el sistema, excepto las que solicitan organizaciones sin fines de lucro,
                  centros comerciales de caridad y grupos de recaudación de fondos de caridad que no pueden tener
                  hipervínculos a nuestro sitio web.
                </li>
              </ul>

              <p>
                Estas organizaciones pueden vincular a nuestra página de inicio, a publicaciones o a otra información
                del sitio web siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente
                patrocinio, respaldo o aprobación de la parte vinculante y sus productos y/o servicios; y (c) encaje
                dentro del contexto del sitio de la parte vinculante.
              </p>

              <h3>Reserva de derechos</h3>
              <p>
                Nos reservamos el derecho de solicitar que elimine todos los enlaces o cualquier enlace particular a
                nuestro sitio web. Usted aprueba eliminar inmediatamente todos los enlaces a nuestro sitio web a pedido.
                También nos reservamos el derecho de modificar estos términos y condiciones y su política de vinculación
                en cualquier momento. Al vincular continuamente a nuestro sitio web, usted acepta estar obligado y
                seguir estos términos y condiciones de vinculación.
              </p>

              <h3>Eliminación de enlaces de nuestro sitio web</h3>
              <p>
                Si encuentra algún enlace en nuestro sitio web que sea ofensivo por cualquier motivo, puede contactarnos
                e informarnos en cualquier momento. Consideraremos solicitudes para eliminar enlaces, pero no estamos
                obligados a hacerlo ni a responderle directamente.
              </p>
              <p>
                No garantizamos que la información en este sitio web sea correcta, no garantizamos su integridad o
                precisión; ni prometemos asegurarnos de que el sitio web permanezca disponible o que el material en el
                sitio web se mantenga actualizado.
              </p>

              <h3>Exención de responsabilidad</h3>
              <p>
                En la medida máxima permitida por la ley aplicable, excluimos todas las representaciones, garantías y
                condiciones relacionadas con nuestro sitio web y el uso de este sitio web. Nada en este descargo de
                responsabilidad:
              </p>
              <ul>
                <li>limitará o excluirá nuestra o su responsabilidad por muerte o lesiones personales;</li>
                <li>limitará o excluirá nuestra o su responsabilidad por fraude o tergiversación fraudulenta;</li>
                <li>
                  limitará cualquiera de nuestras o sus responsabilidades de cualquier manera que no esté permitida por
                  la ley aplicable; o
                </li>
                <li>
                  excluirá cualquiera de nuestras o sus responsabilidades que no puedan ser excluidas bajo la ley
                  aplicable.
                </li>
              </ul>

              <p>
                Las limitaciones y prohibiciones de responsabilidad establecidas en esta Sección y en otras partes de
                este descargo de responsabilidad: (a) están sujetas al párrafo anterior; y (b) rigen todas las
                responsabilidades que surjan bajo el descargo de responsabilidad, incluidas las responsabilidades que
                surjan en el contrato, en agravio y por incumplimiento de obligación legal.
              </p>
              <p>
                En la medida en que el sitio web y la información y servicios en el sitio web se proporcionen de forma
                gratuita, no seremos responsables de ninguna pérdida o daño de ningún tipo.
              </p>
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

