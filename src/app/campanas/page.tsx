import { Mail } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function CampanasPage() {
  return (
    <ComingSoon
      title="Campañas"
      icon={Mail}
      description="Centro de campañas de email marketing y promociones segmentadas para captar y nutrir leads."
      features={[
        "Editor visual drag-and-drop de emails",
        "Secuencias automatizadas y triggers por comportamiento",
        "Segmentación dinámica por etapa del funnel",
        "A/B testing de subject lines y CTAs",
        "Reportes de open rate, CTR y conversión",
      ]}
    />
  );
}
