"use client";

import { useState } from "react";
import { Edit3, Palette, Type, Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const COLORS = [
  { name: "Cian primario", hex: "#00f0ff", role: "Primary" },
  { name: "Magenta", hex: "#ff00e5", role: "Accent" },
  { name: "Ámbar", hex: "#ffb800", role: "Secondary" },
  { name: "Verde éxito", hex: "#00ff88", role: "Success" },
  { name: "Negro espacial", hex: "#0a0a0f", role: "Background" },
];

const FONTS = [
  { name: "Inter", role: "Tipografía UI / títulos", weight: "Variable 100-900" },
  { name: "JetBrains Mono", role: "Datos / números", weight: "Variable 100-900" },
];

export function BrandKit() {
  const { toast } = useToast();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleEdit = () => {
    toast({
      title: "Editar brand kit",
      description: "Próximamente: editor de identidad con preview en vivo.",
      variant: "info",
    });
  };

  const handleCopyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex((c) => (c === hex ? null : c)), 1400);
    toast({ title: `${hex} copiado`, variant: "info" });
  };

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-magenta/30 bg-magenta/10">
            <Palette className="h-4 w-4 text-magenta" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Brand kit
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Identidad PMD
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={handleEdit}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-2 px-3 py-1.5 text-xs text-muted hover:border-magenta/40 hover:text-magenta hover:shadow-glow-magenta transition-all"
        >
          <Edit3 className="h-3.5 w-3.5" />
          Editar
        </button>
      </div>

      <div className="space-y-5 p-5">
        {/* Logo placeholder */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Logo
          </span>
          <div className="mt-2 flex aspect-[3/1] items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-cyan/5 via-magenta/5 to-amber/5 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/40 to-magenta/40 border border-cyan/40 glow-cyan">
                <span className="font-mono text-base font-bold text-foreground">P</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-semibold tracking-tight text-foreground">
                  PMD
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  Arquitectura
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Paleta de colores
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {COLORS.map((c) => {
              const isCopied = copiedHex === c.hex;
              return (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => handleCopyHex(c.hex)}
                  className="group text-left rounded-lg border border-white/5 bg-surface-2 overflow-hidden hover:border-white/20 transition-all"
                  title={`Copiar ${c.hex}`}
                >
                  <div
                    className="aspect-square w-full transition-all group-hover:scale-[1.02]"
                    style={{
                      background: c.hex,
                      boxShadow: `inset 0 0 20px ${c.hex}40`,
                    }}
                  />
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {c.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase text-muted flex items-center gap-1">
                      {c.hex}
                      {isCopied ? (
                        <Check className="h-2.5 w-2.5 text-success" />
                      ) : (
                        <Copy className="h-2.5 w-2.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                      )}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fonts */}
        <div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Tipografías
          </span>
          <div className="mt-2 space-y-2">
            {FONTS.map((f) => (
              <div
                key={f.name}
                className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-2 px-3 py-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10">
                  <Type className="h-4 w-4 text-cyan" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm text-foreground font-semibold ${
                      f.name === "JetBrains Mono" ? "font-mono" : ""
                    }`}
                  >
                    {f.name}
                  </p>
                  <p className="text-xs text-muted">{f.role}</p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {f.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
