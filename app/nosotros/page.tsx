"use client";

import dynamic from "next/dynamic";

const AboutPageClient = dynamic(() => import("./AboutPageClient"), { ssr: false });

export default function AboutPage() {
  if (typeof window === "undefined") {
    return null; // Prevent server-side rendering issues
  }
  return <AboutPageClient />;
}
