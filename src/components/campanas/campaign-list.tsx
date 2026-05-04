"use client";

import { motion } from "framer-motion";
import {
  Mail,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  FileEdit,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CampaignStatus = "borrador" | "activa" | "pausada" | "completada";

type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  sent: number;
  openRate: number;
  clickRate: number;
  date: string;
};

const CAMPAIGNS: Campaign[] = [
  {
    id: "c1",
    name: "Lanzamiento Casas Modulares Q2",
    status: "activa",
    sent: 4280,
    openRate: 38.4,
    clickRate: 6.2,
    date: "01 May 2026",
  },
  {
    id: "c2",
    name: "Seguimiento Cotización Pilar",
    status: "activa",
    sent: 142,
    openRate: 64.1,
    clickRate: 21.8,
    date: "28 Abr 2026",
  },
  {
    id: "c3",
    name: "Newsletter Mensual · Abril",
    status: "completada",
    sent: 8120,
    openRate: 32.1,
    clickRate: 4.3,
    date: "15 Abr 2026",
  },
  {
    id: "c4",
    name: "Reactivación clientes 2024",
    status: "pausada",
    sent: 612,
    openRate: 22.8,
    clickRate: 2.1,
    date: "10 Abr 2026",
  },
  {
    id: "c5",
    name: "Promo Construcción Llave en Mano",
    status: "borrador",
    sent: 0,
    openRate: 0,
    clickRate: 0,
    date: "—",
  },
  {
    id: "c6",
    name: "Webinar Diseño Bioclimático",
    status: "completada",
    sent: 1840,
    openRate: 41.2,
    clickRate: 12.6,
    date: "02 Abr 2026",
  },
];

const STATUS_STYLES: Record<
  CampaignStatus,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  borrador: {
    label: "Borrador",
    bg: "bg-white/5",
    text: "text-muted",
    border: "border-white/10",
    icon: FileEdit,
  },
  activa: {
    label: "Activa",
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/30",
    icon: PlayCircle,
  },
  pausada: {
    label: "Pausada",
    bg: "bg-amber/10",
    text: "text-amber",
    border: "border-amber/30",
    icon: PauseCircle,
  },
  completada: {
    label: "Completada",
    bg: "bg-cyan/10",
    text: "text-cyan",
    border: "border-cyan/30",
    icon: CheckCircle2,
  },
};

export function CampaignList() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10">
            <Mail className="h-4 w-4 text-cyan" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Listado
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Campañas recientes
            </h3>
          </div>
        </div>
        <button
          type="button"
          className="rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan hover:bg-cyan/20 transition-all"
        >
          + Nueva campaña
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Campaña
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Estado
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Enviados
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Apertura
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Clicks
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Fecha
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {CAMPAIGNS.map((c, i) => {
              const status = STATUS_STYLES[c.status];
              const StatusIcon = status.icon;
              return (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/5 bg-surface-2">
                        <Mail className="h-3.5 w-3.5 text-muted" />
                      </div>
                      <span className="font-medium text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        status.bg,
                        status.text,
                        status.border
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-foreground tabular-nums">
                    {c.sent.toLocaleString("es-AR")}
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <span className="font-mono text-foreground tabular-nums">
                      {c.openRate > 0 ? `${c.openRate.toFixed(1)}%` : "—"}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-right">
                    <span className="font-mono text-foreground tabular-nums">
                      {c.clickRate > 0 ? `${c.clickRate.toFixed(1)}%` : "—"}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 font-mono text-xs text-muted tabular-nums">
                    {c.date}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted hover:bg-white/5 hover:text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
