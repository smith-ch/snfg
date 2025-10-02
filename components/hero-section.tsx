"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Award, Users, TrendingUp, ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/images/housing-maintenance.jpg",
    title: "Mantenimiento Profesional",
    subtitle: "Servicios especializados de alta calidad",
    cta: "Ver Servicios",
    link: "/servicios",
  },
  {
    id: 2,
    image: "/images/concrete-lab.jpg",
    title: "Laboratorio de Concreto",
    subtitle: "Análisis y control de calidad certificado",
    cta: "Conocer Más",
    link: "/servicios",
  },
  {
    id: 3,
    image: "/images/financial-services.jpg",
    title: "Servicios Financieros",
    subtitle: "Soluciones integrales para tu empresa",
    cta: "Contactar",
    link: "/contacto",
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-[#0f1729] via-[#1a2f4a] to-[#0a1420]">
      {/* Ondas concéntricas elegantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute rounded-full border opacity-20"
          style={{
            width: 100 + i * 150,
            height: 100 + i * 150,
            left: "20%",
            top: "30%",
            borderColor: i % 2 === 0 ? "#ff6b35" : "#4a90e2",
            borderWidth: 2,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Ondas desde otra esquina */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`wave2-${i}`}
          className="absolute rounded-full border opacity-15"
          style={{
            width: 80 + i * 120,
            height: 80 + i * 120,
            right: "15%",
            bottom: "25%",
            borderColor: i % 2 === 0 ? "#4a90e2" : "#ff6b35",
            borderWidth: 2,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Burbujas flotantes grandes y elegantes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: Math.random() * 100 + 80,
            height: Math.random() * 100 + 80,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(74,144,226,0.3) 0%, transparent 70%)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Mouse follower con gradiente */}
      <motion.div
        className="fixed w-[500px] h-[500px] pointer-events-none z-10"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#ff6b35]/30 via-[#ffa07a]/20 to-[#4a90e2]/30 rounded-full blur-3xl" />
      </motion.div>

      {/* Ondas animadas de fondo */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          background:
            "radial-gradient(circle at 20% 50%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 80% 80%, #4a90e2 0%, transparent 50%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Círculos decorativos con gradiente animado */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "linear-gradient(135deg, #ff6b35, #4a90e2)",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "linear-gradient(225deg, #4a90e2, #ff6b35)",
        }}
        animate={{
          rotate: -360,
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
      />

      {/* Estrellas parpadeantes */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Slider de imágenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Contenido del hero */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                {/* Badge con animación de brillo */}
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 border"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(74,144,226,0.2))",
                    borderImage: "linear-gradient(135deg, #ff6b35, #4a90e2) 1",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255,107,53,0.4)",
                      "0 0 40px rgba(74,144,226,0.6)",
                      "0 0 20px rgba(255,107,53,0.4)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-[#ff6b35]" />
                  </motion.div>
                  <span className="text-white font-semibold">SNG SERVIMAX - Calidad Garantizada</span>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Award className="w-5 h-5 text-[#4a90e2]" />
                  </motion.div>
                </motion.div>

                {/* Título con gradiente animado */}
                <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {slides[currentSlide].title.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-4"
                      initial={{ opacity: 0, y: 50, rotateX: -30 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                      }}
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #ff6b35, #4a90e2)",
                        backgroundSize: "200% 200%",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                      }}
                    >
                      <motion.span
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          display: "inline-block",
                          background: "linear-gradient(135deg, #ffffff, #ff6b35, #4a90e2, #ffffff)",
                          backgroundSize: "200% 200%",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {word}
                      </motion.span>
                    </motion.span>
                  ))}
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-200 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Botones con gradiente animado */}
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="px-8 py-6 text-lg font-semibold rounded-full shadow-2xl relative overflow-hidden group border-0"
                      style={{
                        background: "linear-gradient(135deg, #ff6b35, #ffa07a)",
                      }}
                    >
                      <Link href={slides[currentSlide].link} className="relative z-10">
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(135deg, #ffa07a, #ff6b35)",
                          }}
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 text-white">{slides[currentSlide].cta}</span>
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, delay: 0.3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm border-2 text-white bg-transparent"
                      style={{
                        borderImage: "linear-gradient(135deg, #ff6b35, #4a90e2) 1",
                        background: "rgba(255,255,255,0.05)",
                      }}
                    >
                      <Link href="/contacto">Contactar</Link>
                    </Button>
                  </motion.div>
                </div>

                {/* Stats con gradiente */}
                <motion.div
                  className="mt-12 grid grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {[
                    { icon: Users, label: "Clientes Satisfechos", value: "+25" },
                    { icon: Award, label: "Proyectos", value: "+50" },
                    { icon: TrendingUp, label: "Crecimiento", value: "100%" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      whileHover={{ scale: 1.1, y: -5 }}
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        y: { duration: 2.5, delay: i * 0.2, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 relative overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(74,144,226,0.2))",
                          backdropFilter: "blur(10px)",
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(135deg, #ff6b35, #4a90e2)",
                            opacity: 0.3,
                          }}
                          animate={{
                            rotate: [0, -360],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <stat.icon className="w-7 h-7 text-white relative z-10" />
                      </motion.div>
                      <motion.div
                        className="text-3xl font-bold mb-1"
                        style={{
                          background: "linear-gradient(135deg, #ff6b35, #4a90e2)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controles del slider */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="backdrop-blur-sm text-white rounded-full hover:scale-110 transition-transform"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(74,144,226,0.2))",
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="rounded-full transition-all"
              style={{
                width: index === currentSlide ? 32 : 12,
                height: 12,
                background:
                  index === currentSlide ? "linear-gradient(135deg, #ff6b35, #4a90e2)" : "rgba(255,255,255,0.5)",
              }}
              animate={
                index === currentSlide
                  ? {
                      boxShadow: [
                        "0 0 10px rgba(255,107,53,0.5)",
                        "0 0 20px rgba(74,144,226,0.8)",
                        "0 0 10px rgba(255,107,53,0.5)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="backdrop-blur-sm text-white rounded-full hover:scale-110 transition-transform"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.2), rgba(74,144,226,0.2))",
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Indicador de scroll con gradiente */}
      <motion.div
        className="absolute bottom-8 left-8 z-30 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <span className="text-white text-sm font-semibold">Scroll</span>
        <motion.div
          animate={{
            background: [
              "linear-gradient(180deg, #ff6b35, #4a90e2)",
              "linear-gradient(180deg, #4a90e2, #ff6b35)",
              "linear-gradient(180deg, #ff6b35, #4a90e2)",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="p-2 rounded-full"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </section>
  )
}
