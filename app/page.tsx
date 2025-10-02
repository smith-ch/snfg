import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import ServicesOverview from "@/components/services-overview"
import AboutSection from "@/components/about-section"
import QualityPolicy from "@/components/quality-policy"
import ContactSection from "@/components/contact-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"
import NeuralNetworkSection from "@/components/neural-network-section"
import Link from "next/link"
import { ArrowRight, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
        <HeroSection />
      </Suspense>

      {/* Banner promocional de Oportunidades de Empleo - Optimizado para móvil */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-3 sm:py-4 relative overflow-hidden shadow-lg rounded-lg mx-2 sm:mx-4 -mt-6 sm:-mt-8 z-10">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <div className="bg-primary/20 p-1.5 sm:p-2 rounded-full">
                <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xs sm:text-sm font-medium">PRÓXIMAMENTE</span>
                <h3 className="text-base sm:text-lg font-bold">Oportunidades de Trabajo</h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-0 text-center sm:text-left px-2 sm:px-0">
              Únase a nuestro equipo y desarrolle su carrera profesional
            </p>
            <Button size="sm" className="btn-shine gradient-animated text-xs sm:text-sm" asChild>
              <Link href="/empleo" className="flex items-center gap-1">
                Más información <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Elementos decorativos animados */}
        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-8 h-8 sm:w-12 sm:h-12 bg-secondary/10 rounded-full blur-xl animate-pulse-slow"></div>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/30">
        <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando estadísticas...</div>}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando servicios...</div>}>
          <ServicesOverview />
        </Suspense>
      </div>

      {/* Nueva sección de Red Neural */}
      <Suspense fallback={<div className="h-80 flex items-center justify-center">Cargando visualización...</div>}>
        <NeuralNetworkSection />
      </Suspense>

      <div className="bg-gradient-to-b from-muted/30 to-background">
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando información...</div>}>
          <AboutSection />
        </Suspense>
      </div>
      <div className="bg-gradient-to-b from-background to-muted/20">
        <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando políticas...</div>}>
          <QualityPolicy />
        </Suspense>
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando testimonios...</div>}>
          <TestimonialsSection />
        </Suspense>
      </div>
      <div className="bg-gradient-to-b from-muted/20 to-background">
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando contacto...</div>}>
          <ContactSection />
        </Suspense>
      </div>
    </div>
  )
}
