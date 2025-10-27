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
import { ArrowRight, Briefcase, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden w-full">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
        <HeroSection />
      </Suspense>

      {/* Banner promocional de Oportunidades de Empleo - Mejorado y responsive */}
      <div className="relative -mt-8 sm:-mt-12 z-10 px-4 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a3a52] via-[#2d5a7b] to-[#1a3a52] shadow-2xl border border-white/10 w-full">
            {/* Efectos de fondo animados */}
            <div className="absolute inset-0 opacity-30 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-[#ff6b35] rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-[#ff6b35] rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative py-4 px-4 sm:py-8 sm:px-8 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 w-full">
                {/* Lado izquierdo - Icono y título */}
                <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-[#ff6b35] rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] p-3 sm:p-4 rounded-2xl shadow-lg">
                      <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 lg:flex-initial">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff6b35] flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-[#ff6b35] uppercase tracking-wider">
                        Próximamente
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white truncate">
                      Oportunidades de Trabajo
                    </h3>
                  </div>
                </div>

                {/* Centro - Descripción (oculta en móviles pequeños) */}
                <div className="hidden md:flex flex-1 text-center lg:text-left">
                  <p className="text-sm lg:text-base text-white/90">
                    Únase a nuestro equipo y desarrolle su carrera profesional
                  </p>
                </div>

                {/* Lado derecho - Botón */}
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] hover:from-[#ff8c5a] hover:to-[#ff6b35] text-white shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto whitespace-nowrap"
                  asChild
                >
                  <Link href="/empleo" className="flex items-center gap-2 justify-center">
                    Más información
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/30 pt-12 w-full overflow-x-hidden">
        <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando estadísticas...</div>}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando servicios...</div>}>
          <ServicesOverview />
        </Suspense>
      </div>

      <Suspense fallback={<div className="h-80 flex items-center justify-center">Cargando visualización...</div>}>
        <NeuralNetworkSection />
      </Suspense>

      <div className="bg-gradient-to-b from-muted/30 to-background w-full overflow-x-hidden">
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando información...</div>}>
          <AboutSection />
        </Suspense>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/20 w-full overflow-x-hidden">
        <Suspense fallback={<div className="h-40 flex items-center justify-center">Cargando políticas...</div>}>
          <QualityPolicy />
        </Suspense>
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando testimonios...</div>}>
          <TestimonialsSection />
        </Suspense>
      </div>

      <div className="bg-gradient-to-b from-muted/20 to-background w-full overflow-x-hidden">
        <Suspense fallback={<div className="h-60 flex items-center justify-center">Cargando contacto...</div>}>
          <ContactSection />
        </Suspense>
      </div>
    </div>
  )
}
