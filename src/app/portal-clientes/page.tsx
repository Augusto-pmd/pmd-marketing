import { Globe } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function PortalClientesPage() {
  return (
    <ComingSoon
      title="Portal Clientes"
      icon={Globe}
      description="Espacio privado para que clientes activos sigan el avance de su obra y accedan a documentación."
      features={[
        "Login propio para cada cliente",
        "Timeline visual del avance de obra con fotos semanales",
        "Acceso a planos, certificaciones y comprobantes de pago",
        "Chat directo con el equipo de PMD",
        "Encuestas de satisfacción por hito",
      ]}
    />
  );
}
