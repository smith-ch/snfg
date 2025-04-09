import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ResponsiveChecker from "@/components/responsive-checker"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SNG SERVIMAX | Servicios de Construcción",
  description: "Empresa líder en servicios de construcción, innovación y sostenibilidad",
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
          <ResponsiveChecker />
        </ThemeProvider>
      </body>
    </html>
  )
}
