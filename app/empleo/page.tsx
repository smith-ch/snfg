import type { Metadata } from "next"
import EmpleoPageClient from "./EmpleoPageClient"

export const metadata: Metadata = {
  title: "Oportunidades de Trabajo | SNG SERVIMAX",
  description:
    "Descubra las oportunidades laborales en SNG SERVIMAX. Únase a nuestro equipo de profesionales en el sector de la construcción.",
}

export default function EmpleoPage() {
  return <EmpleoPageClient />
}

