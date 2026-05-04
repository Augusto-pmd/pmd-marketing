"use client";

import { Search, Link as LinkIcon, Hash, Globe } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { KeywordTracker } from "@/components/seo/keyword-tracker";
import { CompetitorComparison } from "@/components/seo/competitor-comparison";
import { SiteHealth } from "@/components/seo/site-health";
import { ContentSuggestions } from "@/components/seo/content-suggestions";

export default function SEOPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">SEO</h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Globe className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            pmdarquitectura.com.ar
          </span>
        </div>
      </div>

      {/* Domain overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Domain Authority"
          value="42"
          delta="+3 vs trim. ant."
          trend="up"
          icon={Globe}
          accent="cyan"
          index={0}
        />
        <StatCard
          label="Backlinks"
          value="156"
          delta="+12 nuevos"
          trend="up"
          icon={LinkIcon}
          accent="magenta"
          index={1}
        />
        <StatCard
          label="Keywords ranqueadas"
          value="89"
          delta="+8 este mes"
          trend="up"
          icon={Hash}
          accent="amber"
          index={2}
        />
        <StatCard
          label="Tráfico orgánico/mes"
          value="2.340"
          delta="+18%"
          trend="up"
          icon={Search}
          accent="success"
          index={3}
        />
      </div>

      {/* Keywords */}
      <KeywordTracker />

      {/* Competitor + Site health */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CompetitorComparison />
        </div>
        <SiteHealth />
      </div>

      {/* Content suggestions */}
      <ContentSuggestions />
    </div>
  );
}
