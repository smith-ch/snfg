"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    title: "Soluciones de Construcción Innovadoras",
    description: "Transformamos ideas en estructuras sólidas y duraderas",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop",
    cta: "Nuestros Servicios",
    link: "/servicios",
  },
  {
    title: "Expertos en Impermeabilización",
    description: "Protegemos sus estructuras contra la humedad y filtraciones",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop",
    cta: "Solicitar Presupuesto",
    link: "/contacto#formulario",
  },
  {
    title: "Gestión Integral de Proyectos",
    description: "Desde el diseño hasta la ejecución, nos encargamos de todo",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop",
    cta: "Conocer Más",
    link: "/nosotros",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            fill
            priority
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative h-full flex items-center z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-4 px-4 py-2 border border-[#ff6b35]/30 rounded-full text-sm font-medium bg-[#ff6b35]/10 backdrop-blur-sm text-white"
                >
                  ✨ SNG SERVIMAX - Expertos en Construcción
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#1a3a52] text-white shadow-lg"
                    asChild
                  >
                    <Link href={slides[currentSlide].link} className="flex items-center gap-2">
                      {slides[currentSlide].cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                    asChild
                  >
                    <Link href="/contacto#formulario">Contactar</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
