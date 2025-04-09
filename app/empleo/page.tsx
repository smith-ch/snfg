// page.tsx

import type { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Oportunidades de Trabajo | SNG SERVIMAX",
  description:
    "Descubra las oportunidades laborales en SNG SERVIMAX. Únase a nuestro equipo de profesionales en el sector de la construcción.",
}

// Importa el componente de forma dinámica, sin SSR
const EmpleoPageClient = dynamic(() => import("./EmpleoPageClient"), {
  ssr: false,
})

export default function EmpleoPage() {
  return <EmpleoPageClient />
}
