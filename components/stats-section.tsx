"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Award, Building, CheckCircle } from "lucide-react"
import CountUp from "react-countup"

const stats = [
  {
    icon: <Building className="h-10 w-10 text-primary" />,
    value: 25,
    label: "Proyectos Completados",
    suffix: "+",
    color: "bg-primary/10",
    shadowColor: "shadow-blue",
  },
  {
    icon: <Users className="h-10 w-10 text-secondary" />,
    value: 10,
    label: "Profesionales",
    suffix: "+",
    color: "bg-secondary/10",
    shadowColor: "shadow-accent",
  },
  {
    icon: <Award className="h-10 w-10 text-accent" />,
    value: 10,
    label: "Años de Experiencia",
    suffix: "+",
    color: "bg-accent/10",
    shadowColor: "shadow-blue",
  },
  {
    icon: <CheckCircle className="h-10 w-10 text-secondary" />,
    value: 100,
    label: "Clientes Satisfechos",
    suffix: "%",
    color: "bg-secondary/10",
    shadowColor: "shadow-accent",
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
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-glass p-6 rounded-xl hover-scale"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 ${stat.color} rounded-full ${stat.shadowColor}`}>{stat.icon}</div>
              </div>
              <div className="text-4xl font-bold mb-2 text-center gradient-heading">
                <CountUp end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {stat.suffix}
              </div>
              <div className="text-muted-foreground text-center">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
