import type { Metadata } from "next"
import PrivacyPolicyClient from "./PrivacyPolicyClient"

export const metadata: Metadata = {
  title: "Política de Privacidad | SNG SERVIMAX",
  description: "Conozca nuestra política de privacidad y cómo protegemos sus datos personales",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
