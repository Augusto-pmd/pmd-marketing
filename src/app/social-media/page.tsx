"use client";

import { useState } from "react";
import { TrendingUp, Hash, Clock, Share2 } from "lucide-react";
import { PostCalendar } from "@/components/social/post-calendar";
import { PostComposer } from "@/components/social/post-composer";
import { FeedPreview } from "@/components/social/feed-preview";

type Platform = "instagram" | "facebook" | "linkedin" | "tiktok";

const HASHTAGS = [
  "#arquitectura",
  "#construccionAR",
  "#diseñoModular",
  "#casasModernas",
  "#obrasPilar",
  "#sustentable",
];

export default function SocialMediaPage() {
  const [composerState, setComposerState] = useState<{
    text: string;
    platforms: Platform[];
  }>({ text: "", platforms: ["instagram"] });

  return (
    <div className="space-y-6">
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
            <div className="border-b border-white/5 px-5 py-4">
              <h3 className="text-sm font-semibold text-foreground">
                Métricas rápidas
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10">
                    <TrendingUp className="h-3.5 w-3.5 text-cyan" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Posts esta semana</p>
                    <p className="font-mono text-base font-semibold text-foreground tabular-nums">
                      14
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-success">+3</span>
              </div>

              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-magenta/30 bg-magenta/10">
                    <Share2 className="h-3.5 w-3.5 text-magenta" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Engagement rate</p>
                    <p className="font-mono text-base font-semibold text-foreground tabular-nums">
                      6.4%
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs text-success">+0.8%</span>
              </div>

              <div className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-amber/30 bg-amber/10">
                    <Clock className="h-3.5 w-3.5 text-amber" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Mejor horario</p>
                    <p className="font-mono text-base font-semibold text-foreground tabular-nums">
                      18:30 — 20:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
            <div className="border-b border-white/5 px-5 py-4 flex items-center gap-2">
              <Hash className="h-3.5 w-3.5 text-cyan" />
              <h3 className="text-sm font-semibold text-foreground">
                Hashtags top
              </h3>
            </div>
            <div className="p-5 flex flex-wrap gap-2">
              {HASHTAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cyan/20 bg-cyan/5 px-2.5 py-1 font-mono text-xs text-cyan/90 hover:border-cyan/50 hover:bg-cyan/10 transition-all cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-gradient-to-br from-magenta/5 to-cyan/5 backdrop-blur-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                Insight IA
              </span>
            </div>
            <p className="text-xs text-foreground leading-relaxed">
              Los carruseles con planos arquitectónicos generan{" "}
              <span className="text-cyan font-semibold">2.3x más engagement</span>{" "}
              que las fotos individuales. Considerá programar uno esta semana.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
