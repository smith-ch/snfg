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
  },
  {
    icon: Briefcase,
    value: 50,
    label: "Proyectos Completados",
    suffix: "+",
  },
  {
    icon: Users,
    value: 45,
    label: "Clientes Satisfechos",
    suffix: "+",
  },
  {
    icon: ThumbsUp,
    value: 100,
    label: "Satisfacción del Cliente",
    suffix: "%",
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
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background animado - solo colores de la marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a52] via-[#2d5a7b] to-[#1a3a52]" />

      {/* Partículas flotantes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#ff6b35]/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 text-white"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Nuestra Trayectoria
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Casi un año de experiencia brindando servicios de calidad
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className="text-center relative group"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 107, 53, 0)",
                    "0 0 40px rgba(255, 107, 53, 0.3)",
                    "0 0 20px rgba(255, 107, 53, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#1a3a52] mb-4 relative overflow-hidden group-hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%", skewX: -20 }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
                <stat.icon className="h-10 w-10 text-white relative z-10" />
              </motion.div>

              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2 text-white"
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

              <motion.div
                className="text-sm md:text-base text-white/80"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
