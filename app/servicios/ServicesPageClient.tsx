"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ServiceCategories from "@/components/service-categories"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Clock, Award, Phone, Zap, Leaf, Building2, Wrench } from "lucide-react"
import Image from "next/image"

export default function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState("complementarios")

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      setActiveCategory(hash)

      // Scroll to the section after a short delay to ensure rendering
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          const headerOffset = 100
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      }, 300)
    }
  }, [])

  const serviceHighlights = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Servicios Complementarios",
      description: "Impermeabilización, corte y demolición, colocación de concreto y más",
      link: "#complementarios",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop",
      color: "from-blue-500/10 to-blue-600/10",
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Innovación y Sostenibilidad",
      description: "Soluciones modernas y sostenibles para la industria de la construcción",
      link: "#innovacion",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=600&auto=format&fit=crop",
      color: "from-green-500/10 to-green-600/10",
    },
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Servicios para Empresas",
      description: "Asesoría, consultoría y planificación para proyectos comerciales",
      link: "#empresas",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      color: "from-purple-500/10 to-purple-600/10",
    },
    {
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "Mantenimiento y Limpieza",
      description: "Servicios para prolongar la vida útil de sus estructuras",
      link: "#mantenimiento",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      color: "from-amber-500/10 to-amber-600/10",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 pattern-dots opacity-5 -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Nuestros Servicios"
            description="Soluciones integrales para todas sus necesidades de construcción"
            className="text-center mb-12"
          />

          {/* Hero section for services */}
          <div className="relative rounded-2xl overflow-hidden mb-16 shadow-xl">
            <div className="relative h-[400px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop"
                alt="Servicios de construcción"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertos en Soluciones de Construcción</h2>
                  <p className="text-lg text-white/90 mb-6">
                    En SNG SERVIMAX ofrecemos una amplia gama de servicios especializados para satisfacer todas sus
                    necesidades en el sector de la construcción.
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
                      <a href="tel:+15551234567" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Llamar Ahora
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service highlights with images */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center gradient-heading">Nuestras Áreas de Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceHighlights.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={service.link} className="block h-full">
                    <div className="relative h-full overflow-hidden rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-2">
                            {service.icon}
                          </div>
                          <h3 className="text-white text-xl font-bold">{service.title}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex items-center text-primary font-medium">
                          Ver detalles{" "}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why choose us section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Calidad Garantizada</h3>
              <p className="text-muted-foreground text-sm">
                Comprometidos con los más altos estándares en cada proyecto
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Puntualidad</h3>
              <p className="text-muted-foreground text-sm">Cumplimos con los plazos establecidos para cada proyecto</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Seguridad</h3>
              <p className="text-muted-foreground text-sm">Priorizamos la seguridad en todas nuestras operaciones</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Profesionalismo</h3>
              <p className="text-muted-foreground text-sm">Equipo altamente capacitado y con amplia experiencia</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Detailed service categories */}
        <ServiceCategories />

        {/* Why choose our services section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-center gradient-heading">¿Por qué elegir nuestros servicios?</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop"
                alt="Equipo profesional"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h4 className="text-white text-2xl font-bold mb-2">Experiencia y Profesionalismo</h4>
                <p className="text-white/80">Más de 15 años de experiencia en el sector</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">01</div>
                <h4 className="text-xl font-bold mb-2">Experiencia y Profesionalismo</h4>
                <p className="text-muted-foreground">
                  Contamos con años de experiencia en el sector y un equipo de profesionales altamente capacitados.
                </p>
                <Link
                  href="/nosotros#equipo"
                  className="inline-flex items-center gap-1 mt-4 text-primary hover:underline"
                >
                  Conocer nuestro equipo <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">02</div>
                <h4 className="text-xl font-bold mb-2">Calidad Garantizada</h4>
                <p className="text-muted-foreground">
                  Utilizamos materiales de primera calidad y aplicamos las mejores prácticas en todos nuestros
                  proyectos.
                </p>
                <Link
                  href="/nosotros#politicas"
                  className="inline-flex items-center gap-1 mt-4 text-primary hover:underline"
                >
                  Ver política de calidad <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">03</div>
              <h4 className="text-xl font-bold mb-2">Soluciones Personalizadas</h4>
              <p className="text-muted-foreground">
                Adaptamos nuestros servicios a las necesidades específicas de cada cliente y proyecto.
              </p>
              <Link
                href="/contacto#formulario"
                className="inline-flex items-center gap-1 mt-4 text-primary hover:underline"
              >
                Solicitar consulta <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">04</div>
              <h4 className="text-xl font-bold mb-2">Tecnología Avanzada</h4>
              <p className="text-muted-foreground">
                Utilizamos las últimas tecnologías y equipos para garantizar resultados óptimos en cada proyecto.
              </p>
              <Link
                href="/servicios#innovacion"
                className="inline-flex items-center gap-1 mt-4 text-primary hover:underline"
              >
                Ver innovaciones <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">05</div>
              <h4 className="text-xl font-bold mb-2">Compromiso con el Cliente</h4>
              <p className="text-muted-foreground">
                Nos comprometemos a superar las expectativas de nuestros clientes en cada proyecto.
              </p>
              <Link href="/contacto" className="inline-flex items-center gap-1 mt-4 text-primary hover:underline">
                Contactar ahora <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" className="btn-gradient shadow-blue">
              <Link href="/contacto#formulario" className="flex items-center gap-2">
                Solicitar presupuesto <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Custom service CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 relative rounded-xl overflow-hidden shadow-xl"
          id="servicio-personalizado"
        >
          <div className="relative h-[300px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1920&auto=format&fit=crop"
              alt="Servicio personalizado"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white p-8">
                <h3 className="text-3xl font-bold mb-4">¿Necesita un servicio personalizado?</h3>
                <p className="text-lg text-white/90 mb-6">
                  Si no encuentra el servicio que necesita o requiere una solución personalizada, no dude en
                  contactarnos. Estaremos encantados de ayudarle a desarrollar una solución a medida para su proyecto.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="btn-gradient shadow-blue" asChild>
                    <Link href="/contacto#formulario">Contactar ahora</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                    asChild
                  >
                    <a href="tel:+15551234567" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Llamar ahora
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

