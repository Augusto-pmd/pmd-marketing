import { Search } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function SEOPage() {
  return (
    <ComingSoon
      title="SEO"
      icon={Search}
      description="Optimización para motores de búsqueda y posicionamiento orgánico de pmdarquitectura.com.ar."
      features={[
        "Tracking de rankings para keywords del rubro construcción",
        "Auditoría técnica del sitio (Core Web Vitals)",
        "Análisis de competencia y backlinks",
        "Generador de meta-descriptions con IA",
        "Recomendaciones de contenido por intención de búsqueda",
      ]}
    />
  );
}
