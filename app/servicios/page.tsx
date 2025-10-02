import type { Metadata } from "next"
import ServicesPageClient from "./ServicesPageClient"

export const metadata: Metadata = {
  title: "Servicios | SNG SERVIMAX",
  description:
    "Descubra nuestra amplia gama de servicios de construcción, innovación y sostenibilidad para proyectos de cualquier escala",
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
