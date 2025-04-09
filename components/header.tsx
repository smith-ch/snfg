"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, BriefcaseBusiness } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    return pathname === path ? "text-primary font-bold" : "text-foreground hover:text-primary"
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-lg py-2" : "bg-black/50 backdrop-blur-sm py-6",
        isOpen ? "bg-background/90 backdrop-blur-xl shadow-lg" : "",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 z-50">
            <span className="text-xl sm:text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">SNG</span>{" "}
              SERVIMAX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors font-medium ${isActive("/")}`}>
              Inicio
            </Link>
            <Link
              href="/servicios"
              className={`transition-colors font-medium ${
                pathname.startsWith("/servicios") ? "text-primary font-bold" : "text-foreground hover:text-primary"
              }`}
            >
              Servicios
            </Link>
            <Link href="/nosotros" className={`transition-colors font-medium ${isActive("/nosotros")}`}>
              Nosotros
            </Link>
            <Link href="/contacto" className={`transition-colors font-medium ${isActive("/contacto")}`}>
              Contacto
            </Link>
            <Link
              href="/empleo"
              className={`transition-colors font-medium ${isActive("/empleo")} flex items-center gap-1`}
            >
              <BriefcaseBusiness className="h-4 w-4" /> Empleo{" "}
              <Badge className="ml-1 bg-primary/20 text-primary text-[10px] px-1">VACANTES</Badge>
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

      {/* Mobile Navigation Menu - Mejorado para mejor visibilidad y usabilidad */}
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

            <Link
              href="/servicios"
              className={`block text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors ${
                pathname.startsWith("/servicios") ? "text-primary font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Servicios
            </Link>

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
              href="/empleo"
              className={`block text-xl font-medium py-4 px-4 rounded-md hover:bg-muted transition-colors ${isActive("/empleo")} flex items-center`}
              onClick={() => setIsOpen(false)}
            >
              <BriefcaseBusiness className="h-5 w-5 mr-2" />
              Empleo
              <span className="ml-2 bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">VACANTES</span>
            </Link>

            <div className="pt-6 mt-2 border-t border-border">
              <div className="flex flex-col space-y-4 p-4 bg-muted/50 rounded-lg">
                <a
                  href="tel:+18494608077"
                  className="flex items-center gap-2 hover:text-primary transition-colors py-2"
                >
                  <Phone className="h-5 w-5" /> 849 460 8077
                </a>
                <a
                  href="mailto:sngservimax@gmail.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors py-2"
                >
                  <Mail className="h-5 w-5" /> sngservimax@gmail.com
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
