"use client";

import { Users, Target, Send, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { NodeGraph } from "@/components/dashboard/node-graph";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ScheduledPosts } from "@/components/dashboard/scheduled-posts";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Vista general
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Dashboard
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Datos en vivo
          </span>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Seguidores totales"
          value="12.847"
          delta="+340 esta semana"
          trend="up"
          icon={Users}
          accent="cyan"
          index={0}
        />
        <StatCard
          label="Leads activos"
          value="23"
          delta="+5 vs semana anterior"
          trend="up"
          icon={Target}
          accent="success"
          index={1}
        />
        <StatCard
          label="Campañas activas"
          value="3"
          delta="2 finalizan esta semana"
          trend="neutral"
          icon={Send}
          accent="magenta"
          index={2}
        />
        <StatCard
          label="ROI Marketing"
          value="340%"
          delta="+42% vs mes anterior"
          trend="up"
          icon={TrendingUp}
          accent="amber"
          index={3}
        />
      </div>

      {/* Main node graph */}
      <NodeGraph />

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ActivityFeed />
        <ScheduledPosts />
      </div>
    </div>
  );
}
