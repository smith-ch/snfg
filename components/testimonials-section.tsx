"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Carlos Rodríguez",
    position: "Director de Proyectos, Constructora XYZ",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    text: "SNG SERVIMAX ha sido un socio excepcional en nuestros proyectos. Su profesionalismo y calidad de trabajo son incomparables. Recomendaría sus servicios sin dudarlo.",
  },
  {
    name: "María González",
    position: "Gerente de Operaciones, Inmobiliaria ABC",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    text: "Hemos trabajado con SNG SERVIMAX en múltiples proyectos y siempre han superado nuestras expectativas. Su atención al detalle y compromiso con la calidad son excepcionales.",
  },
  {
    name: "Juan Pérez",
    position: "Propietario, Edificio Residencial",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    stars: 4,
    text: "Contraté a SNG SERVIMAX para el mantenimiento de mi edificio y quedé muy satisfecho con los resultados. El trabajo fue realizado de manera eficiente y profesional.",
  },
  {
    name: "Ana Martínez",
    position: "Arquitecta, Estudio de Arquitectura",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    text: "Como arquitecta, valoro mucho la precisión y calidad en la ejecución de mis diseños. SNG SERVIMAX ha sido un colaborador excepcional, entendiendo perfectamente mis visiones y materializándolas con gran profesionalismo.",
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
    <section ref={ref} className="py-24 relative overflow-hidden section-wave">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-0"></div>

      {/* Decorative quotes */}
      <motion.div
        className="absolute top-20 left-10 opacity-10 z-0"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [-5, 0, -5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Quote className="h-32 w-32 text-primary" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-10 z-0"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [5, 0, 5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Quote className="h-32 w-32 text-primary" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            TESTIMONIOS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">Lo Que Dicen Nuestros Clientes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mayor recompensa
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/80 dark:bg-gray-800/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl">
            {/* Large quote mark */}
            <div className="absolute top-6 left-6 opacity-10">
              <Quote className="h-16 w-16 text-primary" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`testimonial-${currentTestimonial}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-2 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentTestimonial].stars
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl italic mb-8 text-muted-foreground">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
                    <Image
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute -bottom-5 right-10 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 shadow-md rounded-full"
                onClick={prevTestimonial}
                aria-label="Testimonio anterior"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white dark:bg-gray-800 shadow-md rounded-full"
                onClick={nextTestimonial}
                aria-label="Testimonio siguiente"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Testimonial counter */}
            <div className="absolute -bottom-5 left-10 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm shadow-md">
              {currentTestimonial + 1} / {testimonials.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

