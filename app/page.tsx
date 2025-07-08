import HeroSection from "@/components/hero-section"
import ServicesOverview from "@/components/services-overview"
import AboutSection from "@/components/about-section"
import QualityPolicy from "@/components/quality-policy"
import ContactSection from "@/components/contact-section"
import TestimonialsSection from "@/components/testimonials-section"
import ProjectsShowcase from "@/components/projects-showcase"
import StatsSection from "@/components/stats-section"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      {/* Banner promocional de Realidad Virtual */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 py-4 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
              <div className="bg-primary/20 p-2 rounded-full">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-medium">¡NUEVO!</span>
                <h3 className="text-lg font-bold">Explorador de Realidad Virtual</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3 sm:mb-0 text-center sm:text-left">
              Visualice nuestros proyectos en 3D antes de construirlos
            </p>
            <Button size="sm" className="btn-shine group" asChild>
              <Link href="/realidad-virtual" className="flex items-center gap-1">
                Explorar ahora <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Elementos decorativos animados */}
        <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary/10 rounded-full blur-xl pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-blue-500/10 rounded-full blur-xl pulse"></div>
      </div>

      <div className="bg-gradient-to-b from-background to-muted/30">
        <StatsSection />
        <ServicesOverview />
      </div>
      <div className="bg-gradient-to-b from-muted/30 to-background">
        <ProjectsShowcase />
        <AboutSection />
      </div>
      <div className="bg-gradient-to-b from-background to-muted/20">
        <QualityPolicy />
        <Suspense fallback={<div>Cargando testimonios...</div>}>
          <TestimonialsSection />
        </Suspense>
      </div>
      <div className="bg-gradient-to-b from-muted/20 to-background">
        <ContactSection />
      </div>
    </div>
  )
}

