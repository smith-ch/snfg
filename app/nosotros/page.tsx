"use client";

import type { Metadata } from "next"
import dynamic from "next/dynamic";

const AboutPageClient = dynamic(() => import("./AboutPageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Nosotros | SNG SERVIMAX",
  description: "Conozca más sobre SNG SERVIMAX, nuestra historia, valores y equipo",
}

export default function AboutPage() {
  if (typeof window === "undefined") {
    return null; // Prevent server-side rendering issues
  }
  return <AboutPageClient />;
}

