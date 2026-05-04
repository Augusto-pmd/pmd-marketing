"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Keyword = {
  term: string;
  position: number;
  change: number;
  volume: number;
  difficulty: number;
  url: string;
};

const KEYWORDS: Keyword[] = [
  {
    term: "casas modulares premium",
    position: 3,
    change: 2,
    volume: 2400,
    difficulty: 42,
    url: "/casas-modulares",
  },
  {
    term: "construcción mano de obra Pilar",
    position: 5,
    change: 1,
    volume: 880,
    difficulty: 28,
    url: "/servicios/construccion",
  },
  {
    term: "arquitecto Buenos Aires Norte",
    position: 8,
    change: -2,
    volume: 1300,
    difficulty: 56,
    url: "/",
  },
  {
    term: "casa llave en mano",
    position: 12,
    change: 4,
    volume: 5400,
    difficulty: 71,
    url: "/llave-en-mano",
  },
  {
    term: "diseño bioclimático argentina",
    position: 6,
    change: 0,
    volume: 320,
    difficulty: 22,
    url: "/blog/bioclimatica",
  },
  {
    term: "cotización obra constructora",
    position: 14,
    change: 7,
    volume: 1900,
    difficulty: 48,
    url: "/cotizar",
  },
  {
    term: "PMD arquitectura",
    position: 1,
    change: 0,
    volume: 480,
    difficulty: 8,
    url: "/",
  },
];

function diffColor(d: number) {
  if (d < 30) return "text-success";
  if (d < 60) return "text-amber";
  return "text-magenta";
}

export function KeywordTracker() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10">
            <Search className="h-4 w-4 text-cyan" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Tracker
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Keywords en Google
            </h3>
          </div>
        </div>
        <button
          type="button"
          className="rounded-md border border-white/10 bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-foreground"
        >
          + Agregar keyword
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Keyword
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Pos.
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Δ
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Volumen
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted text-right">
                Dificultad
              </th>
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                URL
              </th>
            </tr>
          </thead>
          <tbody>
            {KEYWORDS.map((k, i) => {
              const TrendIcon =
                k.change > 0 ? ArrowUp : k.change < 0 ? ArrowDown : Minus;
              const trendColor =
                k.change > 0
                  ? "text-success"
                  : k.change < 0
                  ? "text-magenta"
                  : "text-muted";
              return (
                <motion.tr
                  key={k.term}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3 text-foreground font-medium">
                    {k.term}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span
                      className={cn(
                        "inline-block min-w-[28px] rounded-md border px-1.5 py-0.5 font-mono text-xs font-semibold tabular-nums text-center",
                        k.position <= 3
                          ? "border-success/40 bg-success/10 text-success"
                          : k.position <= 10
                          ? "border-cyan/30 bg-cyan/10 text-cyan"
                          : "border-white/10 bg-surface-2 text-muted"
                      )}
                    >
                      {k.position}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 font-mono text-xs tabular-nums",
                        trendColor
                      )}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {k.change !== 0 ? Math.abs(k.change) : "—"}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-foreground tabular-nums">
                    {k.volume.toLocaleString("es-AR")}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <span
                        className={cn(
                          "font-mono text-xs tabular-nums",
                          diffColor(k.difficulty)
                        )}
                      >
                        {k.difficulty}
                      </span>
                      <div className="h-1 w-12 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            k.difficulty < 30
                              ? "bg-success"
                              : k.difficulty < 60
                              ? "bg-amber"
                              : "bg-magenta"
                          )}
                          style={{ width: `${k.difficulty}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-cyan transition-colors cursor-pointer">
                      {k.url}
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
