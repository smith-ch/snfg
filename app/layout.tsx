import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
// Modificar la importación del componente Header para usar dynamic import con ssr: true
import dynamic from "next/dynamic"
// Importar el Header con dynamic para evitar problemas de hidratación
const Header = dynamic(() => import("@/components/header"), { ssr: true })
import Footer from "@/components/footer"
import ResponsiveChecker from "@/components/responsive-checker"

// Importar fuentes más casuales
import { Quicksand, Comfortaa } from "next/font/google"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
})

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SNG Servimax - Servicios de Construcción y Mantenimiento",
  description:
    "Empresa líder en servicios de construcción, mantenimiento y consultoría en República Dominicana. Ofrecemos soluciones integrales para proyectos residenciales, comerciales e industriales.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${quicksand.variable} ${comfortaa.variable}`}>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <div className="hide-responsive-checker">
            <ResponsiveChecker />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
