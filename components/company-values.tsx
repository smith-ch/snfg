"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Clock, Heart, Shield, Target, Users } from "lucide-react"

export default function CompanyValues() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const values = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Misión",
      description:
        "Proporcionar servicios de construcción de alta calidad que superen las expectativas de nuestros clientes, utilizando las mejores prácticas y materiales del mercado.",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Visión",
      description:
        "Ser reconocidos como líderes en el sector de la construcción, destacando por nuestra innovación, calidad y compromiso con la sostenibilidad.",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Excelencia",
      description:
        "Nos esforzamos por alcanzar la excelencia en cada proyecto, prestando atención a cada detalle y superando los estándares de la industria.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Integridad",
      description:
        "Actuamos con honestidad y transparencia en todas nuestras operaciones, construyendo relaciones de confianza con nuestros clientes y colaboradores.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Trabajo en Equipo",
      description:
        "Fomentamos la colaboración y el respeto mutuo entre nuestros empleados, valorando la diversidad de ideas y habilidades.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Puntualidad",
      description:
        "Nos comprometemos a cumplir con los plazos establecidos, respetando el tiempo de nuestros clientes y optimizando nuestros procesos.",
    },
  ]

  return (
    <div ref={ref} className="py-8">
      <h3 className="text-2xl font-bold mb-8">Nuestros Valores</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-muted/50 p-6 rounded-lg"
          >
            <div className="flex flex-col items-center text-center">
              {value.icon}
              <h4 className="text-xl font-medium mt-4 mb-2">{value.title}</h4>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

