"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Award, Clock, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Calidad Garantizada",
      description: "Comprometidos con los más altos estándares en cada proyecto",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Puntualidad",
      description: "Cumplimos con los plazos establecidos para cada proyecto",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Seguridad",
      description: "Priorizamos la seguridad en todas nuestras operaciones",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Equipo Profesional",
      description: "Contamos con un equipo altamente capacitado y experimentado",
    },
  ]

  return (
    <section ref={ref} className="py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
                alt="Sobre SNG SERVIMAX"
                fill
                className="object-cover"
              />

              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent"></div>

              {/* Decorative elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute top-4 left-4 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-sm">Años de experiencia</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute bottom-4 right-4 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg shadow-lg"
              >
                <div className="text-3xl font-bold text-primary">25+</div>
                <div className="text-sm">Proyectos completados</div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12"
              >
                <div className="bg-primary/80 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                  Expertos en Mantenimiento
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              SOBRE NOSOTROS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">Mantenimiento y Servicios Variados</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Somos una empresa líder especializada en ofrecer soluciones integrales para mantenimiento de viviendas,
              laboratorio de hormigón y servicios de asistencia financiera. Con años de experiencia en el mercado, nos
              hemos consolidado como un referente de calidad y confianza.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Nuestro compromiso con la excelencia y la innovación nos permite ofrecer servicios que superan las
              expectativas de nuestros clientes, garantizando resultados duraderos y de alta calidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center text-center p-4 rounded-xl card-glass hover-scale"
                >
                  <div className="p-3 bg-primary/10 rounded-full mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <Button className="btn-gradient shadow-blue group" asChild>
              <Link href="/nosotros" className="flex items-center gap-2">
                Conocer más sobre nosotros
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
