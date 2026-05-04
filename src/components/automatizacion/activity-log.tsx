"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type LogItem = {
  id: string;
  workflow: string;
  result: "success" | "error" | "running";
  detail: string;
  timestamp: string;
};

const LOGS: LogItem[] = [
  {
    id: "l1",
    workflow: "Onboarding leads calificados",
    result: "success",
    detail: "Email enviado a mariana.f@gmail.com",
    timestamp: "Hace 2 min",
  },
  {
    id: "l2",
    workflow: "Respuesta automática 5★",
    result: "success",
    detail: "Respuesta publicada en Google · J. Sosa",
    timestamp: "Hace 14 min",
  },
  {
    id: "l3",
    workflow: "Onboarding leads calificados",
    result: "running",
    detail: "Esperando 3 días · Lead: C. Mendoza",
    timestamp: "Hace 22 min",
  },
  {
    id: "l4",
    workflow: "Recordatorio de cita pendiente",
    result: "success",
    detail: "WhatsApp enviado a +54 9 11 4567",
    timestamp: "Hace 1h",
  },
  {
    id: "l5",
    workflow: "Onboarding leads calificados",
    result: "error",
    detail: "Falló envío · Email inválido",
    timestamp: "Hace 2h",
  },
  {
    id: "l6",
    workflow: "Follow-up post cotización",
    result: "success",
    detail: "Tarea creada en CRM · Asignada a M. Pérez",
    timestamp: "Hace 4h",
  },
];

const RESULT_STYLES = {
  success: {
    icon: CheckCircle2,
    text: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    label: "Éxito",
  },
  error: {
    icon: XCircle,
    text: "text-magenta",
    bg: "bg-magenta/10",
    border: "border-magenta/30",
    label: "Error",
  },
  running: {
    icon: Clock,
    text: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    label: "En curso",
  },
};

export function ActivityLog() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10">
            <Activity className="h-4 w-4 text-cyan" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Registro
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Actividad reciente
            </h3>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-success">
          ● Live
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {LOGS.map((log, i) => {
          const styles = RESULT_STYLES[log.result];
          const Icon = styles.icon;
          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3 px-5 py-3 hover:bg-white/[0.02]"
            >
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                  styles.border,
                  styles.bg
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", styles.text, log.result === "running" && "animate-pulse")} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground font-medium truncate">
                    {log.workflow}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-1.5 py-0 font-mono text-[9px] uppercase tracking-wider shrink-0",
                      styles.border,
                      styles.bg,
                      styles.text
                    )}
                  >
                    {styles.label}
                  </span>
                </div>
                <div className="font-mono text-[11px] text-muted truncate">
                  {log.detail}
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted shrink-0">
                {log.timestamp}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
