import { DollarSign } from "lucide-react";
import { ComingSoon } from "@/components/coming-soon";

export default function PresupuestoPage() {
  return (
    <ComingSoon
      title="Presupuesto"
      icon={DollarSign}
      description="Control de presupuesto de marketing por canal con ROI calculado en tiempo real."
      features={[
        "Asignación de presupuesto mensual/anual por canal",
        "Cálculo automático de CAC (Costo de Adquisición de Cliente)",
        "Proyección de gasto vs presupuesto con alertas",
        "ROI por campaña, vinculado a leads convertidos en CRM",
        "Reporte para socios con KPIs financieros del marketing",
      ]}
    />
  );
}
