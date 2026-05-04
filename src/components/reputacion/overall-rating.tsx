"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const RATING = 4.7;
const TOTAL = 248;
const DISTRIBUTION = [
  { stars: 5, count: 178 },
  { stars: 4, count: 48 },
  { stars: 3, count: 14 },
  { stars: 2, count: 5 },
  { stars: 1, count: 3 },
];

export function OverallRating() {
  const max = Math.max(...DISTRIBUTION.map((d) => d.count));

  return (
    <div className="rounded-xl border border-amber/20 bg-gradient-to-br from-amber/[0.05] to-transparent backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
            Reputación general
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Calificación consolidada
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Últimos 12 meses
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
        {/* Score */}
        <div className="flex flex-col items-center justify-center p-6 gap-3">
          <div className="font-mono text-6xl font-semibold text-amber text-glow-amber tabular-nums">
            {RATING.toFixed(1)}
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => {
              const filled = s <= Math.floor(RATING);
              const half = s === Math.ceil(RATING) && RATING % 1 >= 0.5;
              return (
                <Star
                  key={s}
                  className={cn(
                    "h-5 w-5 transition-all",
                    filled
                      ? "fill-amber text-amber drop-shadow-[0_0_4px_rgba(255,184,0,0.6)]"
                      : half
                      ? "fill-amber/50 text-amber/70"
                      : "text-white/15"
                  )}
                />
              );
            })}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {TOTAL} reseñas verificadas
          </div>
        </div>
        {/* Distribution */}
        <div className="p-5 space-y-2">
          {DISTRIBUTION.map((d, i) => {
            const pct = (d.count / max) * 100;
            return (
              <motion.div
                key={d.stars}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="flex w-12 items-center gap-0.5 font-mono text-xs text-muted">
                  <span className="tabular-nums">{d.stars}</span>
                  <Star className="h-3 w-3 fill-amber text-amber" />
                </div>
                <div className="relative flex-1 h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      d.stars >= 4
                        ? "bg-success shadow-[0_0_8px_rgba(0,255,136,0.5)]"
                        : d.stars === 3
                        ? "bg-amber shadow-[0_0_8px_rgba(255,184,0,0.5)]"
                        : "bg-magenta shadow-[0_0_8px_rgba(255,0,229,0.5)]"
                    )}
                  />
                </div>
                <span className="w-10 text-right font-mono text-xs text-foreground tabular-nums">
                  {d.count}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
