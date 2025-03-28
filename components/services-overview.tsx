"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const serviceCategories = [
  {
    id: "complementarios",
    title: "Servicios Complementarios en Construcción",
    description: "Soluciones especializadas para complementar sus proyectos de construcción",
    icon: "🏗️",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    color: "from-blue-500 to-blue-600",
    services: [
      {
        title: "Impermeabilización de estructuras",
        description: "Protección contra humedad y filtraciones para todo tipo de estructuras",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Corte y demolición de concreto",
        description: "Servicios precisos de corte y demolición con equipos especializados",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Colocación de concreto",
        description: "Instalación profesional de concreto para todo tipo de proyectos",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Alquiler de maquinaria pesada",
        description: "Amplia gama de maquinaria pesada disponible para sus proyectos",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "innovacion",
    title: "Servicios de Innovación y Sostenibilidad",
    description: "Soluciones modernas y sostenibles para la industria de la construcción",
    icon: "🌱",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
    color: "from-green-500 to-green-600",
    services: [
      {
        title: "Construcción de planta de Hormigón",
        description: "Diseño y construcción de plantas de hormigón eficientes y modernas",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Instalación de planta de Hormigón",
        description: "Instalación profesional de plantas de hormigón con los más altos estándares",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Gestión de residuos de construcción",
        description: "Manejo responsable y sostenible de residuos de construcción",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "empresas",
    title: "Servicios para Empresas y Proyectos Comerciales",
    description: "Soluciones integrales para empresas y proyectos comerciales",
    icon: "🏢",
    image: "https://betasociados.com/wp-content/uploads/revslider/slider2/asesoria.jpg",
    color: "from-purple-500 to-purple-600",
    services: [
      {
        title: "Asesoría empresarial",
        description: "Consultoría especializada para optimizar sus operaciones de construcción",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Consultoría en optimización de costos",
        description: "Estrategias efectivas para reducir costos sin comprometer la calidad",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Diseño y planificación de proyectos",
        description: "Planificación detallada y diseño profesional para sus proyectos",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "mantenimiento",
    title: "Servicios de Mantenimiento y Limpieza",
    description: "Mantenimiento profesional para prolongar la vida útil de sus estructuras",
    icon: "🧹",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    color: "from-amber-500 to-amber-600",
    services: [
      {
        title: "Mantenimiento de edificaciones",
        description: "Servicios regulares de mantenimiento para todo tipo de edificaciones",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Limpieza post-construcción",
        description: "Limpieza profesional después de finalizar proyectos de construcción",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Pintura, acabados y reparación",
        description: "Servicios de pintura, acabados y reparaciones generales",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
]

export default function ServicesOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="services-section" className="py-12 sm:py-16 md:py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 pattern-grid opacity-5 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            NUESTROS SERVICIOS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-heading">
            Soluciones Integrales para sus Proyectos
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios especializados para satisfacer todas sus necesidades de construcción
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="relative h-40 sm:h-48 w-full overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} mix-blend-multiply opacity-60`}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-white text-lg sm:text-xl font-bold mt-1">{category.title}</h3>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <p className="text-muted-foreground mb-3 text-sm sm:text-base">{category.description}</p>
                  <ul className="space-y-2">
                    {category.services.slice(0, 2).map((service, index) => (
                      <li key={index} className="flex gap-2 group/item">
                        <span className="text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                          {service.icon}
                        </span>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base group-hover/item:text-primary transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">{service.description}</p>
                        </div>
                      </li>
                    ))}
                    {category.services.length > 2 && (
                      <li className="text-xs sm:text-sm text-primary">
                        + {category.services.length - 2} servicios más
                      </li>
                    )}
                  </ul>
                </CardContent>

                <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                  <Button variant="outline" asChild className="w-full group/btn text-sm">
                    <Link href={`/servicios#${category.id}`} className="flex items-center justify-center gap-2">
                      Ver más detalles
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <Button size="lg" className="btn-gradient shadow-blue group text-sm sm:text-base" asChild>
            <Link href="/servicios" className="flex items-center gap-2">
              Ver todos nuestros servicios
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

