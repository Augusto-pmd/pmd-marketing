"use client";

import { DollarSign, Target, TrendingUp, Users } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { BudgetOverview } from "@/components/presupuesto/budget-overview";
import { SpendBreakdown } from "@/components/presupuesto/spend-breakdown";
import { CPLChart } from "@/components/presupuesto/cpl-chart";
import { ROIChart } from "@/components/presupuesto/roi-chart";
import { CampaignSpendTable } from "@/components/presupuesto/campaign-spend-table";

export default function PresupuestoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Presupuesto
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <DollarSign className="h-3.5 w-3.5 text-success" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Período · Mayo 2026
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Gastado este mes"
          value="$312k"
          delta="69.5% del presup."
          trend="up"
          icon={DollarSign}
          accent="success"
          index={0}
        />
        <StatCard
          label="Costo por Lead"
          value="$3.480"
          delta="-6.5% vs Abr"
          trend="up"
          icon={Target}
          accent="cyan"
          index={1}
        />
        <StatCard
          label="ROI promedio"
          value="273%"
          delta="+18 pp"
          trend="up"
          icon={TrendingUp}
          accent="amber"
          index={2}
        />
        <StatCard
          label="Leads generados"
          value="140"
          delta="+24 este mes"
          trend="up"
          icon={Users}
          accent="magenta"
          index={3}
        />
      </div>

      {/* Overview */}
      <BudgetOverview />

      {/* Breakdown */}
      <SpendBreakdown />

      {/* CPL + ROI */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CPLChart />
        <ROIChart />
      </div>

      {/* Campaign table */}
      <CampaignSpendTable />
    </div>
  );
}
