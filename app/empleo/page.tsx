// page.tsx
import dynamic from 'next/dynamic';

// Cargar dinámicamente el componente con ssr: false para evitar prerenderizado
const EmpleoPageClient = dynamic(() => import('./EmpleoPageClient'), { ssr: false });

export const metadata = {
  title: "Oportunidades de Trabajo | SNG SERVIMAX",
  description:
    "Descubra las oportunidades laborales en SNG SERVIMAX. Únase a nuestro equipo de profesionales en el sector de la construcción.",
};

export default function EmpleoPage() {
  return <EmpleoPageClient />;
}
