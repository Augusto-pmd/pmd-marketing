"use client";

import { motion } from "framer-motion";
import { Workflow, Power, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type FlowItem = {
  id: string;
  name: string;
  active: boolean;
  lastTriggered: string;
  triggerCount: number;
  trigger: string;
};

const WORKFLOWS: FlowItem[] = [
  {
    id: "w1",
    name: "Onboarding leads calificados",
    active: true,
    lastTriggered: "Hace 12 min",
    triggerCount: 248,
    trigger: "Nuevo Lead · Score > 80",
  },
  {
    id: "w2",
    name: "Respuesta automática a reseñas 5★",
    active: true,
    lastTriggered: "Hace 2 horas",
    triggerCount: 42,
    trigger: "Review recibida · 5 estrellas",
  },
  {
    id: "w3",
    name: "Recordatorio de cita pendiente",
    active: true,
    lastTriggered: "Hace 1 día",
    triggerCount: 18,
    trigger: "Cita agendada · 24h antes",
  },
  {
    id: "w4",
    name: "Follow-up post cotización",
    active: false,
    lastTriggered: "Hace 5 días",
    triggerCount: 64,
    trigger: "Cotización enviada · 3 días",
  },
  {
    id: "w5",
    name: "Reactivación clientes inactivos",
    active: false,
    lastTriggered: "Nunca ejecutado",
    triggerCount: 0,
    trigger: "Sin contacto > 90 días",
  },
];

export function WorkflowList() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-magenta/30 bg-magenta/10">
            <Workflow className="h-4 w-4 text-magenta" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Mis flujos
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Workflows guardados
            </h3>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg border border-magenta/40 bg-magenta/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-magenta hover:bg-magenta/20"
        >
          + Nuevo workflow
        </button>
      </div>
      <div className="divide-y divide-white/5">
        {WORKFLOWS.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02]"
          >
            <button
              type="button"
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-all",
                w.active
                  ? "border-success/40 bg-success/10 text-success shadow-glow-success"
                  : "border-white/10 bg-surface-2 text-muted"
              )}
              title={w.active ? "Desactivar" : "Activar"}
            >
              <Power className="h-3.5 w-3.5" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground truncate">
                  {w.name}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                    w.active
                      ? "border-success/30 bg-success/10 text-success"
                      : "border-white/10 bg-surface-2 text-muted"
                  )}
                >
                  {w.active ? "Activo" : "Inactivo"}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-3 font-mono text-[11px] text-muted">
                <span>{w.trigger}</span>
                <span>·</span>
                <span>{w.lastTriggered}</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-mono text-lg font-semibold text-foreground tabular-nums">
                {w.triggerCount}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                ejecuciones
              </span>
            </div>
            <button
              type="button"
              className="rounded-md p-1.5 text-muted hover:bg-white/5 hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
