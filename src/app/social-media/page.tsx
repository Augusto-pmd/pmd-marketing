"use client";

import { useState } from "react";
import { TrendingUp, Hash, Clock, Share2, Sparkles } from "lucide-react";
import { PostCalendar } from "@/components/social/post-calendar";
import { PostComposer } from "@/components/social/post-composer";
import { FeedPreview } from "@/components/social/feed-preview";
import { PageMotion } from "@/components/ui/page-motion";

type Platform = "instagram" | "facebook" | "linkedin" | "tiktok";

const HASHTAGS = [
  "#arquitectura",
  "#construccionAR",
  "#diseñoModular",
  "#casasModernas",
  "#obrasPilar",
  "#sustentable",
];

type Metric = {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  delta?: string;
  accent: "cyan" | "magenta" | "amber" | "success";
};

const METRICS: Metric[] = [
  {
    icon: TrendingUp,
    label: "Posts esta semana",
    value: "14",
    delta: "+3 vs sem. ant.",
    accent: "cyan",
  },
  {
    icon: Share2,
    label: "Engagement rate",
    value: "6,4%",
    delta: "+0,8 pp",
    accent: "magenta",
  },
  {
    icon: Clock,
    label: "Mejor horario",
    value: "18:30",
    delta: "Lun · Mié · Vie",
    accent: "amber",
  },
];

const ACCENT_RING: Record<Metric["accent"], string> = {
  cyan: "border-cyan/30 bg-cyan/10 text-cyan",
  magenta: "border-magenta/30 bg-magenta/10 text-magenta",
  amber: "border-amber/30 bg-amber/10 text-amber",
  success: "border-success/30 bg-success/10 text-success",
};

export default function SocialMediaPage() {
  const [composerState, setComposerState] = useState<{
    text: string;
    platforms: Platform[];
  }>({ text: "", platforms: ["instagram"] });

  return (
    <PageMotion className="space-y-6">
      {/* Page heading */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Social Media
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Share2 className="h-3.5 w-3.5 text-magenta" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            4 cuentas conectadas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left/main column */}
        <div className="lg:col-span-2 space-y-6">
          <PostCalendar />
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <PostComposer onChange={setComposerState} />
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Vista previa
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {composerState.platforms.length} plataforma
                  {composerState.platforms.length === 1 ? "" : "s"}
                </span>
              </div>
              <FeedPreview
                text={composerState.text}
                platforms={composerState.platforms}
              />
            </div>
          </div>
        </div>

        {/* Stats sidebar */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">
                Métricas rápidas
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                7 días
              </span>
            </div>
            <ul className="divide-y divide-white/5">
              {METRICS.map((m) => {
                const Icon = m.icon;
                return (
                  <li
                    key={m.label}
                    className="flex items-center gap-3 px-5 py-3.5"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${ACCENT_RING[m.accent]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-muted font-mono">
                        {m.label}
                      </p>
                      <p className="font-mono text-lg font-semibold text-foreground tabular-nums leading-tight">
                        {m.value}
                      </p>
                    </div>
                    {m.delta && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-success shrink-0">
                        {m.delta}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
            <div className="border-b border-white/5 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="h-3.5 w-3.5 text-cyan" />
                <h3 className="text-sm font-semibold text-foreground">
                  Hashtags top
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {HASHTAGS.length}
              </span>
            </div>
            <div className="p-5 flex flex-wrap gap-2">
              {HASHTAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setComposerState((s) => ({
                      ...s,
                      text: s.text ? `${s.text} ${tag}` : tag,
                    }))
                  }
                  className="rounded-full border border-cyan/20 bg-cyan/5 px-2.5 py-1 font-mono text-xs text-cyan/90 hover:border-cyan/50 hover:bg-cyan/10 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
                  title="Agregar al composer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-magenta/20 bg-gradient-to-br from-magenta/[0.06] to-cyan/[0.05] backdrop-blur-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex h-7 w-7 items-center justify-center rounded-md border border-magenta/40 bg-magenta/10">
                <Sparkles className="h-3.5 w-3.5 text-magenta" />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-wider text-magenta">
                  Insight IA
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                  Powered by Claude
                </span>
              </div>
            </div>
            <p className="text-xs text-foreground leading-relaxed">
              Los carruseles con planos arquitectónicos generan{" "}
              <span className="text-cyan font-semibold">
                2,3× más engagement
              </span>{" "}
              que las fotos individuales. Considerá programar uno esta semana.
            </p>
          </div>
        </aside>
      </div>
    </PageMotion>
  );
}
