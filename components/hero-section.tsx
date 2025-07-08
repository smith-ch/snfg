"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Find the services section
    servicesRef.current = document.getElementById("services-section")
  }, [])

  const slides = [
    {
      title: "Soluciones de construcción innovadoras",
      description: "Transformamos ideas en estructuras sólidas y duraderas",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop",
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
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop",
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
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pattern-dots opacity-10 z-0"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl z-0"></div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={`slide-${index}`}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
      ))}

      <div className="relative h-full flex items-center z-20">
        <div className="container mx-auto px-4">
          <div key={`content-${currentSlide}`} className="max-w-3xl text-white">
            <div className="inline-block mb-4 px-3 py-1 border border-primary/50 rounded-full text-xs sm:text-sm font-medium bg-primary/10 backdrop-blur-sm">
              SNG SERVIMAX - Expertos en Construcción
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200 drop-shadow-md">
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <Button size="lg" className="btn-gradient shadow-blue group text-sm md:text-base" asChild>
                <Link href={slides[currentSlide].link} className="flex items-center gap-2">
                  {slides[currentSlide].cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20 text-sm md:text-base"
                asChild
              >
                <Link href="/contacto#formulario">Contactar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all",
              currentSlide === index ? "bg-primary w-6 md:w-8" : "bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll down button */}
      <div className="absolute bottom-8 right-4 md:right-8 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 w-8 h-8 md:w-10 md:h-10"
          onClick={scrollToServices}
          aria-label="Desplazarse a la sección de servicios"
        >
          <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </Button>
      </div>
    </motion.section>
  )
}

