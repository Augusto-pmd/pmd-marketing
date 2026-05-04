"use client";

import { useState } from "react";
import { Plus, GripVertical } from "lucide-react";
import {
  type Contact,
  type LeadStage,
  STAGES_ORDER,
  STAGE_LABEL,
  STAGE_ACCENT,
  SOURCE_ACCENT,
} from "@/lib/crm-data";
import { cn, formatCompact } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export function LeadKanban({
  contacts,
  onMove,
  onSelect,
}: {
  contacts: Contact[];
  onMove: (id: string, stage: LeadStage) => void;
  onSelect: (c: Contact) => void;
}) {
  const { toast } = useToast();
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<LeadStage | null>(null);

  const handleAddTo = (stage: LeadStage) => {
    toast({
      title: `Nuevo lead en "${STAGE_LABEL[stage]}"`,
      description: "Próximamente: formulario rápido de captura.",
      variant: "info",
    });
  };

  const grouped = STAGES_ORDER.reduce<Record<LeadStage, Contact[]>>(
    (acc, stage) => {
      acc[stage] = contacts.filter((c) => c.stage === stage);
      return acc;
    },
    {} as Record<LeadStage, Contact[]>
  );

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Pipeline de leads
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-0.5">
            Arrastrá las tarjetas entre columnas
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {contacts.length} contactos en pipeline
        </span>
      </div>

      <div className="overflow-x-auto p-4">
        <div className="flex gap-3 min-w-fit">
          {STAGES_ORDER.map((stage) => {
            const items = grouped[stage];
            const accent = STAGE_ACCENT[stage];
            const totalValue = items.reduce((s, c) => s + (c.value ?? 0), 0);
            const isOver = overStage === stage;

            return (
              <div
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverStage(stage);
                }}
                onDragLeave={() => setOverStage((s) => (s === stage ? null : s))}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggingId) {
                    onMove(draggingId, stage);
                    setDraggingId(null);
                    setOverStage(null);
                  }
                }}
                className={cn(
                  "w-[260px] shrink-0 rounded-lg border bg-surface-2/40 transition-all",
                  isOver
                    ? `${accent.border} ${accent.bg}`
                    : "border-white/5"
                )}
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/5 px-3 py-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn("h-2 w-2 rounded-full shrink-0", accent.dot)} />
                    <span className={cn("text-xs font-semibold truncate", accent.text)}>
                      {STAGE_LABEL[stage]}
                    </span>
                    <span className="font-mono text-[10px] text-muted tabular-nums">
                      {items.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Agregar"
                    onClick={() => handleAddTo(stage)}
                    className="flex h-5 w-5 items-center justify-center rounded text-muted hover:text-cyan hover:bg-cyan/10 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {totalValue > 0 && (
                  <div className="px-3 py-1.5 border-b border-white/5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Valor:
                    </span>
                    <span className="font-mono text-[11px] text-foreground ml-1.5">
                      ${formatCompact(totalValue)}
                    </span>
                  </div>
                )}

                <div className="space-y-2 p-2 min-h-[120px]">
                  {items.map((contact) => (
                    <article
                      key={contact.id}
                      draggable
                      onDragStart={() => setDraggingId(contact.id)}
                      onDragEnd={() => {
                        setDraggingId(null);
                        setOverStage(null);
                      }}
                      onClick={() => onSelect(contact)}
                      className={cn(
                        "group cursor-grab active:cursor-grabbing rounded-lg border border-white/5 bg-surface p-3 transition-all hover:border-cyan/30 hover:shadow-glow-cyan",
                        draggingId === contact.id && "opacity-50"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-3 w-3 text-muted/50 mt-0.5 group-hover:text-cyan/60 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan/30 to-magenta/30 border border-white/10 text-[9px] font-semibold text-foreground">
                              {contact.initials}
                            </div>
                            <span className="text-xs font-medium text-foreground truncate">
                              {contact.name}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                            <span
                              className={cn(
                                "inline-flex rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                                SOURCE_ACCENT[contact.source]
                              )}
                            >
                              {contact.source}
                            </span>
                            <span className="font-mono text-[9px] text-muted ml-auto">
                              ★ {contact.score}
                            </span>
                          </div>
                          {contact.value && (
                            <div className="mt-1.5 font-mono text-[11px] text-success/80 tabular-nums">
                              ${formatCompact(contact.value)}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                  {items.length === 0 && (
                    <div className="flex items-center justify-center h-20 rounded-md border border-dashed border-white/10 text-[10px] text-muted/60 font-mono uppercase tracking-wider">
                      vacío
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
