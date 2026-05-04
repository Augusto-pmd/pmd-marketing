"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, Home, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

type ProjectType = "Residencial" | "Comercial" | "Industrial";
type Status = "En obra" | "Entregado" | "En diseño";

type Project = {
  id: string;
  name: string;
  location: string;
  type: ProjectType;
  status: Status;
  m2: number;
  gradient: string;
  icon: typeof Home;
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Casa Modular Pilar",
    location: "Pilar, Buenos Aires",
    type: "Residencial",
    status: "Entregado",
    m2: 220,
    gradient: "from-cyan/30 via-cyan/10 to-magenta/20",
    icon: Home,
  },
  {
    id: "p2",
    name: "Edificio Corporativo Tigre",
    location: "Tigre, Buenos Aires",
    type: "Comercial",
    status: "En obra",
    m2: 1840,
    gradient: "from-magenta/30 via-amber/15 to-cyan/20",
    icon: Building2,
  },
  {
    id: "p3",
    name: "Townhouses Nordelta",
    location: "Nordelta, Buenos Aires",
    type: "Residencial",
    status: "En obra",
    m2: 680,
    gradient: "from-amber/30 via-success/15 to-magenta/20",
    icon: Layers,
  },
  {
    id: "p4",
    name: "Casa de Campo Cariló",
    location: "Cariló, Buenos Aires",
    type: "Residencial",
    status: "Entregado",
    m2: 340,
    gradient: "from-success/30 via-cyan/15 to-amber/20",
    icon: Home,
  },
  {
    id: "p5",
    name: "Local Showroom Recoleta",
    location: "CABA",
    type: "Comercial",
    status: "En diseño",
    m2: 180,
    gradient: "from-cyan/40 via-magenta/15 to-success/20",
    icon: Building2,
  },
  {
    id: "p6",
    name: "Casa Lago San Isidro",
    location: "San Isidro, Buenos Aires",
    type: "Residencial",
    status: "Entregado",
    m2: 520,
    gradient: "from-magenta/30 via-amber/20 to-cyan/30",
    icon: Home,
  },
];

const STATUS_STYLES: Record<Status, string> = {
  Entregado: "border-success/30 bg-success/10 text-success",
  "En obra": "border-cyan/30 bg-cyan/10 text-cyan",
  "En diseño": "border-amber/30 bg-amber/10 text-amber",
};

export function ProjectShowcase() {
  const { toast } = useToast();
  const handleAdd = () => {
    toast({
      title: "Agregar proyecto",
      description: "Subí fotos, planos y datos clave para publicar en el portal.",
      variant: "info",
    });
  };
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Vidriera pública
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Proyectos publicados en el portal
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-md border border-cyan/40 bg-cyan/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan hover:bg-cyan/20 hover:shadow-glow-cyan transition-all"
        >
          + Agregar proyecto
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded-xl border border-white/5 bg-surface-2 hover:border-white/15 transition-all"
            >
              {/* Image area (gradient placeholder) */}
              <div
                className={cn(
                  "relative h-40 bg-gradient-to-br",
                  p.gradient
                )}
              >
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070b] via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-black/40 backdrop-blur-md">
                    <Icon className="h-6 w-6 text-foreground/80" />
                  </div>
                </div>
                <div className="absolute right-3 top-3">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md",
                      STATUS_STYLES[p.status]
                    )}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
              {/* Body */}
              <div className="p-4">
                <h4 className="text-sm font-semibold text-foreground truncate">
                  {p.name}
                </h4>
                <div className="mt-1 flex items-center gap-1 font-mono text-[11px] text-muted">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{p.location}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-md border border-white/10 bg-surface px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                    {p.type}
                  </span>
                  <span className="font-mono text-xs text-foreground tabular-nums">
                    {p.m2} m²
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
