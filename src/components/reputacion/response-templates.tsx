"use client";

import { Heart, ShieldAlert, RefreshCcw, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Template = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "success" | "magenta" | "cyan";
  preview: string;
};

const TEMPLATES: Template[] = [
  {
    id: "thanks",
    title: "Agradecimiento",
    icon: Heart,
    accent: "success",
    preview:
      "¡Muchas gracias por tu reseña! Nos llena de alegría haber sido parte de tu proyecto. Es un orgullo trabajar para clientes como vos.",
  },
  {
    id: "apology",
    title: "Disculpa",
    icon: ShieldAlert,
    accent: "magenta",
    preview:
      "Lamentamos profundamente que tu experiencia no haya cumplido con tus expectativas. Nos gustaría conversar para entender mejor y mejorar.",
  },
  {
    id: "comeback",
    title: "Invitación a volver",
    icon: RefreshCcw,
    accent: "cyan",
    preview:
      "¡Gracias por tus palabras! Si en el futuro pensás en una ampliación, refacción o nuevo proyecto, contá con nosotros. Tu confianza es nuestro mayor reconocimiento.",
  },
];

const ACCENT_STYLES = {
  success: {
    border: "border-success/30",
    bg: "bg-success/10",
    text: "text-success",
    glow: "hover:shadow-glow-success",
  },
  magenta: {
    border: "border-magenta/30",
    bg: "bg-magenta/10",
    text: "text-magenta",
    glow: "hover:shadow-glow-magenta",
  },
  cyan: {
    border: "border-cyan/30",
    bg: "bg-cyan/10",
    text: "text-cyan",
    glow: "hover:shadow-glow-cyan",
  },
};

export function ResponseTemplates() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Plantillas
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Respuestas rápidas
          </h3>
        </div>
        <button
          type="button"
          className="rounded-md border border-white/10 bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-foreground"
        >
          + Nueva
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-5">
        {TEMPLATES.map((t) => {
          const Icon = t.icon;
          const styles = ACCENT_STYLES[t.accent];
          return (
            <div
              key={t.id}
              className={cn(
                "rounded-lg border p-4 transition-all",
                styles.border,
                styles.bg.replace("/10", "/[0.04]"),
                styles.glow
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border",
                    styles.border,
                    styles.bg
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", styles.text)} />
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  {t.title}
                </h4>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-3">
                {t.preview}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={cn(
                    "flex-1 rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all",
                    styles.border,
                    styles.bg,
                    styles.text,
                    "hover:brightness-125"
                  )}
                >
                  Usar
                </button>
                <button
                  type="button"
                  className="rounded-md border border-white/10 bg-surface-2 px-2.5 py-1.5 text-muted hover:text-foreground transition-colors"
                  title="Copiar"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
