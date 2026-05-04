"use client";

import { Image as ImageIcon, Video, Upload, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type Asset = {
  id: string;
  title: string;
  type: "imagen" | "video";
  category: "obras" | "renders" | "antes-despues" | "equipo";
  size: string;
  gradient: string;
};

const ASSETS: Asset[] = [
  {
    id: "a1",
    title: "Casa Pilar — fachada principal",
    type: "imagen",
    category: "obras",
    size: "4096x2730",
    gradient: "from-cyan/20 via-info/15 to-magenta/15",
  },
  {
    id: "a2",
    title: "Render 3D — proyecto Vicente López",
    type: "imagen",
    category: "renders",
    size: "3840x2160",
    gradient: "from-magenta/20 via-amber/15 to-cyan/15",
  },
  {
    id: "a3",
    title: "Tour aéreo — obra modular",
    type: "video",
    category: "obras",
    size: "1920x1080 · 0:42",
    gradient: "from-amber/25 via-magenta/15 to-info/15",
  },
  {
    id: "a4",
    title: "Antes/después — remodelación Belgrano",
    type: "imagen",
    category: "antes-despues",
    size: "2048x2048",
    gradient: "from-success/15 via-cyan/15 to-info/20",
  },
  {
    id: "a5",
    title: "Equipo PMD en obra",
    type: "imagen",
    category: "equipo",
    size: "5472x3648",
    gradient: "from-info/20 via-cyan/20 to-amber/15",
  },
  {
    id: "a6",
    title: "Time-lapse — construcción 6 meses",
    type: "video",
    category: "obras",
    size: "1920x1080 · 1:23",
    gradient: "from-magenta/15 via-info/20 to-success/15",
  },
  {
    id: "a7",
    title: "Render interior — cocina abierta",
    type: "imagen",
    category: "renders",
    size: "4096x2304",
    gradient: "from-amber/20 via-cyan/15 to-magenta/15",
  },
  {
    id: "a8",
    title: "Detalles constructivos — pared verde",
    type: "imagen",
    category: "obras",
    size: "3000x2000",
    gradient: "from-success/20 via-amber/15 to-info/15",
  },
];

const CATEGORY_LABEL: Record<Asset["category"], string> = {
  obras: "Obras",
  renders: "Renders 3D",
  "antes-despues": "Antes / Después",
  equipo: "Equipo",
};

export function AssetLibrary() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Biblioteca
          </span>
          <h3 className="text-sm font-semibold text-foreground">Recursos visuales</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-2 px-3 py-1.5 text-xs text-muted hover:border-cyan/40 hover:text-cyan transition-all"
          >
            <Filter className="h-3.5 w-3.5" />
            Filtrar
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-cyan shadow-glow-cyan hover:bg-cyan/20 transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            Subir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-3 xl:grid-cols-4">
        {ASSETS.map((asset) => {
          const Icon = asset.type === "video" ? Video : ImageIcon;
          return (
            <article
              key={asset.id}
              className="group cursor-pointer overflow-hidden rounded-lg border border-white/5 bg-surface-2 transition-all hover:border-cyan/40 hover:shadow-glow-cyan"
            >
              <div
                className={cn(
                  "relative aspect-square w-full bg-gradient-to-br overflow-hidden",
                  asset.gradient
                )}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-foreground/40" />
                </div>
                <div className="absolute top-2 left-2">
                  <span className="rounded-full border border-white/20 bg-black/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/90 backdrop-blur">
                    {asset.type}
                  </span>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground truncate group-hover:text-cyan transition-colors">
                  {asset.title}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted/70">
                    {CATEGORY_LABEL[asset.category]}
                  </span>
                  <span className="font-mono text-[9px] text-muted/60 tabular-nums">
                    {asset.size}
                  </span>
                </div>
              </div>
            </article>
          );
        })}

        {/* Upload tile */}
        <button
          type="button"
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/10 bg-surface-2/40 text-muted hover:border-cyan/40 hover:bg-cyan/5 hover:text-cyan transition-all"
        >
          <Upload className="h-6 w-6" />
          <span className="text-xs font-medium">Subir nuevo</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted/70">
            JPG · PNG · MP4
          </span>
        </button>
      </div>
    </div>
  );
}
