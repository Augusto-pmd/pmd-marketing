"use client";

import { Trophy, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = {
  id: "A" | "B";
  subject: string;
  openRate: number;
  clickRate: number;
  sent: number;
};

const VARIANTS: Variant[] = [
  {
    id: "A",
    subject: "🏗️ Cotización en 48 horas para tu obra",
    openRate: 28.4,
    clickRate: 4.6,
    sent: 1240,
  },
  {
    id: "B",
    subject: "Diseñá tu casa modular premium con PMD",
    openRate: 41.8,
    clickRate: 9.2,
    sent: 1240,
  },
];

const WINNER: Variant["id"] = "B";

export function ABTest() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Test A/B
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Comparativa de asuntos · Newsletter Mayo
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          2.480 envíos · finalizada
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
        {VARIANTS.map((v) => {
          const isWinner = v.id === WINNER;
          return (
            <div
              key={v.id}
              className={cn(
                "relative p-5",
                isWinner && "bg-success/[0.03]"
              )}
            >
              {isWinner && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success shadow-glow-success">
                  <Trophy className="h-3 w-3" />
                  Ganadora
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border font-mono text-xs font-bold",
                    isWinner
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-white/10 bg-surface-2 text-muted"
                  )}
                >
                  {v.id}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  Variante {v.id}
                </span>
              </div>

              <div className="flex items-start gap-2 mb-4">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
                <span className="text-sm text-foreground">{v.subject}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Apertura
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span
                      className={cn(
                        "font-mono text-2xl font-semibold tabular-nums",
                        isWinner ? "text-success" : "text-foreground"
                      )}
                    >
                      {v.openRate.toFixed(1)}
                    </span>
                    <span className="font-mono text-xs text-muted">%</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        isWinner
                          ? "bg-success shadow-[0_0_8px_rgba(0,255,136,0.6)]"
                          : "bg-muted/50"
                      )}
                      style={{ width: `${v.openRate * 2}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Clicks
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span
                      className={cn(
                        "font-mono text-2xl font-semibold tabular-nums",
                        isWinner ? "text-success" : "text-foreground"
                      )}
                    >
                      {v.clickRate.toFixed(1)}
                    </span>
                    <span className="font-mono text-xs text-muted">%</span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        isWinner
                          ? "bg-success shadow-[0_0_8px_rgba(0,255,136,0.6)]"
                          : "bg-muted/50"
                      )}
                      style={{ width: `${v.clickRate * 8}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted">
                {v.sent.toLocaleString("es-AR")} envíos
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
