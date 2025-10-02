"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, ChevronDown, Sparkles, Zap } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const servicesRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    servicesRef.current = document.getElementById("services-section")
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const slides = [
    {
      title: "Soluciones de construcción innovadoras",
      description: "Transformamos ideas en estructuras sólidas y duraderas",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop",
      cta: "Nuestros Servicios",
      link: "/servicios",
    },
    {
      title: "Expertos en impermeabilización",
      description: "Protegemos sus estructuras contra la humedad y filtraciones",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1920&auto=format&fit=crop",
      cta: "Solicitar Presupuesto",
      link: "/contacto#formulario",
    },
    {
      title: "Gestión integral de proyectos",
      description: "Desde el diseño hasta la ejecución, nos encargamos de todo",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1920&auto=format&fit=crop",
      cta: "Conocer Más",
      link: "/nosotros",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative h-[90vh] md:h-screen w-full overflow-hidden"
    >
      {/* Partículas animadas más dramáticas - 40 partículas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className={cn("absolute rounded-full", i % 2 === 0 ? "bg-[#1a3a52]/30" : "bg-[#ff6b35]/30")}
            style={{
              width: Math.random() * 12 + 4,
              height: Math.random() * 12 + 4,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 2.5, 1],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mouse follower MEGA dramático */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-[#ff6b35]/25 blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 15 }}
      />

      {/* Círculos decorativos MEGA animados */}
      <motion.div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] border-8 border-[#1a3a52]/20 rounded-full z-0"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 360],
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] border-8 border-[#ff6b35]/20 rounded-full z-0"
        animate={{
          scale: [1.4, 1, 1.4],
          rotate: [360, 0],
          opacity: [0.4, 0.1, 0.4],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Rayos de luz MUY dramáticos - 12 rayos */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-0 left-1/2 w-2 bg-gradient-to-b from-[#ff6b35]/40 to-transparent"
          style={{
            height: "100%",
            transformOrigin: "top center",
            rotate: `${i * 30}deg`,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            scaleY: [0.4, 1.2, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Slides con parallax */}
      {slides.map((slide, index) => (
        <motion.div
          key={`slide-${index}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
          style={{ y: currentSlide === index ? smoothY : 0 }}
        >
          <ImageWithFallback
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </motion.div>
      ))}

      <div className="relative h-full flex items-center z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-white">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, x: -50, scale: 0.7 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.5 }}
              className="inline-block mb-4 px-3 py-1 border border-[#ff6b35]/50 rounded-full text-xs sm:text-sm font-medium bg-[#ff6b35]/10 backdrop-blur-sm"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="inline-flex items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                  transition={{
                    rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                SNG SERVIMAX - Expertos en darte tus servicios en la más alta calidad
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <Zap className="w-4 h-4" />
                </motion.div>
              </motion.span>
            </motion.div>

            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md leading-tight"
            >
              {slides[currentSlide].title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12, type: "spring" }}
                  whileHover={{
                    scale: 1.15,
                    color: "#ff6b35",
                    y: -5,
                    textShadow: "0 10px 20px rgba(255,107,53,0.5)",
                  }}
                  className="inline-block mr-2 cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200 drop-shadow-md"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              key={`buttons-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 md:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.12, rotate: 3 }}
                whileTap={{ scale: 0.93 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } }}
              >
                <Button
                  size="lg"
                  className="relative overflow-hidden group text-sm md:text-base bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#1a3a52] transition-all duration-500 shadow-2xl shadow-[#ff6b35]/50"
                  asChild
                >
                  <Link href={slides[currentSlide].link} className="flex items-center gap-2">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.span
                      className="relative z-10"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {slides[currentSlide].cta}
                    </motion.span>
                    <motion.div
                      animate={{
                        x: [0, 6, 0],
                        rotate: [0, 15, 0],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight size={16} className="relative z-10" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.12, rotate: -3 }}
                whileTap={{ scale: 0.93 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 } }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-[#ff6b35]/30 hover:border-[#ff6b35] text-sm md:text-base transition-all duration-300 shadow-xl"
                  asChild
                >
                  <Link href="/contacto#formulario">Contactar</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide indicators MEGA animados */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 md:h-3 rounded-full transition-all overflow-hidden relative",
              currentSlide === index ? "w-6 md:w-8 bg-white" : "w-2 md:w-3 bg-white/50 hover:bg-white/80",
            )}
            whileHover={{ scale: 1.6 }}
            whileTap={{ scale: 0.8 }}
            animate={currentSlide === index ? { scale: [1, 1.3, 1] } : {}}
            transition={currentSlide === index ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY } : {}}
            aria-label={`Ir a diapositiva ${index + 1}`}
          >
            {currentSlide === index && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1a3a52] via-[#ff6b35] to-[#1a3a52]"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 5, ease: "linear" }}
                style={{ backgroundSize: "200% 100%" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Scroll down button ULTRA animado */}
      <motion.div
        className="absolute bottom-8 right-4 md:right-8 z-20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div whileHover={{ scale: 1.3, rotate: 360 }} whileTap={{ scale: 0.85 }} transition={{ duration: 0.6 }}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-[#ff6b35]/30 hover:border-[#ff6b35] w-8 h-8 md:w-10 md:h-10 relative overflow-hidden group transition-all duration-300 shadow-2xl shadow-[#ff6b35]/30"
            onClick={scrollToServices}
            aria-label="Desplazarse a la sección de servicios"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#1a3a52] to-[#ff6b35]"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 0.3 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-white relative z-10" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
