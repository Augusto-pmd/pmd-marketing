"use client";

import { Workflow, Zap, Activity, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { FlowEditor } from "@/components/automatizacion/flow-editor";
import { WorkflowList } from "@/components/automatizacion/workflow-list";
import { ActivityLog } from "@/components/automatizacion/activity-log";

export default function AutomatizacionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Automatización
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Zap className="h-3.5 w-3.5 text-magenta" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Motor de flujos · activo
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Workflows activos"
          value="3"
          delta="+1 este mes"
          trend="up"
          icon={Workflow}
          accent="magenta"
          index={0}
        />
        <StatCard
          label="Ejecuciones (mes)"
          value="372"
          delta="+24% vs mes ant."
          trend="up"
          icon={Activity}
          accent="cyan"
          index={1}
        />
        <StatCard
          label="Tasa de éxito"
          value="96.4%"
          delta="+1.2 pp"
          trend="up"
          icon={CheckCircle2}
          accent="success"
          index={2}
        />
        <StatCard
          label="Horas ahorradas"
          value="48h"
          delta="estimado mensual"
          trend="up"
          icon={Zap}
          accent="amber"
          index={3}
        />
      </div>

      {/* Flow editor */}
      <FlowEditor />

      {/* Workflow list */}
      <WorkflowList />

      {/* Activity log */}
      <ActivityLog />
    </div>
  );
}
