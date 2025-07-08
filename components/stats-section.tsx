"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Award, Building, CheckCircle } from "lucide-react"
import CountUp from "react-countup"

const stats = [
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    value: 500,
    label: "Proyectos Completados",
    suffix: "+",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    value: 50,
    label: "Profesionales",
    suffix: "+",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    value: 15,
    label: "Años de Experiencia",
    suffix: "+",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    value: 100,
    label: "Clientes Satisfechos",
    suffix: "%",
  },
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/5 backdrop-blur-sm p-6 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">{stat.icon}</div>
              </div>
              <div className="text-4xl font-bold mb-2 text-gradient">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {stat.suffix}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

