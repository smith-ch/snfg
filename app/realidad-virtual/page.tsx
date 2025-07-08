import type { Metadata } from "next"
import VirtualRealityClient from "./VirtualRealityClient"

export const metadata: Metadata = {
  title: "Explorador de Realidad Virtual | SNG SERVIMAX",
  description:
    "Explore nuestros proyectos en 3D y realidad virtual. Una experiencia inmersiva para visualizar nuestros servicios de construcción.",
}

export default function VirtualRealityPage() {
  return <VirtualRealityClient />
}

