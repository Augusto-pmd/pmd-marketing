"use client";

import { motion } from "framer-motion";
import { Mail, Clock, MousePointer2, Eye } from "lucide-react";

type Step =
  | {
      kind: "email";
      title: string;
      subject: string;
      openRate: number;
      clickRate: number;
    }
  | { kind: "wait"; days: number };

const STEPS: Step[] = [
  {
    kind: "email",
    title: "Email 1 · Bienvenida",
    subject: "Gracias por tu interés en PMD",
    openRate: 68.4,
    clickRate: 24.2,
  },
  { kind: "wait", days: 3 },
  {
    kind: "email",
    title: "Email 2 · Casos de éxito",
    subject: "Mirá los proyectos que entregamos en 2025",
    openRate: 42.1,
    clickRate: 14.8,
  },
  { kind: "wait", days: 7 },
  {
    kind: "email",
    title: "Email 3 · Cotización",
    subject: "¿Listo para cotizar tu obra?",
    openRate: 31.6,
    clickRate: 9.4,
  },
];

export function DripSequence() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Secuencia automática
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Drip · Onboarding leads
          </h3>
        </div>
        <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success">
          ● Activa
        </span>
      </div>

      <div className="p-5">
        <div className="relative space-y-3">
          {STEPS.map((step, i) => {
            if (step.kind === "wait") {
              return (
                <motion.div
                  key={`wait-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 pl-4"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-surface-2">
                    <Clock className="h-3 w-3 text-muted" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Esperar {step.days} días
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={`email-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative rounded-lg border border-cyan/20 bg-cyan/[0.04] p-3 hover:border-cyan/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10">
                    <Mail className="h-4 w-4 text-cyan" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                        {step.title}
                      </div>
                    </div>
                    <div className="mt-0.5 truncate text-sm text-foreground">
                      {step.subject}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px]">
                      <span className="flex items-center gap-1 text-muted">
                        <Eye className="h-3 w-3" />
                        Apertura
                        <span className="font-mono text-success tabular-nums">
                          {step.openRate.toFixed(1)}%
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-muted">
                        <MousePointer2 className="h-3 w-3" />
                        Clicks
                        <span className="font-mono text-amber tabular-nums">
                          {step.clickRate.toFixed(1)}%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
