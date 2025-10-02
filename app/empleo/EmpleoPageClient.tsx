"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Building2, Clock, Heart, Star, Mail, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

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
      <div className="absolute inset-0 bg-pattern -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <PageHeader
            title="Oportunidades de Trabajo"
            description="Únase a nuestro equipo y desarrolle su carrera profesional con nosotros"
            className="text-center mb-12"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto card-glass p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-10 w-10 text-primary" />
          </div>

          <h2 className="text-3xl font-bold mb-6 gradient-heading">Próximamente</h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Estamos preparando nuevas oportunidades de empleo. Muy pronto publicaremos aquí nuestras vacantes
            disponibles.
          </p>

          <div className="p-6 mb-8 bg-muted/60 rounded-lg inline-block">
            <h3 className="text-xl font-medium mb-2">¿Interesado en trabajar con nosotros?</h3>
            <p className="text-muted-foreground mb-6">
              Puede enviarnos su currículum a nuestro correo electrónico y le contactaremos cuando tengamos vacantes que
              se ajusten a su perfil.
            </p>
            <Button asChild className="btn-gradient shadow-blue">
              <a href="mailto:sngservimax@gmail.com" className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                sngservimax@gmail.com
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-6 bg-muted/40 rounded-lg text-left hover:shadow-lg transition-shadow">
              <h4 className="font-medium mb-2">Contacto Telefónico</h4>
              <a
                href="tel:+18494608077"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Phone className="h-5 w-5" />
                849 460 8077
              </a>
            </div>

            <div className="p-6 bg-muted/40 rounded-lg text-left hover:shadow-lg transition-shadow">
              <h4 className="font-medium mb-2">Visita Nuestra Oficina</h4>
              <Link
                href="/contacto#mapa"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                Ver ubicación
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
