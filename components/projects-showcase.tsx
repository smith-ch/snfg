"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

const projects = [
  {
    title: "Edificio Residencial Torres del Sol",
    description:
      "Construcción de un complejo residencial de 120 apartamentos con áreas comunes y estacionamiento subterráneo.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    category: "Construcción Residencial",
    year: "2023",
    location: "Ciudad Central",
    features: ["120 apartamentos", "Áreas comunes", "Estacionamiento subterráneo", "Piscina"],
    detailsLink: "/proyectos/torres-del-sol",
    galleryLink: "/proyectos/torres-del-sol/galeria",
  },
  {
    title: "Centro Comercial Metropolis",
    description: "Impermeabilización y mantenimiento integral de un centro comercial de 50,000 m² en operación.",
    image: "https://images.unsplash.com/photo-1604754742629-3e0498a7dc4d?q=80&w=800&auto=format&fit=crop",
    category: "Impermeabilización",
    year: "2022",
    location: "Zona Norte",
    features: ["50,000 m²", "Mantenimiento integral", "Impermeabilización", "Renovación"],
    detailsLink: "/proyectos/metropolis",
    galleryLink: "/proyectos/metropolis/galeria",
  },
  {
    title: "Planta Industrial Tecnova",
    description:
      "Instalación de planta de hormigón y gestión de residuos para una fábrica de componentes electrónicos.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop",
    category: "Plantas de Hormigón",
    year: "2021",
    location: "Parque Industrial Este",
    features: ["Planta de hormigón", "Gestión de residuos", "Optimización de procesos", "Sostenibilidad"],
    detailsLink: "/proyectos/tecnova",
    galleryLink: "/proyectos/tecnova/galeria",
  },
]

export default function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentProject, setCurrentProject] = useState(0)

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleViewDetails = (project) => {
    // For now, we'll just show a toast since the actual project pages don't exist yet
    toast({
      title: "Navegando a detalles del proyecto",
      description: `Viendo detalles de: ${project.title}`,
    })
  }

  const handleViewGallery = (project) => {
    // For now, we'll just show a toast since the actual gallery pages don't exist yet
    toast({
      title: "Abriendo galería",
      description: `Viendo galería de: ${project.title}`,
    })
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
      <div className="absolute inset-0 pattern-dots opacity-5 z-0"></div>

      {/* Animated shapes */}
      <motion.div
        className="absolute top-20 right-20 w-40 h-40 border border-primary/10 rounded-full z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-20 w-60 h-60 border border-blue-500/10 rounded-full z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            PROYECTOS DESTACADOS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">Nuestro Trabajo Habla por Nosotros</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conozca algunos de nuestros proyectos más destacados y cómo hemos ayudado a nuestros clientes a alcanzar sus
            objetivos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`project-image-${currentProject}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={projects[currentProject].image || "/placeholder.svg"}
                    alt={projects[currentProject].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                </motion.div>
              </AnimatePresence>

              {/* Project navigation */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm border-white/10 hover:bg-white/30 text-white rounded-full"
                  onClick={prevProject}
                  aria-label="Proyecto anterior"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white/20 backdrop-blur-sm border-white/10 hover:bg-white/30 text-white rounded-full"
                  onClick={nextProject}
                  aria-label="Proyecto siguiente"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Project counter */}
              <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                {currentProject + 1} / {projects.length}
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary/80 hover:bg-primary text-white">{projects[currentProject].category}</Badge>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`project-content-${currentProject}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-4">{projects[currentProject].year}</Badge>
                <h3 className="text-3xl font-bold mb-4 gradient-heading">{projects[currentProject].title}</h3>
                <p className="text-muted-foreground mb-6">{projects[currentProject].description}</p>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                    <span className="font-medium">Ubicación:</span>
                    <span className="text-muted-foreground">{projects[currentProject].location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {projects[currentProject].features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-muted/50">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="btn-gradient shadow-blue group"
                    onClick={() => handleViewDetails(projects[currentProject])}
                  >
                    <span className="flex items-center gap-2">
                      Ver Detalles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="group"
                    onClick={() => handleViewGallery(projects[currentProject])}
                  >
                    <span className="flex items-center gap-2">
                      Ver Galería <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <Button
            size="lg"
            className="group"
            onClick={() => {
              toast({
                title: "Navegando a proyectos",
                description: "Viendo todos los proyectos",
              })
            }}
          >
            <span className="flex items-center gap-2">
              Ver Todos los Proyectos{" "}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

