"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Phone } from "lucide-react"
import Link from "next/link"

const serviceCategories = [
  {
    id: "complementarios",
    title: "Servicios Complementarios en Construcción",
    description: "Soluciones especializadas para complementar sus proyectos de construcción",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    icon: "🏗️",
    color: "from-blue-500/20 to-blue-600/20",
    services: [
      {
        title: "Impermeabilización de estructuras",
        description:
          "Protección contra humedad y filtraciones para todo tipo de estructuras. Utilizamos materiales de alta calidad y técnicas avanzadas para garantizar resultados duraderos.",
        image: "https://www.miguelcaceres.com/wp-content/uploads/2017/03/impermeabilizar-cubierta-scaled.jpg",
      },
      {
        title: "Corte y demolición de concreto",
        description:
          "Servicios precisos de corte y demolición con equipos especializados. Nuestro equipo está capacitado para realizar trabajos de alta precisión minimizando el impacto en estructuras adyacentes.",
        image: "https://images.unsplash.com/photo-1574009709841-7e4781f5afef?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Colocación de concreto",
        description:
          "Instalación profesional de concreto para todo tipo de proyectos. Garantizamos un acabado perfecto y una resistencia óptima para sus estructuras.",
        image: "https://c2.staticflickr.com/4/3217/2686572211_be9541455b_b.jpg",
      },
      {
        title: "Alquiler de maquinaria pesada",
        description:
          "Amplia gama de maquinaria pesada disponible para sus proyectos. Ofrecemos equipos modernos y bien mantenidos con opciones de alquiler flexibles.",
        image: "https://th.bing.com/th/id/R.60d4c8151528fb202e628f6302e2656d?rik=7pijOO2o1M3pYQ&pid=ImgRaw&r=0",
      },
    ],
  },
  {
    id: "innovacion",
    title: "Servicios de Innovación y Sostenibilidad",
    description: "Soluciones modernas y sostenibles para la industria de la construcción",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
    icon: "🌱",
    color: "from-green-500/20 to-green-600/20",
    services: [
      {
        title: "Construcción de planta de Hormigón",
        description:
          "Diseño y construcción de plantas de hormigón eficientes y modernas. Implementamos las últimas tecnologías para maximizar la producción y minimizar el impacto am  Implementamos las últimas tecnologías para maximizar la producción y minimizar el impacto ambiental.",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Instalación de planta de Hormigón",
        description:
          "Instalación profesional de plantas de hormigón con los más altos estándares. Nuestro equipo especializado garantiza una instalación eficiente y segura.",
        image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Gestión de residuos de construcción",
        description:
          "Manejo responsable y sostenible de residuos de construcción. Implementamos prácticas de reciclaje y reutilización para minimizar el impacto ambiental.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "empresas",
    title: "Servicios para Empresas y Proyectos Comerciales",
    description: "Soluciones integrales para empresas y proyectos comerciales",
    image: "https://th.bing.com/th/id/OIP.qmvBbl4bgpNIlsJ_0fbKbQHaEo?rs=1&pid=ImgDetMain",
    icon: "🏢",
    color: "from-purple-500/20 to-purple-600/20",
    services: [
      {
        title: "Asesoría empresarial",
        description:
          "Consultoría especializada para optimizar sus operaciones de construcción. Nuestros expertos analizan sus procesos y proponen mejoras para aumentar la eficiencia y rentabilidad.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Consultoría en optimización de costos",
        description:
          "Estrategias efectivas para reducir costos sin comprometer la calidad. Identificamos oportunidades de ahorro y proponemos soluciones innovadoras.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Diseño y planificación de proyectos",
        description:
          "Planificación detallada y diseño profesional para sus proyectos. Utilizamos software avanzado para crear diseños precisos y planificaciones realistas.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "mantenimiento",
    title: "Servicios de Mantenimiento y Limpieza",
    description: "Mantenimiento profesional para prolongar la vida útil de sus estructuras",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    icon: "🧹",
    color: "from-amber-500/20 to-amber-600/20",
    services: [
      {
        title: "Mantenimiento de edificaciones",
        description:
          "Servicios regulares de mantenimiento para todo tipo de edificaciones. Programas personalizados para prevenir problemas y mantener sus instalaciones en óptimas condiciones.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Limpieza post-construcción",
        description:
          "Limpieza profesional después de finalizar proyectos de construcción. Dejamos sus espacios impecables y listos para ser utilizados.",
        image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop",
      },
      {
        title: "Pintura, acabados y reparación",
        description:
          "Servicios de pintura, acabados y reparaciones generales. Utilizamos materiales de alta calidad para garantizar resultados duraderos y estéticos.",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
]

export default function ServiceCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("complementarios")

  // Handle hash navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash && serviceCategories.find((cat) => cat.id === hash)) {
      setActiveTab(hash)
    }
  }, [])

  return (
    <div ref={ref} className="space-y-16">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 p-1 bg-muted/50 rounded-xl">
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

        {serviceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full text-primary text-sm font-medium mb-4">
                    {category.icon} {category.id.toUpperCase()}
                  </div>
                  <h2 className="text-3xl font-bold mb-4 gradient-heading">{category.title}</h2>
                  <p className="text-muted-foreground mb-6">{category.description}</p>

                  <div className="space-y-4">
                    {category.services.map((service, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground">{service.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button className="btn-gradient shadow-blue" asChild>
                      <Link href={`/contacto#formulario?service=${category.id}`}>Solicitar información</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`tel:+15551234567`}>
                        <Phone className="h-4 w-4 mr-2" /> Llamar ahora
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 lg:h-auto rounded-xl overflow-hidden shadow-lg">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-multiply`}></div>
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full card-glass hover:shadow-lg transition-shadow border-none">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
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
                      <CardHeader>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{service.description}</CardDescription>
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

              <div className="mt-12 text-center">
                <Link
                  href="/contacto#formulario"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Solicitar presupuesto para estos servicios <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

