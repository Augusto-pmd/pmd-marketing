"use client";

import { Sparkles, TrendingUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

const SUGGESTIONS = [
  {
    title: "Cómo elegir entre construcción tradicional y modular en 2026",
    keyword: "construcción modular vs tradicional",
    volume: 1900,
    difficulty: 38,
    intent: "Informacional",
  },
  {
    title: "Guía completa: cuánto cuesta construir una casa en Pilar",
    keyword: "cuánto cuesta construir casa Pilar",
    volume: 4400,
    difficulty: 52,
    intent: "Transaccional",
  },
  {
    title: "10 errores al cotizar una obra (y cómo evitarlos)",
    keyword: "errores cotización obra construcción",
    volume: 880,
    difficulty: 24,
    intent: "Informacional",
  },
  {
    title: "Tendencias en arquitectura sustentable Argentina 2026",
    keyword: "arquitectura sustentable Argentina",
    volume: 1200,
    difficulty: 31,
    intent: "Informacional",
  },
  {
    title: "Casas de campo modulares: tiempos y costos reales",
    keyword: "casas de campo modulares costos",
    volume: 720,
    difficulty: 22,
    intent: "Comercial",
  },
];

export function ContentSuggestions() {
  const { toast } = useToast();
  const handleCreate = (title: string) => {
    toast({
      title: "Briefing generado",
      description: `Outline para "${title}" listo en Content Studio.`,
      variant: "success",
    });
  };
  return (
    <div className="rounded-xl border border-amber/20 bg-gradient-to-br from-amber/[0.04] to-magenta/[0.03] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber/40 bg-amber/10 glow-amber">
            <Sparkles className="h-4 w-4 text-amber" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
              IA · Sugerencias
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Ideas de contenido por keywords trending
            </h3>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          5 ideas · refrescado hoy
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {SUGGESTIONS.map((s, i) => (
          <div
            key={s.title}
            className="flex items-start justify-between gap-4 p-4 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-amber/30 bg-amber/10 font-mono text-[10px] font-semibold text-amber tabular-nums">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground">
                  {s.title}
                </h4>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan/20 bg-cyan/[0.04] px-2 py-0.5 font-mono text-[10px] text-cyan">
                    <TrendingUp className="h-2.5 w-2.5" />
                    {s.keyword}
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    Vol.{" "}
                    <span className="text-foreground tabular-nums">
                      {s.volume.toLocaleString("es-AR")}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] text-muted">
                    Dif.{" "}
                    <span
                      className={cn(
                        "tabular-nums",
                        s.difficulty < 30
                          ? "text-success"
                          : s.difficulty < 60
                          ? "text-amber"
                          : "text-magenta"
                      )}
                    >
                      {s.difficulty}
                    </span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-magenta">
                    {s.intent}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCreate(s.title)}
              className="flex shrink-0 items-center gap-1.5 rounded-md border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber hover:bg-amber/20 hover:shadow-glow-amber transition-all"
            >
              <Plus className="h-3 w-3" />
              Crear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
