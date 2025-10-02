"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, ArrowLeft, ArrowRight, Quote, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Nora León",
    position: "Agente de Remesas y Cambio, Capla S.A.",
    stars: 5,
    text: "Excelente trabajo con el mantenimiento y las colocaciones. Los muchachos de SNG son responsables y atentos. Ya llevamos varios meses trabajando juntos y todo ha salido perfecto.",
  },
  {
    name: "Alberto Gaforio",
    position: "Fideicomiso Ciudad del Sol",
    stars: 5,
    text: "El servicio de mantenimiento que nos brindan es de primera. Siempre atentos a los detalles y muy profesionales. La verdad que nos han facilitado mucho el trabajo.",
  },
  {
    name: "Carmen García",
    position: "Pylsa Dominicana",
    stars: 5,
    text: "Quedamos muy satisfechos con el mantenimiento que nos realizaron. Son serios, puntuales y el precio es justo. Sin duda seguiremos contando con ellos para futuros proyectos.",
  },
  {
    name: "Ing. Paula Gómez",
    position: "Fideicomiso Garden City, Punta Cana",
    stars: 5,
    text: "Las pruebas de hormigón que nos hicieron fueron impecables. Muy profesionales y con equipos de calidad. Recomiendo sus servicios completamente.",
  },
  {
    name: "Solomon",
    position: "Cliente Comercial",
    stars: 5,
    text: "Llevo trabajando con SNG desde que empezaron y la verdad es que son de lo mejor. Tanto en mantenimiento como en colocación, el trabajo siempre es excelente. 100% recomendados.",
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background - solo colores de la marca */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* Decorative quotes flotantes */}
      <motion.div
        className="absolute top-20 left-10 opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [-10, 0, -10],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Quote className="h-32 w-32 text-[#1a3a52]" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [10, 0, 10],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Quote className="h-32 w-32 text-[#ff6b35]" />
      </motion.div>

      {/* Círculos animados - solo colores de la marca */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(26, 58, 82, 0.03)" : "rgba(255, 107, 53, 0.03)"} 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block px-3 py-1 bg-gradient-to-r from-[#1a3a52]/10 to-[#ff6b35]/10 rounded-full text-[#1a3a52] dark:text-white text-sm font-medium mb-4"
          >
            TESTIMONIOS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
          >
            {/* Large quote mark */}
            <motion.div
              className="absolute top-6 left-6 opacity-5"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Quote className="h-16 w-16 text-[#1a3a52]" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${currentTestimonial}`}
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: 15 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative z-10"
              >
                <div className="flex items-center gap-2 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          i < testimonials[currentTestimonial].stars
                            ? "text-[#ff6b35] fill-[#ff6b35]"
                            : "text-muted-foreground"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl md:text-2xl italic mb-8 text-muted-foreground leading-relaxed"
                >
                  "{testimonials[currentTestimonial].text}"
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative h-16 w-16 rounded-full bg-gradient-to-br from-[#1a3a52] to-[#ff6b35] flex items-center justify-center shadow-lg"
                  >
                    <User className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].position}</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute -bottom-5 right-10 flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-full hover:bg-gradient-to-r hover:from-[#1a3a52] hover:to-[#ff6b35] hover:text-white hover:border-transparent transition-all duration-300"
                  onClick={prevTestimonial}
                  aria-label="Testimonio anterior"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-full hover:bg-gradient-to-r hover:from-[#1a3a52] hover:to-[#ff6b35] hover:text-white hover:border-transparent transition-all duration-300"
                  onClick={nextTestimonial}
                  aria-label="Testimonio siguiente"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* Testimonial counter */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-5 left-10 bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] text-white px-4 py-2 rounded-full text-sm shadow-lg font-medium"
            >
              {currentTestimonial + 1} / {testimonials.length}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
