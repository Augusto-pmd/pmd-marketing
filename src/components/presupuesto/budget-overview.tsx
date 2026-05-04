"use client";

import { motion } from "framer-motion";
import { Wallet, TrendingDown, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const TOTAL = 450000;
const SPENT = 312840;
const REMAINING = TOTAL - SPENT;
const PCT = (SPENT / TOTAL) * 100;

export function BudgetOverview() {
  return (
    <div className="rounded-xl border border-success/20 bg-gradient-to-br from-success/[0.05] to-cyan/[0.04] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-success/40 bg-success/10 glow-success">
            <Wallet className="h-4 w-4 text-success" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-success">
              Mayo 2026
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Presupuesto mensual de marketing
            </h3>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Día 4 de 31
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
        <div className="p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Presupuesto total
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-mono text-3xl font-semibold text-foreground tabular-nums">
              ${formatNumber(TOTAL)}
            </span>
            <span className="font-mono text-xs text-muted">ARS</span>
          </div>
          <span className="font-mono text-[10px] text-muted">
            Asignado para el mes
          </span>
        </div>
        <div className="p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Gastado
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-mono text-3xl font-semibold text-amber tabular-nums">
              ${formatNumber(SPENT)}
            </span>
            <span className="font-mono text-xs text-muted">ARS</span>
          </div>
          <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-amber">
            <TrendingUp className="h-3 w-3" />
            {PCT.toFixed(1)}% del presupuesto
          </div>
        </div>
        <div className="p-5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Restante
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-mono text-3xl font-semibold text-success tabular-nums">
              ${formatNumber(REMAINING)}
            </span>
            <span className="font-mono text-xs text-muted">ARS</span>
          </div>
          <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-success">
            <TrendingDown className="h-3 w-3" />
            27 días restantes
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 pb-5">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
          <span>Avance del mes</span>
          <span className="text-foreground tabular-nums">{PCT.toFixed(1)}%</span>
        </div>
        <div className="relative h-3 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${PCT}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-success via-cyan to-amber shadow-[0_0_12px_rgba(0,255,136,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
