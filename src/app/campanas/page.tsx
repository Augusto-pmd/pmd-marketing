"use client";

import { Mail, Send, Eye, MousePointer2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { CampaignList } from "@/components/campanas/campaign-list";
import { CampaignBuilder } from "@/components/campanas/campaign-builder";
import { DripSequence } from "@/components/campanas/drip-sequence";
import { ABTest } from "@/components/campanas/ab-test";

export default function CampanasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Campañas
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Mail className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            6 campañas · 3 activas
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Emails enviados"
          value="14.9k"
          delta="+18% vs mes ant."
          trend="up"
          icon={Send}
          accent="cyan"
          index={0}
        />
        <StatCard
          label="Tasa apertura prom."
          value="34.2%"
          delta="+2.1 pp"
          trend="up"
          icon={Eye}
          accent="success"
          index={1}
        />
        <StatCard
          label="Tasa clicks prom."
          value="6.8%"
          delta="+0.4 pp"
          trend="up"
          icon={MousePointer2}
          accent="amber"
          index={2}
        />
        <StatCard
          label="Conversiones"
          value="284"
          delta="+12 esta sem."
          trend="up"
          icon={Mail}
          accent="magenta"
          index={3}
        />
      </div>

      {/* Builder */}
      <CampaignBuilder />

      {/* Two-column area */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <DripSequence />
        <ABTest />
      </div>

      {/* Campaign list */}
      <CampaignList />
    </div>
  );
}
