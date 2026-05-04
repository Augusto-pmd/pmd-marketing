"use client";

import { AlertCircle, Clock, MessageCircle, Bell } from "lucide-react";

const ALERTS = [
  {
    icon: AlertCircle,
    label: "Reseñas pendientes",
    value: "8",
    description: "Sin responder",
    accent: "magenta" as const,
  },
  {
    icon: Clock,
    label: "Tiempo prom. respuesta",
    value: "4.2h",
    description: "Meta: < 6h",
    accent: "success" as const,
  },
  {
    icon: MessageCircle,
    label: "Tasa de respuesta",
    value: "92%",
    description: "Últimos 30 días",
    accent: "cyan" as const,
  },
];

const ACCENT_MAP = {
  magenta: { bg: "bg-magenta/10", border: "border-magenta/30", text: "text-magenta" },
  success: { bg: "bg-success/10", border: "border-success/30", text: "text-success" },
  cyan: { bg: "bg-cyan/10", border: "border-cyan/30", text: "text-cyan" },
};

export function ReputationAlerts() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-magenta/30 bg-magenta/10">
            <Bell className="h-3.5 w-3.5 text-magenta" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Alertas</h3>
        </div>
      </div>
      <div className="p-5 space-y-3">
        {ALERTS.map((a) => {
          const Icon = a.icon;
          const styles = ACCENT_MAP[a.accent];
          return (
            <div
              key={a.label}
              className={`flex items-center justify-between gap-3 rounded-lg border ${styles.border} ${styles.bg.replace("/10", "/[0.04]")} p-3`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-md border ${styles.border} ${styles.bg}`}
                >
                  <Icon className={`h-4 w-4 ${styles.text}`} />
                </div>
                <div>
                  <div className="text-xs text-foreground font-medium">
                    {a.label}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {a.description}
                  </div>
                </div>
              </div>
              <span
                className={`font-mono text-xl font-semibold tabular-nums ${styles.text}`}
              >
                {a.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
