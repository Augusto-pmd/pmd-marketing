"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  type Contact,
  type LeadSource,
  type LeadStage,
  STAGE_LABEL,
  STAGE_ACCENT,
  SOURCE_ACCENT,
} from "@/lib/crm-data";
import { cn } from "@/lib/utils";

const STAGE_FILTERS: Array<{ id: LeadStage | "all"; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "nuevo", label: "Nuevos" },
  { id: "contactado", label: "Contactados" },
  { id: "propuesta", label: "Propuesta" },
  { id: "negociacion", label: "Negociación" },
  { id: "cliente", label: "Clientes" },
];

const SOURCE_FILTERS: Array<{ id: LeadSource | "all"; label: string }> = [
  { id: "all", label: "Todas las fuentes" },
  { id: "Instagram", label: "Instagram" },
  { id: "Facebook", label: "Facebook" },
  { id: "Web", label: "Web" },
  { id: "Referido", label: "Referidos" },
  { id: "WhatsApp", label: "WhatsApp" },
];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85
      ? "text-success border-success/40 bg-success/10"
      : score >= 70
      ? "text-amber border-amber/40 bg-amber/10"
      : "text-muted border-white/10 bg-surface-2";

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className={cn("font-mono text-xs tabular-nums px-1.5 py-0.5 rounded border", color)}>
        {score}
      </span>
      <div className="h-1 flex-1 max-w-[60px] rounded-full bg-white/5 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full",
            score >= 85
              ? "bg-success shadow-[0_0_8px_rgba(0,255,136,0.6)]"
              : score >= 70
              ? "bg-amber shadow-[0_0_8px_rgba(255,184,0,0.4)]"
              : "bg-muted/40"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function ContactTable({
  contacts,
  onSelect,
}: {
  contacts: Contact[];
  onSelect: (c: Contact) => void;
}) {
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<LeadStage | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<LeadSource | "all">("all");

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      if (stageFilter !== "all" && c.stage !== stageFilter) return false;
      if (sourceFilter !== "all" && c.source !== sourceFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
        );
      }
      return true;
    });
  }, [contacts, query, stageFilter, sourceFilter]);

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex flex-wrap items-center gap-3">
        <h3 className="text-sm font-semibold text-foreground">
          Contactos
          <span className="ml-2 font-mono text-xs text-muted">
            {filtered.length}/{contacts.length}
          </span>
        </h3>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="rounded-lg border border-white/5 bg-surface-2 py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted/60 focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-colors w-44"
            />
          </div>

          <div className="relative">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value as LeadStage | "all")}
              className="appearance-none rounded-lg border border-white/5 bg-surface-2 py-1.5 pl-3 pr-7 text-xs text-foreground hover:border-cyan/30 focus:border-cyan/40 focus:outline-none transition-colors cursor-pointer"
            >
              {STAGE_FILTERS.map((f) => (
                <option key={f.id} value={f.id} className="bg-surface">
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as LeadSource | "all")}
              className="appearance-none rounded-lg border border-white/5 bg-surface-2 py-1.5 pl-3 pr-7 text-xs text-foreground hover:border-cyan/30 focus:border-cyan/40 focus:outline-none transition-colors cursor-pointer"
            >
              {SOURCE_FILTERS.map((f) => (
                <option key={f.id} value={f.id} className="bg-surface">
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Nombre
              </th>
              <th className="px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Email
              </th>
              <th className="hidden lg:table-cell px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Teléfono
              </th>
              <th className="px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Origen
              </th>
              <th className="px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Estado
              </th>
              <th className="hidden md:table-cell px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Último
              </th>
              <th className="px-5 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((c) => {
              const stage = STAGE_ACCENT[c.stage];
              return (
                <tr
                  key={c.id}
                  onClick={() => onSelect(c)}
                  className="cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan/30 to-magenta/30 border border-white/10 text-[10px] font-semibold text-foreground">
                        {c.initials}
                      </div>
                      <span className="text-foreground font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted text-xs">{c.email}</td>
                  <td className="hidden lg:table-cell px-5 py-3 font-mono text-xs text-muted">
                    {c.phone}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        SOURCE_ACCENT[c.source]
                      )}
                    >
                      {c.source}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]",
                        stage.bg,
                        stage.border,
                        stage.text
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", stage.dot)} />
                      {STAGE_LABEL[c.stage]}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-5 py-3 font-mono text-xs text-muted">
                    {c.lastContact}
                  </td>
                  <td className="px-5 py-3">
                    <ScoreBadge score={c.score} />
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-sm text-muted"
                >
                  Sin resultados con los filtros actuales.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
