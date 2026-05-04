import { Star } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function ReputacionPage() {
  return (
    <ComingSoon
      title="Reputación"
      icon={Star}
      description="Monitoreo unificado de reseñas y menciones en Google, Instagram, Facebook y portales del rubro."
      features={[
        "Dashboard de reseñas Google My Business en tiempo real",
        "Alertas de menciones negativas con sugerencias de respuesta",
        "Plantillas de respuesta generadas con IA",
        "Score de reputación consolidado por canal",
        "Solicitudes automáticas de reseña post-obra",
      ]}
    />
  );
}
