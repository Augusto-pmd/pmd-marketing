"use client";

import { useMemo, useState } from "react";
import { Image as ImageIcon, Video, Upload, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

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

type CategoryFilter = "todas" | Asset["category"];

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "obras", label: "Obras" },
  { id: "renders", label: "Renders" },
  { id: "antes-despues", label: "Antes/Después" },
  { id: "equipo", label: "Equipo" },
];

export function AssetLibrary() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<CategoryFilter>("todas");
  const [filterOpen, setFilterOpen] = useState(false);

  const visible = useMemo(
    () => (filter === "todas" ? ASSETS : ASSETS.filter((a) => a.category === filter)),
    [filter]
  );

  const handleUpload = () => {
    toast({
      title: "Subir asset",
      description: "Próximamente: integración con Drive y subida directa.",
      variant: "info",
    });
  };

  const handleAssetClick = (asset: Asset) => {
    toast({
      title: asset.title,
      description: `${asset.size} · ${CATEGORY_LABEL[asset.category]}`,
      variant: "info",
    });
  };

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
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((o) => !o)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all",
                filter !== "todas"
                  ? "border-cyan/40 bg-cyan/10 text-cyan"
                  : "border-white/10 bg-surface-2 text-muted hover:border-cyan/40 hover:text-cyan"
              )}
            >
              <Filter className="h-3.5 w-3.5" />
              {filter === "todas" ? "Filtrar" : FILTERS.find((f) => f.id === filter)?.label}
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-lg border border-white/10 bg-surface backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setFilter(f.id);
                      setFilterOpen(false);
                    }}
                    className={cn(
                      "block w-full px-3 py-2 text-left text-xs transition-colors",
                      filter === f.id
                        ? "bg-cyan/10 text-cyan"
                        : "text-muted hover:bg-white/5 hover:text-foreground"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleUpload}
            className="flex items-center gap-1.5 rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-1.5 text-xs font-semibold text-cyan shadow-glow-cyan hover:bg-cyan/20 transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            Subir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-3 xl:grid-cols-4">
        {visible.map((asset) => {
          const Icon = asset.type === "video" ? Video : ImageIcon;
          return (
            <article
              key={asset.id}
              onClick={() => handleAssetClick(asset)}
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
          onClick={handleUpload}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/10 bg-surface-2/40 text-muted hover:border-cyan/40 hover:bg-cyan/5 hover:text-cyan transition-all"
        >
          <Upload className="h-6 w-6" />
          <span className="text-xs font-medium">Subir nuevo</span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted/70">
            JPG · PNG · MP4
          </span>
        </button>
      </div>
      {visible.length === 0 && (
        <div className="border-t border-white/5 px-5 py-8 text-center font-mono text-xs uppercase tracking-wider text-muted">
          Sin recursos en {FILTERS.find((f) => f.id === filter)?.label}
        </div>
      )}
    </div>
  );
}
