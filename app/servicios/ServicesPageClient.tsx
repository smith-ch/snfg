"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, CheckCircle, Phone, MapPin, Mail } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import ImageWithFallback from "@/components/image-with-fallback"

// Data for the service categories
const serviceCategories = [
  {
    id: "mantenimiento-viviendas",
    title: "Mantenimiento de Viviendas",
    description: "Soluciones completas para el mantenimiento y cuidado de su hogar o propiedad residencial.",
    color: "from-blue-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    icon: "🏠",
    features: [
      "Reparaciones generales para todo tipo de problemas en el hogar",
      "Mantenimiento preventivo para prevenir problemas mayores",
      "Renovaciones y mejoras de espacios residenciales",
      "Servicios profesionales de pintura interior y exterior",
    ],
    services: [
      {
        title: "Reparaciones generales",
        description: "Servicio rápido y confiable para solucionar cualquier problema en su hogar.",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Mantenimiento preventivo",
        description: "Programas regulares para evitar costosas reparaciones en el futuro.",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Renovaciones",
        description: "Transforme y actualice los espacios de su hogar con nuestro servicio profesional.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Pintura y acabados",
        description: "Servicios de alta calidad que renuevan la apariencia de sus espacios.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "laboratorio-hormigon",
    title: "Laboratorio de Hormigón",
    description:
      "Análisis, pruebas y certificación de calidad para todo tipo de hormigón y materiales de construcción.",
    color: "from-green-500 to-green-600",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop",
    icon: "🧪",
    features: [
      "Análisis de resistencia y durabilidad del hormigón",
      "Certificaciones oficiales para proyectos de construcción",
      "Desarrollo de mezclas personalizadas según necesidades específicas",
      "Asesoramiento experto en materiales y aplicaciones",
    ],
    services: [
      {
        title: "Pruebas de resistencia",
        description: "Evaluación precisa de la resistencia y durabilidad de sus materiales de construcción.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Certificación de calidad",
        description: "Documentación oficial que avala la calidad de sus proyectos de construcción.",
        image: "https://images.unsplash.com/photo-1587582345426-bf07d528f471?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Desarrollo de mezclas",
        description: "Fórmulas personalizadas que se adaptan perfectamente a sus necesidades específicas.",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Consultoría técnica",
        description: "Asesoramiento profesional para optimizar el uso de materiales en sus proyectos.",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "asistencia-financiera",
    title: "Servicios de Asistencia Financiera",
    description: "Soluciones financieras para facilitar sus proyectos de construcción y mantenimiento.",
    color: "from-purple-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
    icon: "💰",
    features: [
      "Opciones de financiamiento adaptadas a su presupuesto",
      "Consultoría para optimizar la inversión en su proyecto",
      "Facilidades de pago flexibles para sus servicios",
      "Elaboración de presupuestos claros y transparentes",
    ],
    services: [
      {
        title: "Financiamiento de proyectos",
        description: "Alternativas accesibles para hacer realidad sus proyectos constructivos.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Asesoría financiera",
        description: "Orientación profesional para maximizar el retorno de su inversión.",
        image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Planes de pago",
        description: "Opciones flexibles que se adaptan a su capacidad de pago y necesidades.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Presupuestos detallados",
        description: "Información completa y transparente sobre los costos de su proyecto.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
]

export default function ServicesPageClient() {
  const headerRef = useRef(null)
  const servicesRef = useRef(null)
  const contactRef = useRef(null)

  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.1 })
  const isContactInView = useInView(contactRef, { once: true, amount: 0.1 })

  return (
    <div className="min-h-screen pt-16 pb-16 relative overflow-hidden">
      {/* Hero Section */}
      <div ref={headerRef} className="relative pt-20 pb-10 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <PageHeader
              title="Nuestros Servicios"
              description="Soluciones integrales para todas sus necesidades"
              className="text-center mb-8"
            />
          </motion.div>

          {/* Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden mb-10 shadow-xl"
          >
            <div className="relative h-[350px] md:h-[400px] w-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop"
                alt="Servicios de construcción"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertos en Soluciones Integrales</h2>
                  <p className="text-lg text-white/90 mb-6">
                    En SNG SERVIMAX ofrecemos servicios especializados de mantenimiento, laboratorio de hormigón y
                    asistencia financiera respaldados por años de experiencia.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="btn-gradient shadow-blue" asChild>
                      <Link href="/contacto#formulario">Solicitar Presupuesto</Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                      asChild
                    >
                      <a href="tel:+18494608077" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Llamar Ahora
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Services Section */}
      <section className="py-12 bg-gradient-to-b from-muted/10 to-transparent" ref={servicesRef} id="servicios">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              NUESTROS SERVICIOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">Soluciones a su Medida</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra nuestra amplia gama de servicios diseñados para satisfacer sus necesidades específicas
            </p>
          </motion.div>

          {/* Services grid */}
          <div className="space-y-24">
            {serviceCategories.map((category, categoryIndex) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
                >
                  <div>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${category.color}`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.id.replace(/-/g, " ").toUpperCase()}
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                    <p className="text-muted-foreground mb-6">{category.description}</p>

                    <div className="space-y-4 mb-6">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <Button className="btn-gradient shadow-blue" asChild>
                      <Link href={`/contacto#formulario?service=${category.id}`}>Solicitar información</Link>
                    </Button>
                  </div>
                  <div className="relative h-64 lg:h-auto rounded-xl overflow-hidden shadow-lg">
                    <ImageWithFallback
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-multiply opacity-40`}
                    ></div>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isServicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="h-full overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 card-glass">
                        <div className="relative h-48 w-full overflow-hidden">
                          <ImageWithFallback
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-white font-bold text-lg">{service.title}</h3>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="link" asChild className="p-0">
                            <Link
                              href={`/contacto#formulario?service=${encodeURIComponent(service.title)}`}
                              className="flex items-center gap-1 text-primary"
                            >
                              Solicitar este servicio <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section ref={contactRef} className="py-16 my-8 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">¿Necesita más información?</h3>
                <p className="text-muted-foreground mb-4">
                  Nuestro equipo está listo para responder todas sus preguntas y proporcionarle un presupuesto detallado
                  adaptado a sus necesidades específicas.
                </p>
                <Button className="btn-gradient shadow-blue w-full sm:w-auto" asChild>
                  <Link href="/contacto#formulario">Solicitar Presupuesto</Link>
                </Button>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-lg">Contacto Directo</h4>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+18494608077" className="hover:text-primary transition-colors">
                    849 460 8077
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:sngservimax@gmail.com" className="hover:text-primary transition-colors">
                    sngservimax@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <a href="/contacto#mapa" className="hover:text-primary transition-colors">
                    Manzana Q no. El casique de Veron, República Dominicana
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
