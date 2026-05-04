"use client";

import { useState } from "react";
import {
  Sparkles,
  Calendar,
  Users,
  Send,
  Save,
  Eye,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Audience = "todos" | "leads-nuevos" | "clientes-activos" | "clientes-anteriores";

const AUDIENCES: Array<{ id: Audience; label: string; count: number }> = [
  { id: "todos", label: "Todos los contactos", count: 12480 },
  { id: "leads-nuevos", label: "Leads Nuevos", count: 248 },
  { id: "clientes-activos", label: "Clientes Activos", count: 86 },
  { id: "clientes-anteriores", label: "Clientes Anteriores", count: 412 },
];

const SUBJECT_SUGGESTIONS = [
  "Diseñá tu casa de ensueño con PMD — financiación a tu medida",
  "🏗️ Tu próxima obra empieza acá: cotización en 48hs",
  "Casas modulares premium · entrega en 6 meses",
];

export function CampaignBuilder() {
  const [name, setName] = useState("Lanzamiento Casas Modulares Q2");
  const [subject, setSubject] = useState(
    "🏠 Diseñá tu casa de ensueño con PMD Arquitectura"
  );
  const [audience, setAudience] = useState<Audience>("leads-nuevos");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [scheduleType, setScheduleType] = useState<"now" | "later">("later");

  const audienceData = AUDIENCES.find((a) => a.id === audience)!;

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Constructor
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Nueva campaña de email
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
          ● Borrador autoguardado
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        {/* Left: form */}
        <div className="p-5 space-y-5">
          {/* Name */}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Nombre de la campaña
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20"
            />
          </div>

          {/* Subject */}
          <div>
            <div className="flex items-center justify-between">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Asunto del email
              </label>
              <button
                type="button"
                onClick={() => setShowSuggestions((v) => !v)}
                className="flex items-center gap-1 rounded-md border border-amber/30 bg-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber hover:bg-amber/20 transition-all"
              >
                <Sparkles className="h-3 w-3" />
                Sugerir IA
              </button>
            </div>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20"
            />
            {showSuggestions && (
              <div className="mt-2 space-y-1.5 rounded-lg border border-amber/20 bg-amber/[0.04] p-2 animate-fade-in">
                {SUBJECT_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSubject(s);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left rounded-md px-2 py-1.5 text-xs text-foreground hover:bg-amber/10 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Audience */}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Audiencia
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {AUDIENCES.map((a) => {
                const active = audience === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAudience(a.id)}
                    className={cn(
                      "flex flex-col items-start gap-1 rounded-lg border p-2.5 text-left transition-all",
                      active
                        ? "border-cyan/40 bg-cyan/10 shadow-glow-cyan"
                        : "border-white/10 bg-surface-2 hover:border-white/20"
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          active ? "text-cyan" : "text-foreground"
                        )}
                      >
                        {a.label}
                      </span>
                      <Users
                        className={cn(
                          "h-3 w-3",
                          active ? "text-cyan" : "text-muted"
                        )}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-muted tabular-nums">
                      {a.count.toLocaleString("es-AR")} contactos
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Programación
            </label>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setScheduleType("now")}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                  scheduleType === "now"
                    ? "border-magenta/40 bg-magenta/10 text-magenta"
                    : "border-white/10 bg-surface-2 text-muted hover:text-foreground"
                )}
              >
                Enviar ahora
              </button>
              <button
                type="button"
                onClick={() => setScheduleType("later")}
                className={cn(
                  "flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all flex items-center justify-center gap-1.5",
                  scheduleType === "later"
                    ? "border-cyan/40 bg-cyan/10 text-cyan"
                    : "border-white/10 bg-surface-2 text-muted hover:text-foreground"
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                Programar
              </button>
            </div>
            {scheduleType === "later" && (
              <input
                type="datetime-local"
                defaultValue="2026-05-08T09:00"
                className="mt-2 w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 [color-scheme:dark]"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row pt-2">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface px-3 py-2.5 text-sm font-medium text-foreground hover:border-white/20"
            >
              <Save className="h-4 w-4" />
              Guardar Borrador
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-cyan/15 px-3 py-2.5 text-sm font-semibold text-cyan shadow-glow-cyan hover:bg-cyan/25 transition-all"
            >
              <Send className="h-4 w-4" />
              Enviar a {audienceData.count.toLocaleString("es-AR")} contactos
            </button>
          </div>
        </div>

        {/* Right: preview */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="h-3.5 w-3.5 text-muted" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Vista previa
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-2 overflow-hidden">
            {/* Mock email header */}
            <div className="border-b border-white/5 bg-[#0a0a10] px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="font-mono">De:</span>
                <span className="text-foreground">marketing@pmdarquitectura.com.ar</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                <span className="font-mono">Asunto:</span>
                <span className="text-foreground font-medium truncate">{subject}</span>
              </div>
            </div>
            {/* Mock email body */}
            <div className="bg-gradient-to-b from-cyan/[0.03] to-transparent p-6 min-h-[280px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-magenta/20 border border-cyan/30">
                  <Building2 className="h-4 w-4 text-cyan" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                    PMD Arquitectura
                  </div>
                  <div className="text-[10px] text-muted">
                    Construyendo el futuro
                  </div>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Hola, [Nombre] 👋
              </h2>
              <p className="text-xs text-muted leading-relaxed mb-3">
                Diseñamos casas modulares premium con tiempos de entrega de
                6 meses, certificadas y con financiación flexible. Conocé
                nuestros últimos proyectos en Pilar, Nordelta y Tigre.
              </p>
              <div className="my-4 rounded-lg border border-cyan/20 bg-cyan/[0.05] p-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-cyan mb-1">
                  Promo Mayo
                </div>
                <div className="text-sm text-foreground font-semibold">
                  Cotización express en 48hs
                </div>
              </div>
              <button
                type="button"
                className="w-full rounded-lg border border-cyan/40 bg-cyan/15 py-2 text-xs font-semibold text-cyan"
              >
                Quiero mi cotización →
              </button>
              <div className="mt-4 text-center text-[10px] text-muted">
                PMD Arquitectura SRL · Buenos Aires, Argentina
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
