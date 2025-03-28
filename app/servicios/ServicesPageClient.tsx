"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Phone,
  Zap,
  Leaf,
  Building2,
  Wrench,
  Search,
  X,
  ChevronRight,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import ExternalImage from "@/components/external-image"
import ServiceCard from "@/components/service-card"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import Image from "next/image"

// Datos de servicios con estructura mejorada
const serviceCategories = [
  {
    id: "complementarios",
    title: "Servicios Complementarios en Construcción",
    description:
      "Soluciones especializadas para complementar sus proyectos de construcción con tecnología avanzada y personal experimentado.",
    icon: <Zap className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    features: [
      "Impermeabilización con tecnología de última generación",
      "Corte y demolición de precisión controlada por computadora",
      "Colocación de concreto con fórmulas personalizadas",
      "Alquiler de maquinaria pesada con operadores expertos",
    ],
    services: [
      {
        title: "Impermeabilización de estructuras",
        description:
          "Protección avanzada contra humedad y filtraciones para todo tipo de estructuras. Utilizamos materiales ecológicos y de alta durabilidad que garantizan una protección óptima por más tiempo.",
        image: "https://www.miguelcaceres.com/wp-content/uploads/2017/03/impermeabilizar-cubierta-scaled.jpg",
        features: [
          "Materiales de última generación",
          "Garantía extendida de hasta 10 años",
          "Inspección y diagnóstico gratuitos",
          "Soluciones personalizadas para cada tipo de estructura",
        ],
      },
      {
        title: "Corte y demolición de concreto",
        description:
          "Servicios precisos de corte y demolición con equipos especializados y tecnología de punta. Minimizamos el impacto en estructuras adyacentes y reducimos significativamente el polvo y ruido.",
        image: "https://images.unsplash.com/photo-1574009709841-7e4781f5afef?q=80&w=600&auto=format&fit=crop",
        features: [
          "Tecnología de corte de precisión",
          "Sistemas de contención de polvo",
          "Equipos con reducción de ruido",
          "Métodos que preservan la integridad estructural",
        ],
      },
      {
        title: "Colocación de concreto",
        description:
          "Instalación profesional de concreto con fórmulas personalizadas para cada proyecto. Nuestros especialistas diseñan mezclas que optimizan la resistencia y durabilidad según las necesidades específicas.",
        image: "https://c2.staticflickr.com/4/3217/2686572211_be9541455b_b.jpg",
        features: [
          "Mezclas personalizadas según requerimientos",
          "Técnicas avanzadas de acabado superficial",
          "Control de calidad en cada etapa",
          "Soluciones para condiciones climáticas extremas",
        ],
      },
      {
        title: "Alquiler de maquinaria pesada",
        description:
          "Amplia gama de maquinaria pesada de última generación disponible para sus proyectos, con opciones de alquiler flexibles y operadores certificados para garantizar eficiencia y seguridad.",
        image: "https://gruasyaparejos.com/wp-content/uploads/2019/04/maquinaria-pesada-1024x684.jpg",
        features: [
          "Flota modernizada con menos de 5 años de antigüedad",
          "Operadores certificados disponibles",
          "Mantenimiento preventivo incluido",
          "Planes de alquiler flexibles por hora, día o proyecto",
        ],
      },
    ],
  },
  {
    id: "innovacion",
    title: "Servicios de Innovación y Sostenibilidad",
    description:
      "Soluciones modernas y sostenibles para la industria de la construcción que reducen el impacto ambiental y optimizan recursos a largo plazo.",
    icon: <Leaf className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
    color: "bg-gradient-to-r from-green-500 to-green-600 text-white",
    features: [
      "Diseño y construcción de plantas de hormigón de bajo consumo",
      "Sistemas de tratamiento y reutilización de residuos",
      "Utilización de materiales eco-amigables certificados",
      "Optimización energética en proyectos de construcción",
    ],
    services: [
      {
        title: "Construcción de planta de Hormigón",
        description:
          "Diseño y construcción de plantas de hormigón eficientes y modernas. Implementamos tecnologías de vanguardia para maximizar la producción y minimizar el impacto ambiental con sistemas de filtración avanzados.",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=600&auto=format&fit=crop",
        features: [
          "Sistemas de dosificación automatizados",
          "Filtros de última generación para reducir emisiones",
          "Optimización de consumo energético",
          "Integración con sistemas de gestión digital",
        ],
      },
      {
        title: "Instalación de planta de Hormigón",
        description:
          "Instalación profesional de plantas de hormigón con los más altos estándares de eficiencia. Nuestro equipo especializado garantiza una puesta en marcha rápida y sin contratiempos del sistema completo.",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
        features: [
          "Instalación llave en mano",
          "Capacitación integral del personal",
          "Puesta en marcha optimizada",
          "Soporte técnico permanente post-instalación",
        ],
      },
      {
        title: "Gestión de residuos de construcción",
        description:
          "Manejo integral y sostenible de residuos de construcción con clasificación, tratamiento y reutilización. Implementamos sistemas circulares que convierten los desechos en recursos valiosos para nuevos proyectos.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
        features: [
          "Clasificación automatizada de materiales",
          "Reciclaje in-situ para reducir transporte",
          "Trazabilidad completa de residuos",
          "Certificación de gestión sostenible",
        ],
      },
    ],
  },
  {
    id: "empresas",
    title: "Servicios para Empresas y Proyectos Comerciales",
    description:
      "Soluciones integrales y personalizadas para empresas que buscan optimizar sus inversiones en infraestructura y construcción comercial.",
    icon: <Building2 className="h-8 w-8 text-primary" />,
    image: "https://dianasoluciones.com/wp-content/uploads/2019/04/15-de-Mayo-800x500-Compressed.jpg",
    color: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
    features: [
      "Consultoría estratégica para proyectos corporativos",
      "Optimización de costos y plazos de ejecución",
      "Adaptación de espacios comerciales existentes",
      "Coordinación integral con múltiples proveedores",
    ],
    services: [
      {
        title: "Asesoría empresarial",
        description:
          "Consultoría especializada para optimizar sus operaciones de construcción con metodologías lean y análisis de procesos. Nuestros expertos analizan en profundidad cada etapa para maximizar la eficiencia operativa.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
        features: [
          "Análisis de procesos constructivos",
          "Implementación de metodologías Lean Construction",
          "Optimización de flujos de trabajo",
          "Indicadores de desempeño personalizados",
        ],
      },
      {
        title: "Consultoría en optimización de costos",
        description:
          "Estrategias efectivas para reducir costos sin comprometer la calidad, basadas en análisis de valor y reingeniería de procesos. Identificamos oportunidades de ahorro en cada fase del proyecto.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
        features: [
          "Análisis de valor en materiales y procesos",
          "Reingeniería de especificaciones técnicas",
          "Estrategias de contratación optimizadas",
          "Planificación financiera de proyectos",
        ],
      },
      {
        title: "Diseño y planificación de proyectos",
        description:
          "Planificación detallada y diseño profesional para sus proyectos utilizando tecnologías BIM y simulación avanzada. Creamos modelos interactivos que permiten visualizar cada aspecto antes de la ejecución.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop",
        features: [
          "Modelado BIM integral",
          "Simulación 4D con cronogramas interactivos",
          "Detección temprana de interferencias",
          "Estimación precisa de costos y materiales",
        ],
      },
    ],
  },
  {
    id: "mantenimiento",
    title: "Servicios de Mantenimiento y Limpieza",
    description:
      "Mantenimiento profesional preventivo y correctivo para prolongar la vida útil de sus estructuras y mantener su valor a largo plazo.",
    icon: <Wrench className="h-8 w-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    color: "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
    features: [
      "Programas de mantenimiento preventivo personalizados",
      "Respuesta rápida para mantenimiento correctivo",
      "Limpieza especializada post-construcción",
      "Renovación y restauración de edificaciones",
    ],
    services: [
      {
        title: "Mantenimiento de edificaciones",
        description:
          "Servicios regulares de mantenimiento preventivo y correctivo para todo tipo de edificaciones, con programas personalizados según las necesidades específicas y uso de cada estructura.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
        features: [
          "Programas de mantenimiento predictivo",
          "Inspecciones periódicas con drones y cámaras térmicas",
          "Mantenimiento preventivo programado",
          "Informes detallados con recomendaciones",
        ],
      },
      {
        title: "Limpieza post-construcción",
        description:
          "Limpieza profesional especializada después de finalizar proyectos de construcción, utilizando equipos industriales y productos biodegradables que no dañan los acabados ni el medio ambiente.",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop",
        features: [
          "Equipos especializados para cada superficie",
          "Productos de limpieza ecológicos certificados",
          "Remoción de residuos de construcción",
          "Tratamiento especial para superficies delicadas",
        ],
      },
      {
        title: "Pintura, acabados y reparación",
        description:
          "Servicios profesionales de pintura, acabados y reparaciones generales con técnicas avanzadas y materiales de alta durabilidad que garantizan resultados excepcionales y duraderos.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
        features: [
          "Pinturas de bajo VOC y alta durabilidad",
          "Técnicas especializadas de aplicación",
          "Reparación de fisuras y daños estructurales menores",
          "Acabados personalizados y decorativos",
        ],
      },
    ],
  },
]

export default function ServicesPageClient() {
  const [activeCategory, setActiveCategory] = useState("complementarios")
  const [activeService, setActiveService] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredServices, setFilteredServices] = useState<any[]>([])

  const headerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const headerScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  const [benefitsRef, benefitsInView] = useIntersectionObserver({ threshold: 0.1 })
  const [featuredRef, featuredInView] = useIntersectionObserver({ threshold: 0.1 })
  const [ctaRef, ctaInView] = useIntersectionObserver({ threshold: 0.1 })

  // Actualizar lista filtrada basada en búsqueda
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredServices([])
      return
    }

    const results: any[] = []
    serviceCategories.forEach((category) => {
      category.services.forEach((service) => {
        if (
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            ...service,
            categoryId: category.id,
            categoryTitle: category.title,
          })
        }
      })
    })

    setFilteredServices(results)
  }, [searchTerm])

  // Manejar hash navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash && serviceCategories.find((cat) => cat.id === hash)) {
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

  const handleClearSearch = () => {
    setSearchTerm("")
  }

  const handleServiceClick = (categoryId: string, serviceTitle: string) => {
    setActiveCategory(categoryId)
    setActiveService(serviceTitle)

    // Scroll to category section
    setTimeout(() => {
      const element = document.getElementById(categoryId)
      if (element) {
        const headerOffset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Scroll to service card after a delay
        setTimeout(() => {
          const serviceElement = document.getElementById(`service-${serviceTitle.replace(/\s+/g, "-").toLowerCase()}`)
          if (serviceElement) {
            serviceElement.scrollIntoView({ behavior: "smooth", block: "center" })
            // Highlight the service card temporarily
            serviceElement.classList.add("ring-2", "ring-primary", "ring-offset-2")
            setTimeout(() => {
              serviceElement.classList.remove("ring-2", "ring-primary", "ring-offset-2")
            }, 2000)
          }
        }, 500)
      }
    }, 100)
  }

  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)

  return (
    <div className="min-h-screen pt-16 pb-16 relative overflow-hidden">
      {/* Encabezado con paralaje */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, scale: headerScale }}
        className="relative pt-20 pb-10 overflow-hidden"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <PageHeader
              title="Nuestros Servicios"
              description="Soluciones integrales y especializadas para todas sus necesidades de construcción"
              className="text-center mb-8"
            />
          </motion.div>

          {/* Hero section para servicios - Optimizado */}
          <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl">
            <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden">
              {/* Usar una imagen local en lugar de un gradiente */}
              <Image
                src="/images/construction-generic.jpg"
                alt="Servicios de construcción"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  className="max-w-2xl text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Expertos en Soluciones de Construcción</h2>
                  <p className="text-lg text-white/90 mb-6">
                    En SNG SERVIMAX ofrecemos una amplia gama de servicios especializados respaldados por más de 15 años
                    de experiencia y tecnología de vanguardia.
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
                </motion.div>
              </div>
            </div>
          </div>

          {/* Buscador de servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-6 text-lg shadow-md border-muted"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Resultados de búsqueda */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 max-h-[300px] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2"
              >
                <ScrollArea className="h-full max-h-[300px]">
                  {filteredServices.length > 0 ? (
                    <div className="space-y-2 p-2">
                      {filteredServices.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-muted p-3 rounded-md cursor-pointer"
                          onClick={() => {
                            handleServiceClick(service.categoryId, service.title)
                            setSearchTerm("")
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-md overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20" />
                                <ExternalImage src={service.image} alt={service.title} fill className="object-cover" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium">{service.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">{service.description}</p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {service.categoryTitle}
                              </Badge>
                            </div>
                            <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground self-center" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No se encontraron servicios que coincidan con su búsqueda
                    </div>
                  )}
                </ScrollArea>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Categorías de servicios destacadas con tarjetas mejoradas */}
      <section className="py-10" id="categorias">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center gradient-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nuestras Áreas de Servicio
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                features={service.features}
                image={service.image}
                color={service.color}
                icon={service.icon}
                href={`#${service.id}`}
                delay={index * 0.1}
                priority={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios de nuestros servicios con animaciones */}
      <section className="py-16 bg-gradient-to-b from-transparent to-muted/30">
        <div className="container mx-auto px-4" ref={benefitsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              BENEFICIOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">Por Qué Elegirnos</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combinamos experiencia, tecnología e innovación para ofrecer servicios excepcionales que marcan la
              diferencia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Calidad Garantizada",
                description: "Comprometidos con los más altos estándares en cada proyecto",
              },
              {
                icon: <Clock className="h-8 w-8 text-primary" />,
                title: "Puntualidad",
                description: "Cumplimos con los plazos establecidos para cada proyecto",
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Seguridad",
                description: "Priorizamos la seguridad en todas nuestras operaciones",
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-primary" />,
                title: "Profesionalismo",
                description: "Equipo altamente capacitado y con amplia experiencia",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios detallados con navegación por tabs */}
      <section className="py-16 relative" id="detalles">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              DETALLES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">Nuestros Servicios Especializados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nuestro catálogo completo de servicios diseñados para satisfacer las necesidades más exigentes
            </p>
          </motion.div>

          <Tabs
            defaultValue={activeCategory}
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 p-1 bg-muted/50 rounded-xl">
                {serviceCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    id={category.id}
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-md rounded-lg"
                  >
                    <span className="mr-2 text-xl">{category.icon}</span>
                    <span className="hidden md:inline">{category.title.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="focus:outline-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Modificar la sección de detalles para usar divs con colores en lugar de imágenes */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl shadow-lg p-8">
                    <div>
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full text-primary text-sm font-medium mb-4">
                        {category.icon} {category.id.toUpperCase()}
                      </div>
                      <h2 className="text-3xl font-bold mb-4 gradient-heading">{category.title}</h2>
                      <p className="text-muted-foreground mb-6">{category.description}</p>

                      <div className="space-y-4">
                        {category.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                          >
                            <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{feature}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Button className="btn-gradient shadow-blue" asChild>
                          <Link href={`/contacto#formulario?service=${category.id}`}>Solicitar información</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={`tel:+15551234567`} className="flex items-center gap-2">
                            <Phone className="h-4 w-4 mr-2" /> Llamar ahora
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="relative h-64 lg:h-auto rounded-xl overflow-hidden shadow-lg">
                      {/* Usar imagen externa en lugar de un div de color */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20" />
                      <ExternalImage src={category.image} alt={category.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent mix-blend-overlay"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, index) => (
                      <motion.div
                        key={index}
                        id={`service-${service.title.replace(/\s+/g, "-").toLowerCase()}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="transition-all duration-300 rounded-xl overflow-hidden"
                      >
                        <Card className="h-full card-glass hover:shadow-lg transition-shadow border-none hover:-translate-y-1">
                          <div className="relative h-48 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20" />
                            <ExternalImage
                              src={service.image || "/placeholder.svg"}
                              alt={service.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-4">
                              <h3 className="text-white font-bold text-lg drop-shadow-md">{service.title}</h3>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{service.description}</p>
                            <div className="space-y-2">
                              {service.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <p className="text-xs text-muted-foreground">{feature}</p>
                                </div>
                              ))}
                              {service.features.length > 2 && (
                                <p className="text-xs text-primary">
                                  + {service.features.length - 2} características más
                                </p>
                              )}
                            </div>
                            <Button variant="link" asChild className="mt-4 p-0">
                              <Link
                                href={`/contacto#formulario?service=${encodeURIComponent(service.title)}`}
                                className="flex items-center gap-1 text-primary"
                              >
                                Solicitar este servicio <ArrowRight className="h-3 w-3" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 text-center"
                  >
                    <Link
                      href="/contacto#formulario"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Solicitar presupuesto para estos servicios{" "}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Servicios destacados y casos de éxito */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto px-4" ref={featuredRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              DESTACADOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">Servicios Premiados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conozca los servicios que nos han diferenciado en el mercado y por los que somos reconocidos
            </p>
          </motion.div>

          {/* Modificar la sección de servicios destacados para usar divs con colores en lugar de imágenes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tarjetas de testimonios y casos de éxito */}
            {[
              {
                title: "Impermeabilización Avanzada",
                project: "Torres Residenciales Elite",
                description:
                  "Implementamos un sistema de impermeabilización de última generación que extendió la vida útil de la estructura por más de 20 años.",
                color: "bg-gradient-to-r from-blue-500 to-blue-600",
                testimonial:
                  "El trabajo realizado superó todas nuestras expectativas. Desde la instalación no hemos tenido ningún problema con filtraciones.",
                client: "Carlos Méndez, Director de Operaciones",
              },
              {
                title: "Planta de Hormigón Ecológica",
                project: "Centro Comercial Metrópolis",
                description:
                  "Diseñamos e instalamos una planta de hormigón con filtros avanzados que reduce las emisiones en un 80% comparado con sistemas tradicionales.",
                color: "bg-gradient-to-r from-green-500 to-green-600",
                testimonial:
                  "La eficiencia y el compromiso ambiental de SNG SERVIMAX fueron decisivos para lograr nuestra certificación LEED.",
                client: "Laura Sánchez, Gerente de Sostenibilidad",
              },
              {
                title: "Consultoría de Optimización",
                project: "Complejo Empresarial Torres Norte",
                description:
                  "Implementamos estrategias de optimización que redujeron los costos del proyecto en un 15% sin comprometer la calidad ni los plazos.",
                color: "bg-gradient-to-r from-purple-500 to-purple-600",
                testimonial:
                  "Su enfoque analítico y soluciones innovadoras transformaron completamente la eficiencia financiera del proyecto.",
                client: "Miguel Rodríguez, CFO",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  {/* Reemplazar la imagen con un div de color */}
                  <div className={`absolute inset-0 ${item.color}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.project}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                  <div className="bg-muted/30 p-3 rounded-lg mb-4">
                    <p className="text-sm italic">"{item.testimonial}"</p>
                    <p className="text-xs text-right mt-2 font-medium">— {item.client}</p>
                  </div>
                  <Button variant="link" asChild className="p-0">
                    <Link
                      href={`/contacto#formulario?service=${encodeURIComponent(item.title)}`}
                      className="flex items-center text-primary gap-1"
                    >
                      Solicitar información <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA para servicio personalizado */}
      <section ref={ctaRef} className="py-16 relative overflow-hidden" id="servicio-personalizado">
        <div className="container mx-auto px-4">
          {/* Modificar la sección CTA para usar un div con gradiente en lugar de imagen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden shadow-xl"
          >
            <div className="relative h-[300px] w-full">
              {/* Usar una imagen local en lugar de un gradiente */}
              <Image
                src="/images/construction-generic.jpg"
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
                    Si no encuentra el servicio que necesita o requiere una solución adaptada específicamente a su
                    proyecto, nuestro equipo de expertos está listo para desarrollar una propuesta a medida.
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
      </section>
    </div>
  )
}

