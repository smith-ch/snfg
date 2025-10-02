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
    <div className="flex flex-col">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Cargando...</div>}>
        <HeroSection />
      </Suspense>

      {/* Banner promocional de Oportunidades de Empleo - Mejorado */}
      <div className="relative -mt-8 sm:-mt-12 z-10 mx-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a3a52] via-[#2d5a7b] to-[#1a3a52] shadow-2xl border border-white/10">
            {/* Efectos de fondo animados */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#ff6b35] rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ff6b35] rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative py-6 px-6 sm:py-8 sm:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Lado izquierdo - Icono y título */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#ff6b35] rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] p-4 rounded-2xl shadow-lg">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-4 w-4 text-[#ff6b35]" />
                      <span className="text-xs sm:text-sm font-bold text-[#ff6b35] uppercase tracking-wider">
                        Próximamente
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Oportunidades de Trabajo</h3>
                  </div>
                </div>

                {/* Centro - Descripción */}
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-sm sm:text-base text-white/90">
                    Únase a nuestro equipo y desarrolle su carrera profesional en un ambiente de crecimiento
                  </p>
                </div>

                {/* Lado derecho - Botón */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] hover:from-[#ff8c5a] hover:to-[#ff6b35] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  asChild
                >
                  <Link href="/empleo" className="flex items-center gap-2">
                    Más información
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/30 pt-12">
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
