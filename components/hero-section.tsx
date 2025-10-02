"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock, Users, TrendingUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const slides = [
  {
    title: "Laboratorio de Concreto",
    subtitle: "Análisis y control de calidad certificado",
    description: "Servicios profesionales de ensayo y análisis de materiales de construcción",
    image: "/images/concrete-lab.jpg",
    cta: "Conocer Más",
    ctaLink: "/servicios#laboratorio",
  },
  {
    title: "Servicios Financieros",
    subtitle: "Soluciones integrales para su empresa",
    description: "Asesoría y gestión financiera especializada en el sector construcción",
    image: "/images/financial-services.jpg",
    cta: "Contactar",
    ctaLink: "/contacto",
  },
  {
    title: "Excelencia en Cada Proyecto",
    subtitle: "Compromiso con la calidad",
    description: "Más de 50 proyectos completados con los más altos estándares",
    image: "/images/construction-generic.jpg",
    cta: "Ver Proyectos",
    ctaLink: "/nosotros",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Expanding Waves from top-left */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wave-tl-${i}`}
            className="absolute -top-1/4 -left-1/4 rounded-full"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(255,107,53,0.03)" : "rgba(74,144,226,0.03)"} 0%, transparent 70%)`,
              border: `1px solid ${i % 2 === 0 ? "rgba(255,107,53,0.1)" : "rgba(74,144,226,0.1)"}`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Expanding Waves from bottom-right */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`wave-br-${i}`}
            className="absolute -bottom-1/4 -right-1/4 rounded-full"
            style={{
              width: `${(i + 1) * 250}px`,
              height: `${(i + 1) * 250}px`,
              background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(74,144,226,0.03)" : "rgba(255,107,53,0.03)"} 0%, transparent 70%)`,
              border: `1px solid ${i % 2 === 0 ? "rgba(74,144,226,0.1)" : "rgba(255,107,53,0.1)"}`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.7,
            }}
          />
        ))}

        {/* Floating Bubbles with blur */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full blur-xl"
            style={{
              width: `${60 + Math.random() * 100}px`,
              height: `${60 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${i % 2 === 0 ? "rgba(255,107,53,0.15)" : "rgba(74,144,226,0.15)"}, ${i % 2 === 0 ? "rgba(255,160,122,0.1)" : "rgba(135,206,235,0.1)"})`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Twinkling Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 ? "#ff6b35" : "#4a90e2",
              boxShadow: `0 0 4px ${i % 2 === 0 ? "#ff6b35" : "#4a90e2"}`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Mouse Follower */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,53,0.08) 0%, rgba(74,144,226,0.08) 50%, transparent 100%)",
          }}
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 100,
          }}
        />
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                filter: "brightness(0.4)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-3xl"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <Badge
                    variant="secondary"
                    className="text-sm px-4 py-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/30 backdrop-blur-sm"
                  >
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="inline-block mr-2"
                    >
                      ✨
                    </motion.span>
                    Calidad Certificada
                  </Badge>
                </motion.div>

                {/* Title with gradient animation */}
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                  initial={{ opacity: 0, rotateX: -20 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <motion.span
                    className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-blue-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    {slides[currentSlide].title.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-3"
                        whileHover={{
                          scale: 1.1,
                          color: "#ff6b35",
                          textShadow: "0 0 20px rgba(255,107,53,0.5)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-2xl md:text-3xl text-blue-200 mb-4 font-light"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg shadow-lg shadow-orange-500/50 transition-all duration-300"
                      asChild
                    >
                      <a href={slides[currentSlide].ctaLink}>{slides[currentSlide].cta}</a>
                    </Button>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-blue-400/50 text-white hover:bg-blue-500/20 px-8 py-6 text-lg backdrop-blur-sm bg-transparent"
                      asChild
                    >
                      <a href="/contacto">Contactar</a>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Stats with animated icons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-12 grid grid-cols-3 gap-6 max-w-2xl"
                >
                  {[
                    { icon: Users, label: "Clientes", value: "+25", color: "from-orange-400 to-orange-600" },
                    { icon: Clock, label: "Proyectos", value: "+50", color: "from-blue-400 to-blue-600" },
                    { icon: TrendingUp, label: "Crecimiento", value: "100%", color: "from-orange-400 to-blue-400" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                      whileHover={{ scale: 1.05, y: -5 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                      >
                        <stat.icon
                          className={`w-8 h-8 mx-auto mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                        />
                      </motion.div>
                      <div
                        className={`text-2xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="text-white hover:text-orange-400 hover:bg-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex gap-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-gradient-to-r from-orange-500 to-blue-500" : "w-2 bg-white/30"
                }`}
                animate={index === currentSlide ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="text-white hover:text-orange-400 hover:bg-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  )
}
