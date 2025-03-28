import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "Nosotros | SNG SERVIMAX",
  description: "Conozca más sobre SNG SERVIMAX, nuestra historia, valores y equipo",
}

export default function AboutPage() {
  return <AboutPageClient />
}

