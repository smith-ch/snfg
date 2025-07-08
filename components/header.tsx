"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Phone, Mail, ChevronRight, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isActive = (path: string) => {
    return pathname === path ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
  }

  const isServiceActive = () => {
    return pathname.startsWith("/servicios") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary"
  }

  const serviceItems = [
    { name: "Servicios Complementarios", href: "/servicios#complementarios" },
    { name: "Innovación y Sostenibilidad", href: "/servicios#innovacion" },
    { name: "Servicios para Empresas", href: "/servicios#empresas" },
    { name: "Mantenimiento y Limpieza", href: "/servicios#mantenimiento" },
    { name: "Ver todos los servicios", href: "/servicios", isBold: true },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
        isOpen ? "bg-background/95 backdrop-blur-md shadow-md" : "",
      )}
    >
      {/* Top contact bar - only visible on desktop */}
      <div className="hidden lg:block bg-primary/10 py-1 mb-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm">
              <a href="tel:+15551234567" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Phone className="h-3 w-3" /> +1 (555) 123-4567
              </a>
              <a
                href="mailto:info@sngservimax.com"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Mail className="h-3 w-3" /> info@sngservimax.com
              </a>
            </div>
            <div className="text-sm">
              <span>Horario: Lun-Vie 8:00-18:00 | Sáb 9:00-13:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 z-50">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SNG SERVIMAX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${isActive("/")}`}>
              Inicio
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center transition-colors ${isServiceActive()}`}>
                Servicios <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {serviceItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href} className={cn("w-full", item.isBold && "font-medium")}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/nosotros" className={`transition-colors ${isActive("/nosotros")}`}>
              Nosotros
            </Link>
            <Link href="/contacto" className={`transition-colors ${isActive("/contacto")}`}>
              Contacto
            </Link>
            <Link
              href="/realidad-virtual"
              className={`transition-colors ${isActive("/realidad-virtual")} flex items-center gap-1`}
            >
              <Smartphone className="h-4 w-4" /> 3D/VR{" "}
              <Badge className="ml-1 bg-primary/20 text-primary text-[10px] px-1">NUEVO</Badge>
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Button asChild className="btn-shine">
              <Link href="/contacto#formulario">Solicitar Presupuesto</Link>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 z-50 rounded-md hover:bg-muted transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Simplificado y mejorado */}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-background z-40 overflow-y-auto md:hidden"
          style={{ top: "0", paddingTop: "70px" }}
        >
          <nav className="flex flex-col p-4">
            <Link
              href="/"
              className={`block text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors ${isActive("/")}`}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>

            <div className="my-2">
              <div
                className={`flex justify-between items-center text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors cursor-pointer ${isServiceActive()}`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Servicios</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </div>

              {servicesOpen && (
                <div className="ml-4 pl-4 border-l-2 border-primary/20 space-y-4 py-2">
                  {serviceItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "block py-3 px-4 rounded-md text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors flex items-center",
                        item.isBold && "font-medium text-primary",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/nosotros"
              className={`block text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors ${isActive("/nosotros")}`}
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>

            <Link
              href="/contacto"
              className={`block text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors ${isActive("/contacto")}`}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>

            <Link
              href="/realidad-virtual"
              className={`block text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors ${isActive("/realidad-virtual")} flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              <Smartphone className="h-5 w-5 mr-2" />
              3D/VR
              <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">NUEVO</span>
            </Link>

            <div className="pt-6 mt-2 border-t border-border">
              <div className="flex flex-col space-y-4 p-4 bg-muted/50 rounded-lg">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 hover:text-primary transition-colors py-2"
                >
                  <Phone className="h-5 w-5" /> +1 (555) 123-4567
                </a>
                <a
                  href="mailto:info@sngservimax.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors py-2"
                >
                  <Mail className="h-5 w-5" /> info@sngservimax.com
                </a>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild className="w-full mt-2 py-6 text-lg btn-shine">
                <Link href="/contacto#formulario" onClick={() => setIsOpen(false)}>
                  Solicitar Presupuesto
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

// Componente Badge para la etiqueta "NUEVO"
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <span className={cn("rounded-full text-xs font-medium", className)}>{children}</span>
}

