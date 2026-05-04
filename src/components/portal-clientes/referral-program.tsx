"use client";

import { useState } from "react";
import { Gift, Copy, Send, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const REFERRAL_LINK = "https://pmdarquitectura.com.ar/r/AUGUSTO-MN29";

export function ReferralProgram() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="rounded-xl border border-magenta/20 bg-gradient-to-br from-magenta/[0.05] to-cyan/[0.04] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-magenta/40 bg-magenta/10 glow-magenta">
            <Gift className="h-4 w-4 text-magenta" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-magenta">
              Programa de referidos
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Referí · ganá comisión
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5">
        <div className="rounded-lg border border-cyan/20 bg-cyan/[0.04] p-4">
          <div className="flex items-center gap-2">
            <Send className="h-3.5 w-3.5 text-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
              Referidos enviados
            </span>
          </div>
          <div className="mt-2 font-mono text-2xl font-semibold text-foreground tabular-nums">
            48
          </div>
          <span className="font-mono text-[10px] text-muted">
            +6 este mes
          </span>
        </div>
        <div className="rounded-lg border border-success/20 bg-success/[0.04] p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-success" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-success">
              Conversiones
            </span>
          </div>
          <div className="mt-2 font-mono text-2xl font-semibold text-foreground tabular-nums">
            12
          </div>
          <span className="font-mono text-[10px] text-muted">
            25% tasa de cierre
          </span>
        </div>
        <div className="rounded-lg border border-amber/20 bg-amber/[0.04] p-4">
          <div className="flex items-center gap-2">
            <Award className="h-3.5 w-3.5 text-amber" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-amber">
              Recompensas
            </span>
          </div>
          <div className="mt-2 font-mono text-2xl font-semibold text-foreground tabular-nums">
            $384k
          </div>
          <span className="font-mono text-[10px] text-muted">
            ARS acumulado
          </span>
        </div>
      </div>

      {/* Link */}
      <div className="px-5 pb-5">
        <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Tu link único de referido
        </label>
        <div className="mt-2 flex flex-col-reverse sm:flex-row gap-2">
          <div className="flex-1 rounded-lg border border-white/10 bg-surface-2 px-3 py-2.5 font-mono text-xs text-foreground truncate">
            {REFERRAL_LINK}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all",
              copied
                ? "border-success/40 bg-success/15 text-success shadow-glow-success"
                : "border-magenta/40 bg-magenta/15 text-magenta shadow-glow-magenta hover:bg-magenta/25"
            )}
          >
            <Copy className="h-3.5 w-3.5" />
            {copied ? "¡Copiado!" : "Copiar link"}
          </button>
        </div>
      </div>
    </div>
  );
}
