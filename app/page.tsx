import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import ServicesOverview from "@/components/services-overview"
import AboutSection from "@/components/about-section"
import QualityPolicy from "@/components/quality-policy"
import ContactSection from "@/components/contact-section"
import TestimonialsSection from "@/components/testimonials-section"
import StatsSection from "@/components/stats-section"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
        <HeroSection />
      </Suspense>

      {/* Banner promocional de Oportunidades de Empleo */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-4 relative overflow-hidden shadow-lg rounded-lg mx-4 -mt-8 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
              <div className="bg-primary/20 p-2 rounded-full">
                <BriefcaseBusiness className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-medium">¡VACANTES!</span>
                <h3 className="text-lg font-bold">Oportunidades de Trabajo</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 sm:mb-0 text-center sm:text-left">
              Únase a nuestro equipo y desarrolle su carrera profesional
            </p>
            <Button size="sm" className="btn-shine group" asChild>
              <Link href="/empleo" className="flex items-center gap-1">
                Ver vacantes <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Elementos decorativos animados */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary/10 rounded-full blur-xl pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-blue-500/10 rounded-full blur-xl pulse"></div>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/30">
        <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando estadísticas...</div>}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando servicios...</div>}>
          <ServicesOverview />
        </Suspense>
      </div>
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
