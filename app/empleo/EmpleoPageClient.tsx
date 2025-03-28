"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Heart,
  HelpCircle,
  MapPin,
  Search,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import CurriculumForm from "@/components/curriculum-form"

// Datos de ejemplo para las vacantes
const vacantes = [
  {
    id: "ing-civil",
    titulo: "Ingeniero Civil",
    departamento: "Proyectos",
    ubicacion: "Ciudad Central",
    tipo: "Tiempo Completo",
    experiencia: "3-5 años",
    descripcion:
      "Buscamos un Ingeniero Civil con experiencia en gestión de proyectos de construcción. Será responsable de supervisar la ejecución de proyectos, coordinar con contratistas y asegurar el cumplimiento de los estándares de calidad.",
    requisitos: [
      "Título en Ingeniería Civil",
      "3-5 años de experiencia en proyectos de construcción",
      "Conocimiento de normativas de construcción",
      "Habilidades de gestión de proyectos",
      "Manejo de software de diseño (AutoCAD, Revit)",
    ],
    responsabilidades: [
      "Supervisar la ejecución de proyectos de construcción",
      "Coordinar con contratistas y proveedores",
      "Asegurar el cumplimiento de los estándares de calidad",
      "Elaborar informes de avance de proyectos",
      "Gestionar recursos y presupuestos",
    ],
    fechaPublicacion: "2025-03-15",
    destacado: true,
  },
  {
    id: "arquitecto",
    titulo: "Arquitecto",
    departamento: "Diseño",
    ubicacion: "Ciudad Central",
    tipo: "Tiempo Completo",
    experiencia: "2-4 años",
    descripcion:
      "Buscamos un Arquitecto creativo y detallista para unirse a nuestro equipo de diseño. Será responsable de desarrollar conceptos arquitectónicos, elaborar planos y coordinar con el equipo de ingeniería.",
    requisitos: [
      "Título en Arquitectura",
      "2-4 años de experiencia en diseño arquitectónico",
      "Dominio de software de diseño (AutoCAD, Revit, SketchUp)",
      "Conocimiento de normativas de construcción",
      "Habilidades de comunicación y trabajo en equipo",
    ],
    responsabilidades: [
      "Desarrollar conceptos arquitectónicos",
      "Elaborar planos y documentación técnica",
      "Coordinar con el equipo de ingeniería",
      "Realizar visitas a obra para supervisión",
      "Atender requerimientos de clientes",
    ],
    fechaPublicacion: "2025-03-10",
    destacado: false,
  },
  {
    id: "tecnico-seguridad",
    titulo: "Técnico en Seguridad y Salud Ocupacional",
    departamento: "Seguridad",
    ubicacion: "Zona Norte",
    tipo: "Tiempo Completo",
    experiencia: "2-3 años",
    descripcion:
      "Buscamos un Técnico en Seguridad y Salud Ocupacional para garantizar el cumplimiento de las normativas de seguridad en nuestros proyectos. Será responsable de implementar programas de prevención de riesgos y capacitar al personal.",
    requisitos: [
      "Título en Seguridad y Salud Ocupacional o afines",
      "2-3 años de experiencia en el sector de la construcción",
      "Conocimiento de normativas de seguridad",
      "Certificación en primeros auxilios",
      "Licencia de conducir",
    ],
    responsabilidades: [
      "Implementar programas de prevención de riesgos",
      "Realizar inspecciones de seguridad en obra",
      "Capacitar al personal en temas de seguridad",
      "Investigar incidentes y accidentes",
      "Elaborar informes de seguridad",
    ],
    fechaPublicacion: "2025-03-05",
    destacado: false,
  },
  {
    id: "supervisor-obra",
    titulo: "Supervisor de Obra",
    departamento: "Operaciones",
    ubicacion: "Parque Industrial Este",
    tipo: "Tiempo Completo",
    experiencia: "4-6 años",
    descripcion:
      "Buscamos un Supervisor de Obra con experiencia en proyectos de construcción industrial. Será responsable de supervisar la ejecución de obras, coordinar equipos de trabajo y asegurar el cumplimiento de plazos y calidad.",
    requisitos: [
      "Título en Ingeniería Civil o Construcción",
      "4-6 años de experiencia en supervisión de obras",
      "Conocimiento de procesos constructivos",
      "Habilidades de liderazgo y gestión de equipos",
      "Disponibilidad para trabajar en campo",
    ],
    responsabilidades: [
      "Supervisar la ejecución de obras",
      "Coordinar equipos de trabajo",
      "Controlar avances y calidad de obra",
      "Gestionar recursos y materiales",
      "Elaborar informes de avance",
    ],
    fechaPublicacion: "2025-03-01",
    destacado: true,
  },
  {
    id: "asistente-administrativo",
    titulo: "Asistente Administrativo",
    departamento: "Administración",
    ubicacion: "Ciudad Central",
    tipo: "Tiempo Completo",
    experiencia: "1-2 años",
    descripcion:
      "Buscamos un Asistente Administrativo para apoyar en las tareas administrativas de la empresa. Será responsable de gestionar documentación, atender llamadas y coordinar agendas.",
    requisitos: [
      "Estudios en Administración o afines",
      "1-2 años de experiencia en posiciones similares",
      "Dominio de herramientas ofimáticas",
      "Habilidades de organización y atención al detalle",
      "Excelente comunicación oral y escrita",
    ],
    responsabilidades: [
      "Gestionar documentación administrativa",
      "Atender llamadas y correos electrónicos",
      "Coordinar agendas y reuniones",
      "Apoyar en la gestión de proveedores",
      "Realizar tareas administrativas generales",
    ],
    fechaPublicacion: "2025-02-25",
    destacado: false,
  },
]

// Beneficios de trabajar en la empresa
const beneficios = [
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    titulo: "Desarrollo Profesional",
    descripcion: "Oportunidades de crecimiento y capacitación continua para potenciar tu carrera.",
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    titulo: "Seguro Médico",
    descripcion: "Plan de salud completo para ti y tu familia, incluyendo cobertura dental y visual.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    titulo: "Horario Flexible",
    descripcion: "Balance entre vida personal y profesional con horarios adaptables a tus necesidades.",
  },
  {
    icon: <Building2 className="h-10 w-10 text-primary" />,
    titulo: "Ambiente Laboral",
    descripcion: "Cultura de trabajo colaborativa y positiva en instalaciones modernas y confortables.",
  },
]

// Preguntas frecuentes
const faq = [
  {
    pregunta: "¿Cómo es el proceso de selección?",
    respuesta:
      "Nuestro proceso de selección consta de varias etapas: revisión de CV, entrevista telefónica, entrevista presencial con RRHH, entrevista técnica con el departamento correspondiente y, finalmente, oferta laboral. El proceso completo suele durar entre 2 y 3 semanas.",
  },
  {
    pregunta: "¿Ofrecen oportunidades para recién graduados?",
    respuesta:
      "Sí, contamos con programas de pasantías y posiciones junior para recién graduados. Valoramos el talento joven y ofrecemos mentorías para ayudar en el desarrollo profesional de los nuevos talentos.",
  },
  {
    pregunta: "¿Tienen programas de capacitación?",
    respuesta:
      "Sí, ofrecemos programas de capacitación continua para todos nuestros colaboradores. Estos incluyen cursos técnicos, certificaciones profesionales y desarrollo de habilidades blandas.",
  },
  {
    pregunta: "¿Cuánto tiempo tarda el proceso de contratación?",
    respuesta:
      "Una vez seleccionado el candidato final, el proceso de contratación suele tomar entre 1 y 2 semanas, dependiendo de la verificación de referencias y la disponibilidad del candidato.",
  },
  {
    pregunta: "¿Ofrecen trabajo remoto o híbrido?",
    respuesta:
      "Dependiendo del puesto, ofrecemos modalidades de trabajo híbrido que combinan días presenciales y remotos. Para posiciones de campo, como supervisores de obra, se requiere presencia física en los proyectos.",
  },
]

export default function EmpleoPageClient() {
  const [activeTab, setActiveTab] = useState("vacantes")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVacantes, setFilteredVacantes] = useState(vacantes)
  const [selectedVacante, setSelectedVacante] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Filtrar vacantes según término de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredVacantes(vacantes)
    } else {
      const filtered = vacantes.filter(
        (vacante) =>
          vacante.titulo.toLowerCase().includes(term) ||
          vacante.departamento.toLowerCase().includes(term) ||
          vacante.ubicacion.toLowerCase().includes(term),
      )
      setFilteredVacantes(filtered)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Oportunidades de Trabajo"
            description="Únase a nuestro equipo y desarrolle su carrera profesional con nosotros"
            className="text-center mb-12"
          />
        </motion.div>

        {/* Sección de introducción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                alt="Equipo de trabajo SNG SERVIMAX"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 max-w-xs text-white">
                <h3 className="text-2xl font-bold mb-2">Construyendo juntos el futuro</h3>
                <p className="text-white/90">Más de 50 profesionales trabajando en proyectos innovadores</p>
              </div>
            </div>

            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                TRABAJA CON NOSOTROS
              </div>
              <h2 className="text-3xl font-bold mb-4 gradient-heading">¿Por qué unirse a SNG SERVIMAX?</h2>
              <p className="text-muted-foreground mb-6">
                En SNG SERVIMAX valoramos el talento, la dedicación y el compromiso. Buscamos profesionales apasionados
                que quieran crecer con nosotros y contribuir al éxito de nuestros proyectos. Ofrecemos un ambiente de
                trabajo colaborativo, oportunidades de desarrollo profesional y beneficios competitivos.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Crecimiento profesional:</span> Oportunidades de
                    desarrollo y capacitación continua.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Proyectos desafiantes:</span> Participa en proyectos
                    innovadores y de gran impacto.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Equipo colaborativo:</span> Forma parte de un equipo
                    multidisciplinario de profesionales.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1" />
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Beneficios competitivos:</span> Paquete de
                    compensación atractivo y beneficios adicionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs de contenido */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
            <TabsTrigger value="vacantes" className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4" /> Vacantes Disponibles
            </TabsTrigger>
            <TabsTrigger value="beneficios" className="flex items-center gap-2">
              <Star className="h-4 w-4" /> Beneficios
            </TabsTrigger>
            <TabsTrigger value="postulacion" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Postulación
            </TabsTrigger>
          </TabsList>

          {/* Contenido: Vacantes */}
          <TabsContent value="vacantes">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Lista de vacantes */}
              <div className="lg:col-span-1">
                <div className="card-glass p-6 rounded-xl mb-6">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar vacantes..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>

                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredVacantes.length > 0 ? (
                      filteredVacantes.map((vacante) => (
                        <div
                          key={vacante.id}
                          className={`p-4 rounded-lg cursor-pointer transition-all ${
                            selectedVacante === vacante.id
                              ? "bg-primary/10 border-l-4 border-primary"
                              : "bg-muted/50 hover:bg-muted"
                          }`}
                          onClick={() => setSelectedVacante(vacante.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold">{vacante.titulo}</h3>
                            {vacante.destacado && <Badge className="bg-primary/20 text-primary">Destacado</Badge>}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Building2 className="h-3 w-3 mr-1" /> {vacante.departamento}
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1" /> {vacante.ubicacion}
                          </div>
                          <div className="flex items-center text-sm">
                            <Badge variant="outline" className="mr-2">
                              {vacante.tipo}
                            </Badge>
                            <Badge variant="outline">{vacante.experiencia}</Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No se encontraron vacantes que coincidan con su búsqueda.
                        </p>
                        <Button variant="link" onClick={() => setSearchTerm("")}>
                          Ver todas las vacantes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Detalle de la vacante seleccionada */}
              <div className="lg:col-span-2">
                {selectedVacante ? (
                  <div className="card-glass p-6 rounded-xl shadow-lg">
                    {vacantes
                      .filter((v) => v.id === selectedVacante)
                      .map((vacante) => (
                        <div key={vacante.id}>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h2 className="text-2xl font-bold mb-2">{vacante.titulo}</h2>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Building2 className="h-4 w-4 mr-1" /> {vacante.departamento}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" /> {vacante.ubicacion}
                                </div>
                                <Badge variant="outline">{vacante.tipo}</Badge>
                                <Badge variant="outline">{vacante.experiencia}</Badge>
                              </div>
                            </div>
                            {vacante.destacado && <Badge className="bg-primary/20 text-primary">Destacado</Badge>}
                          </div>

                          <div className="mb-6">
                            <h3 className="text-lg font-bold mb-2">Descripción del puesto</h3>
                            <p className="text-muted-foreground">{vacante.descripcion}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <h3 className="text-lg font-bold mb-3">Requisitos</h3>
                              <ul className="space-y-2">
                                {vacante.requisitos.map((req, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold mb-3">Responsabilidades</h3>
                              <ul className="space-y-2">
                                {vacante.responsabilidades.map((resp, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-3 mt-6">
                            <Button className="btn-gradient shadow-blue" onClick={() => setActiveTab("postulacion")}>
                              Postular a esta vacante
                            </Button>
                            <Button variant="outline" asChild>
                              <Link href="/contacto">Solicitar más información</Link>
                            </Button>
                          </div>

                          <div className="mt-6 pt-4 border-t border-border">
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                              <span>Publicado: {new Date(vacante.fechaPublicacion).toLocaleDateString()}</span>
                              <span>ID: {vacante.id}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center">
                    <div className="mb-4">
                      <BriefcaseBusiness className="h-16 w-16 text-primary/20 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Seleccione una vacante</h3>
                    <p className="text-muted-foreground mb-4">
                      Haga clic en una de las vacantes disponibles para ver más detalles.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Actualmente tenemos {vacantes.length} posiciones abiertas en diferentes áreas.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Contenido: Beneficios */}
          <TabsContent value="beneficios">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              ref={ref}
            >
              <div className="card-glass p-8 rounded-xl shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center gradient-heading">
                  Beneficios de trabajar en SNG SERVIMAX
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                  En SNG SERVIMAX nos preocupamos por el bienestar y desarrollo de nuestros colaboradores. Ofrecemos un
                  paquete de beneficios competitivo diseñado para mejorar su calidad de vida y potenciar su crecimiento
                  profesional.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {beneficios.map((beneficio, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-muted/50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        {beneficio.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{beneficio.titulo}</h3>
                      <p className="text-muted-foreground">{beneficio.descripcion}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Desarrollo Profesional</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">Capacitación continua:</span> Programas de
                          formación técnica y desarrollo de habilidades blandas.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">Plan de carrera:</span> Oportunidades de
                          crecimiento y promoción interna.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">Certificaciones:</span> Apoyo para obtener
                          certificaciones profesionales relevantes para su área.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Calidad de Vida</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">Equilibrio trabajo-vida:</span> Horarios
                          flexibles y días de trabajo remoto según el puesto.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">Actividades recreativas:</span> Eventos de
                          integración y actividades deportivas para empleados.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <span className="font-medium text-foreground">Reconocimiento:</span> Programas de
                          reconocimiento y bonificaciones por desempeño destacado.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Button className="btn-gradient shadow-blue" onClick={() => setActiveTab("postulacion")}>
                    Postular ahora
                  </Button>
                </div>
              </div>

              {/* Preguntas frecuentes */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Preguntas Frecuentes</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faq.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{item.pregunta}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pl-7">{item.respuesta}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </TabsContent>

          {/* Contenido: Postulación */}
          <TabsContent value="postulacion">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="card-glass p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Formulario de Postulación</h2>
                    <CurriculumForm
                      selectedPosition={
                        selectedVacante ? vacantes.find((v) => v.id === selectedVacante)?.titulo : undefined
                      }
                    />
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-6">
                    <h3 className="text-xl font-bold mb-4">Consejos para su postulación</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          Asegúrese de que su CV esté actualizado y destaque sus logros relevantes.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          Personalice su carta de presentación para la posición específica.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          Incluya ejemplos concretos de su experiencia relacionada con el puesto.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          Revise cuidadosamente su solicitud antes de enviarla para evitar errores.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Proceso de Selección</h3>
                    <ol className="space-y-4 relative border-l border-primary/30 pl-6 ml-2">
                      <li className="mb-6">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2"></div>
                        <h4 className="font-bold">Revisión de CV</h4>
                        <p className="text-sm text-muted-foreground">
                          Evaluamos su experiencia y habilidades para determinar si coinciden con los requisitos del
                          puesto.
                        </p>
                      </li>
                      <li className="mb-6">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2"></div>
                        <h4 className="font-bold">Entrevista inicial</h4>
                        <p className="text-sm text-muted-foreground">
                          Conversación telefónica o virtual para conocer más sobre su perfil y expectativas.
                        </p>
                      </li>
                      <li className="mb-6">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2"></div>
                        <h4 className="font-bold">Entrevista técnica</h4>
                        <p className="text-sm text-muted-foreground">
                          Evaluación de conocimientos técnicos específicos relacionados con el puesto.
                        </p>
                      </li>
                      <li className="mb-6">
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2"></div>
                        <h4 className="font-bold">Entrevista final</h4>
                        <p className="text-sm text-muted-foreground">
                          Reunión con el gerente del área y/o recursos humanos para discutir detalles finales.
                        </p>
                      </li>
                      <li>
                        <div className="absolute w-4 h-4 bg-primary rounded-full -left-2"></div>
                        <h4 className="font-bold">Oferta laboral</h4>
                        <p className="text-sm text-muted-foreground">
                          Presentación de la oferta formal y condiciones de contratación.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Sección final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¿No encuentra la posición adecuada?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Si no encuentra una vacante que se ajuste a su perfil pero está interesado en formar parte de nuestro
              equipo, envíenos su currículum. Lo tendremos en cuenta para futuras oportunidades.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-gradient shadow-blue" onClick={() => setActiveTab("postulacion")}>
                Enviar currículum espontáneo
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contacto">Contactar con RRHH</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

