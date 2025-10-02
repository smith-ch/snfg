"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, Phone, Mail, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-100/90 dark:bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-gray-100/90 dark:bg-black/30 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_20px_rgba(255,107,53,0.3)] overflow-hidden flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Image src="/logo.png" alt="SNG Servimax Logo" fill className="object-cover" priority />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#1a3a52] to-[#ff6b35] bg-clip-text text-transparent drop-shadow-lg">
              SNG SERVIMAX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={`relative px-4 py-2 transition-all duration-300 ${
                    pathname === item.href
                      ? "text-[#ff6b35] font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#ff6b35]"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b35]"
                      layoutId="underline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+18094608077"
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#ff6b35] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>(809) 460-8077</span>
            </a>
            <a
              href="mailto:sngservimax@gmail.com"
              className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#ff6b35] transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>sngservimax@gmail.com</span>
            </a>
            <Link href="/contacto">
              <Button className="bg-[#ff6b35] hover:bg-[#1a3a52] text-white font-semibold px-6 transition-all duration-300 shadow-lg hover:shadow-xl">
                Solicitar Presupuesto
              </Button>
            </Link>
            <Link href="/empleo" className="relative">
              <Button
                variant="outline"
                size="icon"
                className="border-[#1a3a52] text-[#1a3a52] hover:bg-[#1a3a52] hover:text-white transition-all duration-300 bg-transparent"
              >
                <Briefcase className="h-5 w-5" />
              </Button>
              <span className="absolute -top-2 -right-2 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                VACANTES
              </span>
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-lg ${
                          pathname === item.href ? "text-[#ff6b35] font-semibold" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <div className="pt-4 border-t space-y-3">
                    <a
                      href="tel:+18094608077"
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-[#ff6b35] transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>(809) 460-8077</span>
                    </a>
                    <a
                      href="mailto:sngservimax@gmail.com"
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-[#ff6b35] transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>sngservimax@gmail.com</span>
                    </a>
                    <Link href="/contacto" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#ff6b35] hover:bg-[#1a3a52] text-white font-semibold">
                        Solicitar Presupuesto
                      </Button>
                    </Link>
                    <Link href="/empleo" onClick={() => setIsOpen(false)} className="block">
                      <Button
                        variant="outline"
                        className="w-full border-[#1a3a52] text-[#1a3a52] hover:bg-[#1a3a52] hover:text-white bg-transparent"
                      >
                        <Briefcase className="h-5 w-5 mr-2" />
                        Ver Vacantes
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
