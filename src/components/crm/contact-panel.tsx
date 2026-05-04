"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  Mail,
  Phone,
  Tag,
  Calendar,
  MessageSquare,
  Send,
  PhoneCall,
  FileText,
  Star,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import {
  type Contact,
  STAGE_LABEL,
  STAGE_ACCENT,
  SOURCE_ACCENT,
} from "@/lib/crm-data";
import { cn, formatNumber } from "@/lib/utils";

type Interaction = {
  icon: LucideIcon;
  text: string;
  meta: string;
  time: string;
  accent: "cyan" | "magenta" | "amber" | "success";
};

const ACCENT_BG: Record<Interaction["accent"], string> = {
  cyan: "bg-cyan/10 text-cyan border-cyan/30",
  magenta: "bg-magenta/10 text-magenta border-magenta/30",
  amber: "bg-amber/10 text-amber border-amber/30",
  success: "bg-success/10 text-success border-success/30",
};

const TIMELINE: Interaction[] = [
  {
    icon: PhoneCall,
    text: "Llamada de seguimiento",
    meta: "Duración: 12 min · Pendiente envío de presupuesto",
    time: "Hoy · 14:30",
    accent: "cyan",
  },
  {
    icon: Send,
    text: "Email enviado",
    meta: "Catálogo de obras 2025",
    time: "Ayer · 10:12",
    accent: "magenta",
  },
  {
    icon: MessageSquare,
    text: "Mensaje en Instagram",
    meta: "Consulta inicial sobre casa modular",
    time: "Lun 28/4 · 22:04",
    accent: "amber",
  },
  {
    icon: CheckCircle2,
    text: "Lead creado",
    meta: "Origen: Instagram · Asignado a Augusto",
    time: "Lun 28/4 · 22:00",
    accent: "success",
  },
];

export function ContactPanel({
  contact,
  onClose,
}: {
  contact: Contact | null;
  onClose: () => void;
}) {
  const open = contact !== null;
  const stage = contact ? STAGE_ACCENT[contact.stage] : null;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] focus:outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
          <Dialog.Title className="sr-only">
            {contact?.name ?? "Detalle de contacto"}
          </Dialog.Title>

          {contact && stage && (
            <>
              <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-5 py-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Detalle del contacto
                </span>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted hover:border-magenta/40 hover:text-magenta transition-all"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="p-5 space-y-5">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/40 to-magenta/40 border border-white/10 text-base font-semibold text-foreground glow-cyan">
                    {contact.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-foreground truncate">
                      {contact.name}
                    </h2>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]",
                          stage.bg,
                          stage.border,
                          stage.text
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", stage.dot)} />
                        {STAGE_LABEL[contact.stage]}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                          SOURCE_ACCENT[contact.source]
                        )}
                      >
                        {contact.source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="rounded-lg border border-white/5 bg-surface-2 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Lead score
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber" />
                      <span className="font-mono text-sm font-semibold text-foreground tabular-nums">
                        {contact.score}/100
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        contact.score >= 85
                          ? "bg-success shadow-[0_0_12px_rgba(0,255,136,0.6)]"
                          : contact.score >= 70
                          ? "bg-amber shadow-[0_0_12px_rgba(255,184,0,0.4)]"
                          : "bg-muted"
                      )}
                      style={{ width: `${contact.score}%` }}
                    />
                  </div>
                </div>

                {/* Contact info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-2 px-3 py-2.5">
                    <Mail className="h-3.5 w-3.5 text-cyan shrink-0" />
                    <span className="text-xs text-foreground truncate">
                      {contact.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-2 px-3 py-2.5">
                    <Phone className="h-3.5 w-3.5 text-success shrink-0" />
                    <span className="font-mono text-xs text-foreground">
                      {contact.phone}
                    </span>
                  </div>
                  {contact.value && (
                    <div className="flex items-center gap-3 rounded-lg border border-amber/20 bg-amber/5 px-3 py-2.5">
                      <Tag className="h-3.5 w-3.5 text-amber shrink-0" />
                      <span className="font-mono text-xs text-foreground tabular-nums">
                        ${formatNumber(contact.value)} ARS
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted ml-auto">
                        valor estimado
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-2 px-3 py-2.5">
                    <Calendar className="h-3.5 w-3.5 text-magenta shrink-0" />
                    <span className="text-xs text-foreground">
                      Último contacto:{" "}
                      <span className="text-muted">{contact.lastContact}</span>
                    </span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-surface-2 py-2.5 text-muted hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5 transition-all"
                  >
                    <Send className="h-4 w-4" />
                    <span className="text-[10px] font-medium">Email</span>
                  </button>
                  <button
                    type="button"
                    className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-surface-2 py-2.5 text-muted hover:border-success/40 hover:text-success hover:bg-success/5 transition-all"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span className="text-[10px] font-medium">Llamar</span>
                  </button>
                  <button
                    type="button"
                    className="flex flex-col items-center gap-1 rounded-lg border border-white/5 bg-surface-2 py-2.5 text-muted hover:border-amber/40 hover:text-amber hover:bg-amber/5 transition-all"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-[10px] font-medium">Propuesta</span>
                  </button>
                </div>

                {/* Notes */}
                {contact.notes && (
                  <div className="rounded-lg border border-cyan/20 bg-cyan/5 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-3 w-3 text-cyan" />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                        Notas
                      </span>
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">
                      {contact.notes}
                    </p>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      Timeline de interacciones
                    </h3>
                  </div>
                  <ul className="relative space-y-3">
                    <span className="absolute left-3.5 top-3 bottom-3 w-px bg-white/10" />
                    {TIMELINE.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <li key={i} className="relative flex items-start gap-3 pl-0">
                          <div
                            className={cn(
                              "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border bg-surface",
                              ACCENT_BG[item.accent]
                            )}
                          >
                            <Icon className="h-3 w-3" />
                          </div>
                          <div className="flex-1 min-w-0 pb-1">
                            <p className="text-xs font-medium text-foreground">
                              {item.text}
                            </p>
                            <p className="text-[11px] text-muted truncate">
                              {item.meta}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-muted/70 mt-1">
                              {item.time}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
