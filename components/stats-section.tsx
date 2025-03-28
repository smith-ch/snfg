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
    <section ref={ref} className="py-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-primary/5 skew-y-3 -z-10 transform-gpu"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center"
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

