import type React from "react"
import type { Metadata } from "next"
import { Quicksand, Nunito, Comfortaa } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ResponsiveChecker from "@/components/responsive-checker"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
})

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SNG Servimax - Servicios de Construcción y Mantenimiento",
  description: "Empresa líder en servicios de construcción, mantenimiento y consultoría en República Dominicana",
  keywords: "construcción, mantenimiento, consultoría, República Dominicana, SNG Servimax",
  authors: [{ name: "SNG Servimax" }],
  openGraph: {
    title: "SNG Servimax - Servicios de Construcción y Mantenimiento",
    description: "Empresa líder en servicios de construcción, mantenimiento y consultoría en República Dominicana",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/team/favicon.png" />
      </head>
      <body className={`${quicksand.variable} ${nunito.variable} ${comfortaa.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ResponsiveChecker />
        </ThemeProvider>
      </body>
    </html>
  )
}
