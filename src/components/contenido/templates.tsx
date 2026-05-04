"use client";

import { Layers, Film, Square, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Template = {
  id: string;
  name: string;
  type: "Story" | "Carrusel" | "Reel" | "Post";
  icon: React.ComponentType<{ className?: string }>;
  aspect: string;
  gradient: string;
  accent: "cyan" | "magenta" | "amber" | "success";
};

const TEMPLATES: Template[] = [
  {
    id: "t1",
    name: "Story · Cita inspiracional",
    type: "Story",
    icon: BookOpen,
    aspect: "aspect-[9/16]",
    gradient: "from-magenta/30 via-cyan/15 to-amber/20",
    accent: "magenta",
  },
  {
    id: "t2",
    name: "Carrusel · Antes y después",
    type: "Carrusel",
    icon: Layers,
    aspect: "aspect-square",
    gradient: "from-cyan/25 via-info/15 to-magenta/20",
    accent: "cyan",
  },
  {
    id: "t3",
    name: "Reel · Tour de obra 30s",
    type: "Reel",
    icon: Film,
    aspect: "aspect-[9/16]",
    gradient: "from-amber/30 via-magenta/15 to-cyan/15",
    accent: "amber",
  },
  {
    id: "t4",
    name: "Post · Testimonio cliente",
    type: "Post",
    icon: Square,
    aspect: "aspect-square",
    gradient: "from-success/20 via-cyan/15 to-info/20",
    accent: "success",
  },
  {
    id: "t5",
    name: "Carrusel · Tips de diseño",
    type: "Carrusel",
    icon: Layers,
    aspect: "aspect-square",
    gradient: "from-info/20 via-magenta/15 to-amber/15",
    accent: "cyan",
  },
  {
    id: "t6",
    name: "Story · Encuesta interactiva",
    type: "Story",
    icon: BookOpen,
    aspect: "aspect-[9/16]",
    gradient: "from-cyan/20 via-amber/20 to-magenta/15",
    accent: "magenta",
  },
];

const TYPE_ACCENT: Record<Template["accent"], string> = {
  cyan: "border-cyan/30 text-cyan bg-cyan/5",
  magenta: "border-magenta/30 text-magenta bg-magenta/5",
  amber: "border-amber/30 text-amber bg-amber/5",
  success: "border-success/30 text-success bg-success/5",
};

export function Templates() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Templates
        </span>
        <h3 className="text-sm font-semibold text-foreground">
          Plantillas listas para usar
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-3 xl:grid-cols-6">
        {TEMPLATES.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <article
              key={tpl.id}
              className="group cursor-pointer overflow-hidden rounded-lg border border-white/5 bg-surface-2 transition-all hover:border-cyan/40 hover:shadow-glow-cyan"
            >
              <div
                className={cn(
                  "relative w-full bg-gradient-to-br overflow-hidden",
                  tpl.aspect,
                  tpl.gradient
                )}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-foreground/40" />
                </div>
                <div className="absolute top-2 left-2">
                  <span
                    className={cn(
                      "rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur",
                      TYPE_ACCENT[tpl.accent]
                    )}
                  >
                    {tpl.type}
                  </span>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground truncate group-hover:text-cyan transition-colors">
                  {tpl.name}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
