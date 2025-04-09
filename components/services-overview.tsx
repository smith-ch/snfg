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
    id: "mantenimiento-viviendas",
    title: "Mantenimiento de Viviendas",
    description: "Soluciones completas para el mantenimiento y cuidado de su hogar o propiedad residencial.",
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    color: "from-blue-500 to-blue-600",
    services: [
      {
        title: "Reparaciones generales",
        description: "Servicio de reparaciones para todo tipo de problemas en el hogar",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Mantenimiento preventivo",
        description: "Programas de mantenimiento regular para prevenir problemas mayores",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Renovaciones",
        description: "Actualización y mejora de espacios residenciales",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Pintura y acabados",
        description: "Servicios profesionales de pintura interior y exterior",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "laboratorio-hormigon",
    title: "Laboratorio de Hormigón",
    description:
      "Análisis, pruebas y certificación de calidad para todo tipo de hormigón y materiales de construcción.",
    icon: "🧪",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
    color: "from-green-500 to-green-600",
    services: [
      {
        title: "Pruebas de resistencia",
        description: "Análisis de resistencia y durabilidad del hormigón",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Certificación de calidad",
        description: "Certificaciones oficiales para proyectos de construcción",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Desarrollo de mezclas",
        description: "Creación de mezclas personalizadas según necesidades específicas",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Consultoría técnica",
        description: "Asesoramiento experto en materiales y aplicaciones",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "asistencia-financiera",
    title: "Servicios de Asistencia Financiera",
    description: "Soluciones financieras para facilitar sus proyectos de construcción y mantenimiento.",
    icon: "💰",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    color: "from-purple-500 to-purple-600",
    services: [
      {
        title: "Financiamiento de proyectos",
        description: "Opciones de financiamiento adaptadas a su presupuesto",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Asesoría financiera",
        description: "Consultoría para optimizar la inversión en su proyecto",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Planes de pago",
        description: "Facilidades de pago flexibles para sus servicios",
        icon: <CheckCircle className="h-5 w-5" />,
      },
      {
        title: "Presupuestos detallados",
        description: "Elaboración de presupuestos claros y transparentes",
        icon: <CheckCircle className="h-5 w-5" />,
      },
    ],
  },
]

export default function ServicesOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="services-section" className="py-12 sm:py-16 md:py-20" ref={ref}>
      <div className="container mx-auto px-4">
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
            Soluciones Integrales para sus Necesidades
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios especializados para satisfacer todas sus necesidades
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/5 backdrop-blur-sm">
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
