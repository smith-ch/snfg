// page.tsx
"use client"; // Indica que este archivo es un Client Component

import dynamic from 'next/dynamic';

// Cargar dinámicamente el componente con ssr: false para evitar prerenderizado
const EmpleoPageClient = dynamic(() => import('./EmpleoPageClient'), { ssr: false });

export default function EmpleoPage() {
  return <EmpleoPageClient />;
}
