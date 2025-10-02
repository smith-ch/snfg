"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Users, Briefcase, ThumbsUp } from "lucide-react"

const stats = [
  {
    icon: Award,
    value: 1,
    label: "Año de Experiencia",
    suffix: "",
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/50",
  },
  {
    icon: Briefcase,
    value: 50,
    label: "Proyectos Completados",
    suffix: "+",
    color: "from-[#ff6b35] to-orange-500",
    glow: "shadow-[#ff6b35]/50",
  },
  {
    icon: Users,
    value: 45,
    label: "Clientes Satisfechos",
    suffix: "+",
    color: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/50",
  },
  {
    icon: ThumbsUp,
    value: 100,
    label: "Satisfacción del Cliente",
    suffix: "%",
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/50",
  },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900"
    >
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(26, 58, 82, 0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] text-white rounded-full text-sm font-bold mb-6 shadow-lg"
          >
            NUESTRA TRAYECTORIA
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a3a52] to-[#2d5a7b] bg-clip-text text-transparent">
            Resultados que Hablan por Sí Mismos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Casi un año de experiencia brindando servicios de calidad y excelencia
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="text-center relative group"
            >
              {/* Card background */}
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800">
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl ${stat.glow}`}
                />

                {/* Icon container */}
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 relative overflow-hidden shadow-lg ${stat.glow}`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="h-10 w-10 text-white relative z-10" />
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>

                {/* Value */}
                <motion.div
                  className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </motion.div>

                {/* Label */}
                <motion.div
                  className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                >
                  {stat.label}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
