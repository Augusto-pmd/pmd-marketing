import { BarChart3 } from "lucide-react";
import { OverviewCards } from "@/components/analytics/overview-cards";
import { MainChart } from "@/components/analytics/main-chart";
import { PlatformChart } from "@/components/analytics/platform-chart";
import { TopPosts } from "@/components/analytics/top-posts";
import { Demographics } from "@/components/analytics/demographics";
import { PageMotion } from "@/components/ui/page-motion";

export default function AnalyticsPage() {
  return (
    <PageMotion className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Analytics
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <BarChart3 className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Sincronizado hace 2 min
          </span>
        </div>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MainChart />
        </div>
        <PlatformChart />
      </div>

      <TopPosts />

      <Demographics />
    </PageMotion>
  );
}
