"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  id: string;
  campaign: string;
  budget: number;
  spent: number;
  leads: number;
  cpl: number;
  roi: number;
};

const ROWS: Row[] = [
  {
    id: "r1",
    campaign: "Lanzamiento Casas Modulares Q2",
    budget: 120000,
    spent: 88400,
    leads: 38,
    cpl: 2326,
    roi: 412,
  },
  {
    id: "r2",
    campaign: "Ads Pilar · Casas Premium",
    budget: 80000,
    spent: 64200,
    leads: 24,
    cpl: 2675,
    roi: 286,
  },
  {
    id: "r3",
    campaign: "Newsletter Mensual · Abril",
    budget: 18000,
    spent: 12100,
    leads: 18,
    cpl: 672,
    roi: 540,
  },
  {
    id: "r4",
    campaign: "Webinar Diseño Bioclimático",
    budget: 24000,
    spent: 19800,
    leads: 32,
    cpl: 619,
    roi: 480,
  },
  {
    id: "r5",
    campaign: "Reactivación clientes 2024",
    budget: 12000,
    spent: 6400,
    leads: 6,
    cpl: 1067,
    roi: 220,
  },
  {
    id: "r6",
    campaign: "SEO + Contenido Q2",
    budget: 60000,
    spent: 38600,
    leads: 22,
    cpl: 1755,
    roi: 320,
  },
];

function fmt(n: number) {
  return n.toLocaleString("es-AR");
}

function roiColor(r: number) {
  if (r >= 400) return "text-success";
  if (r >= 250) return "text-cyan";
  if (r >= 150) return "text-amber";
  return "text-magenta";
}

export function CampaignSpendTable() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Detalle
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Gasto y rendimiento por campaña
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {ROWS.length} campañas activas
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Campaña
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Asignado
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Gastado
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Leads
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                CPL
              </th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                ROI
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const pctSpent = (r.spent / r.budget) * 100;
              return (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3.5">
                    <span className="font-medium text-foreground">{r.campaign}</span>
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-foreground tabular-nums">
                    ${fmt(r.budget)}
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-foreground tabular-nums">
                        ${fmt(r.spent)}
                      </span>
                      <div className="h-1 w-16 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            pctSpent > 90
                              ? "bg-magenta"
                              : pctSpent > 70
                              ? "bg-amber"
                              : "bg-success"
                          )}
                          style={{ width: `${Math.min(pctSpent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-foreground tabular-nums">
                    {r.leads}
                  </td>
                  <td className="px-3 py-3.5 text-right font-mono text-cyan tabular-nums">
                    ${fmt(r.cpl)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border border-white/5 bg-surface-2 px-2 py-0.5 font-mono text-xs tabular-nums",
                        roiColor(r.roi)
                      )}
                    >
                      <TrendingUp className="h-3 w-3" />
                      {r.roi}%
                    </span>
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
