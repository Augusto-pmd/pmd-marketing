import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

export function ComingSoon({
  title,
  description,
  icon: Icon,
  features = [],
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl p-10">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 glow-cyan">
            <Icon className="h-7 w-7 text-cyan" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-foreground">
            Próximamente
          </h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>

          {features.length > 0 && (
            <div className="mt-6 rounded-lg border border-white/5 bg-surface-2 p-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-3 w-3 text-amber" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-amber">
                  Funciones planificadas
                </span>
              </div>
              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan shadow-[0_0_4px_rgba(0,240,255,0.6)]" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
