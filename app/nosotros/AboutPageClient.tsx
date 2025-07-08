"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import CompanyValues from "@/components/company-values"
import TeamSection from "@/components/team-section"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function AboutPageClient() {
  const handleSendResume = () => {
    toast({
      title: "Formulario de CV",
      description: "Se abrirá el formulario para enviar su currículum",
    })
    // In a real application, this would open a form or redirect to a careers page
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 pattern-grid opacity-5 -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Sobre Nosotros"
            description="Conoce más sobre SNG SERVIMAX y nuestro compromiso con la excelencia"
            className="text-center mb-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
                  alt="Historia de SNG SERVIMAX"
                  fill
                  className="object-cover"
                />

                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
              </div>
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                NUESTRA HISTORIA
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">Trayectoria de Excelencia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  SNG SERVIMAX fue fundada con la visión de convertirse en un referente en el sector de la construcción,
                  ofreciendo servicios de alta calidad y soluciones innovadoras para todo tipo de proyectos.
                </p>
                <p>
                  A lo largo de los años, hemos crecido y evolucionado, ampliando nuestra gama de servicios y
                  consolidando nuestra posición en el mercado. Nuestra trayectoria está marcada por el compromiso con la
                  excelencia, la innovación y la satisfacción de nuestros clientes.
                </p>
                <p>
                  Hoy, SNG SERVIMAX es reconocida por su profesionalismo, la calidad de sus servicios y su capacidad
                  para abordar proyectos de cualquier escala y complejidad. Nuestro equipo de profesionales altamente
                  capacitados trabaja con dedicación para superar las expectativas de nuestros clientes en cada
                  proyecto.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Años de experiencia</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Proyectos completados</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Profesionales</div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción del cliente</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 space-y-16" id="valores">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <CompanyValues />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
            id="politicas"
          >
            <h3 className="text-2xl font-bold mb-8">Nuestras Políticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-primary/10 rounded-lg">
                <h4 className="text-xl font-bold mb-4">Política de Calidad</h4>
                <p className="text-muted-foreground">
                  SNG SERVIMAX se compromete a ofrecer productos y servicios de alta calidad en el sector de la
                  construcción, garantizando el cumplimiento de los estándares nacionales e internacionales. Utilizamos
                  materiales certificados y aplicamos buenas prácticas para asegurar la durabilidad y resistencia de
                  cada proyecto.
                </p>
              </div>
              <div className="p-6 bg-primary/10 rounded-lg">
                <h4 className="text-xl font-bold mb-4">Política de Seguridad y Salud Ocupacional</h4>
                <p className="text-muted-foreground">
                  Nos comprometemos a proporcionar un entorno de trabajo seguro para nuestros empleados, clientes y
                  aliados estratégicos. Cumplimos con las normativas de seguridad industrial y promovemos la prevención
                  de riesgos en cada una de nuestras operaciones.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
            id="equipo"
          >
            <TeamSection />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-4">¿Quiere formar parte de nuestro equipo?</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Estamos siempre en búsqueda de talento para unirse a nuestro equipo. Si está interesado en formar parte de
            SNG SERVIMAX, envíenos su currículum.
          </p>
          <Button
            className="btn-gradient shadow-blue px-6 py-3 rounded-lg text-white font-medium"
            onClick={handleSendResume}
          >
            Enviar Currículum
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

