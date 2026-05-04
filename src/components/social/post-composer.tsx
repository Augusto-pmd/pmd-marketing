"use client";

import { useState } from "react";
import { Camera, ThumbsUp, Briefcase, Music, Image as ImageIcon, Calendar, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

type Platform = "instagram" | "facebook" | "linkedin" | "tiktok";

const PLATFORMS: Array<{
  id: Platform;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  active: string;
}> = [
  {
    id: "instagram",
    label: "Instagram",
    icon: Camera,
    accent: "border-white/10 text-muted hover:border-magenta/40 hover:text-magenta",
    active: "border-magenta/50 bg-magenta/10 text-magenta shadow-glow-magenta",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: ThumbsUp,
    accent: "border-white/10 text-muted hover:border-info/40 hover:text-info",
    active: "border-info/50 bg-info/10 text-info",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: Music,
    accent: "border-white/10 text-muted hover:border-amber/40 hover:text-amber",
    active: "border-amber/50 bg-amber/10 text-amber shadow-glow-amber",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Briefcase,
    accent: "border-white/10 text-muted hover:border-cyan/40 hover:text-cyan",
    active: "border-cyan/50 bg-cyan/10 text-cyan shadow-glow-cyan",
  },
];

const MAX = 280;

export function PostComposer({
  onChange,
}: {
  onChange?: (state: { text: string; platforms: Platform[] }) => void;
}) {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<Platform[]>(["instagram"]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const validate = () => {
    if (!text.trim()) {
      toast({ title: "Escribí algo antes de publicar", variant: "error" });
      return false;
    }
    if (text.length > MAX) {
      toast({
        title: "Texto demasiado largo",
        description: `Reducí ${text.length - MAX} caracteres.`,
        variant: "error",
      });
      return false;
    }
    if (selected.length === 0) {
      toast({ title: "Elegí al menos una plataforma", variant: "error" });
      return false;
    }
    return true;
  };

  const handleSchedule = () => {
    if (!validate()) return;
    if (!date || !time) {
      toast({
        title: "Falta fecha y hora",
        description: "Elegí cuándo querés que se publique.",
        variant: "error",
      });
      return;
    }
    toast({
      title: "Post programado",
      description: `${selected.length} plataforma${selected.length === 1 ? "" : "s"} · ${date} ${time}`,
      variant: "success",
    });
  };

  const handlePublish = () => {
    if (!validate()) return;
    toast({
      title: "Publicado",
      description: `Salió en ${selected.map((s) => s[0].toUpperCase() + s.slice(1)).join(", ")}.`,
      variant: "success",
    });
  };

  const togglePlatform = (p: Platform) => {
    setSelected((prev) => {
      const next = prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p];
      onChange?.({ text, platforms: next });
      return next;
    });
  };

  const handleText = (v: string) => {
    setText(v);
    onChange?.({ text: v, platforms: selected });
  };

  const remaining = MAX - text.length;

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Composer
          </span>
          <h3 className="mt-0.5 text-base font-semibold text-foreground">
            Crear publicación
          </h3>
        </div>
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            remaining < 0 ? "text-magenta" : "text-muted"
          )}
        >
          {remaining}
        </span>
      </div>

      <div className="space-y-4 p-5">
        {/* Text */}
        <div>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Mensaje
          </label>
          <textarea
            value={text}
            onChange={(e) => handleText(e.target.value)}
            placeholder="¿Qué querés contar hoy? Compartí novedades de obras, tips de diseño o testimonios..."
            rows={5}
            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-colors"
          />
        </div>

        {/* Platforms */}
        <div>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Plataformas
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const isActive = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    isActive ? p.active : p.accent
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Multimedia
          </label>
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            className={cn(
              "mt-2 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all",
              dragActive
                ? "border-cyan/60 bg-cyan/5"
                : "border-white/10 bg-surface-2/40 hover:border-cyan/30 hover:bg-cyan/[0.03]"
            )}
          >
            <ImageIcon className="h-6 w-6 text-muted mb-2" />
            <p className="text-sm text-foreground">
              Arrastrá imágenes aquí
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted mt-1">
              o hacé clic para subir · JPG / PNG / MP4
            </p>
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Fecha
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Hora
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-colors"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={handleSchedule}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-2 px-4 py-2.5 text-sm font-medium text-foreground hover:border-amber/40 hover:bg-amber/5 hover:text-amber transition-all"
          >
            <Calendar className="h-4 w-4" />
            Programar
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-4 py-2.5 text-sm font-semibold text-cyan shadow-glow-cyan hover:bg-cyan/20 transition-all"
          >
            <Send className="h-4 w-4" />
            Publicar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
