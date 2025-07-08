import type { Metadata } from "next"
import TermsClient from "./TermsClient"

export const metadata: Metadata = {
  title: "Términos de Servicio | SNG SERVIMAX",
  description: "Conozca nuestros términos de servicio y condiciones de uso",
}

export default function TermsPage() {
  return <TermsClient />
}

