import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contacto | SNG SERVIMAX",
  description: "Póngase en contacto con nosotros para solicitar información sobre nuestros servicios",
}

export default function ContactPage() {
  return <ContactPageClient />
}
