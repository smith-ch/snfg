"use client"

import type React from "react"

import Link from "next/link"
import { ArrowUp, Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor ingrese un correo electrónico válido.",
        variant: "destructive",
      })
      return
    }

    setIsSubscribing(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubscribing(false)
      setEmail("")
      toast({
        title: "Suscripción exitosa",
        description: "¡Gracias por suscribirse a nuestro boletín!",
      })
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gradient-to-b from-muted/30 to-muted/50 pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8 relative">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute -top-10 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">SNG SERVIMAX</h3>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Empresa líder en servicios de construcción, innovación y sostenibilidad, comprometida con la calidad y la
              excelencia.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
              <Phone className="h-4 w-4" />
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-2 text-sm">
              <Mail className="h-4 w-4" />
              <a href="mailto:info@sngservimax.com">info@sngservimax.com</a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-2 text-sm">
              <MapPin className="h-4 w-4" />
              <a href="/contacto#mapa">123 Calle Principal, Ciudad, País</a>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="sm:mt-0 mt-2">
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/servicios#complementarios"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Servicios Complementarios
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios#innovacion"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Innovación y Sostenibilidad
                </Link>
              </li>
              <li>
                <Link href="/servicios#empresas" className="text-muted-foreground hover:text-primary transition-colors">
                  Servicios para Empresas
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios#mantenimiento"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Mantenimiento y Limpieza
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios#servicio-personalizado"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Servicios Personalizados
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:mt-0 mt-2">
            <h3 className="text-lg font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/nosotros#equipo" className="text-muted-foreground hover:text-primary transition-colors">
                  Nuestro Equipo
                </Link>
              </li>
              <li>
                <Link href="/nosotros#politicas" className="text-muted-foreground hover:text-primary transition-colors">
                  Políticas de Calidad
                </Link>
              </li>
              <li>
                <Link href="/nosotros#valores" className="text-muted-foreground hover:text-primary transition-colors">
                  Valores
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:mt-0 mt-2">
            <h3 className="text-lg font-bold mb-4">Boletín Informativo</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Suscríbase a nuestro boletín para recibir las últimas noticias y actualizaciones.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-9 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit" size="sm" disabled={isSubscribing}>
                {isSubscribing ? "..." : "Enviar"}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Enlaces Rápidos</h4>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <Link
                  href="/contacto#formulario"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Solicitar Presupuesto
                </Link>
                <Link href="/servicios" className="text-muted-foreground hover:text-primary transition-colors">
                  Todos los Servicios
                </Link>
                <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                  Llamar Ahora
                </a>
                <Link href="/contacto#mapa" className="text-muted-foreground hover:text-primary transition-colors">
                  Ubicación
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} SNG SERVIMAX. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs sm:text-sm">
            <Link href="/privacidad" className="text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-muted-foreground hover:text-primary transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full shadow-md w-8 h-8 sm:w-10 sm:h-10"
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </footer>
  )
}

