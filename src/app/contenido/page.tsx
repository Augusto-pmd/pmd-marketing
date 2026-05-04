import { PenTool } from "lucide-react";
import { AIGenerator } from "@/components/contenido/ai-generator";
import { AssetLibrary } from "@/components/contenido/asset-library";
import { BrandKit } from "@/components/contenido/brand-kit";
import { Templates } from "@/components/contenido/templates";
import { PageMotion } from "@/components/ui/page-motion";

export default function ContenidoPage() {
  return (
    <PageMotion className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Content Studio
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <PenTool className="h-3.5 w-3.5 text-amber" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            47 piezas creadas este mes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AIGenerator />
          <AssetLibrary />
        </div>
        <div>
          <BrandKit />
        </div>
      </div>

      <Templates />
    </PageMotion>
  );
}
