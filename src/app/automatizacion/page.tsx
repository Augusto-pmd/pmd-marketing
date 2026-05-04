import { Workflow } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function AutomatizacionPage() {
  return (
    <ComingSoon
      title="Automatización"
      icon={Workflow}
      description="Constructor visual de workflows que conecta CRM, social media, email y WhatsApp en flujos sin fricción."
      features={[
        "Editor de workflows estilo node-graph (similar al dashboard)",
        "Triggers: nuevo lead, mensaje recibido, cita agendada, etc.",
        "Acciones: enviar email, asignar a vendedor, etiquetar, mover en pipeline",
        "Integración con WhatsApp Business API",
        "Plantillas para PMD: bienvenida, follow-up post-cotización, fidelización",
      ]}
    />
  );
}
