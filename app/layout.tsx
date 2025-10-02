import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ResponsiveChecker from "@/components/responsive-checker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SNG Servimax - Servicios de Construcción y Mantenimiento",
  description:
    "Empresa líder en servicios de construcción, mantenimiento y gestión de proyectos en República Dominicana",
  metadataBase: new URL("https://sngservimax.com"),
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
          <div className="hide-responsive-checker">
            <ResponsiveChecker />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
