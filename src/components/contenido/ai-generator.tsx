"use client";

import { useState } from "react";
import {
  Sparkles,
  Camera,
  ThumbsUp,
  Briefcase,
  Music,
  Copy,
  Send,
  RefreshCw,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "instagram" | "facebook" | "linkedin" | "tiktok";
type Tone = "profesional" | "casual" | "inspiracional" | "informativo";

const PLATFORMS: Array<{
  id: Platform;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "instagram", label: "Instagram", icon: Camera },
  { id: "facebook", label: "Facebook", icon: ThumbsUp },
  { id: "linkedin", label: "LinkedIn", icon: Briefcase },
  { id: "tiktok", label: "TikTok", icon: Music },
];

const TONES: Array<{ id: Tone; label: string }> = [
  { id: "profesional", label: "Profesional" },
  { id: "casual", label: "Casual" },
  { id: "inspiracional", label: "Inspiracional" },
  { id: "informativo", label: "Informativo" },
];

const SAMPLE_OUTPUT: Record<Tone, string> = {
  profesional:
    "🏗️ Cada proyecto que firmamos en PMD Arquitectura se ejecuta bajo los más altos estándares de calidad constructiva. Nuestro último desarrollo en Pilar combina diseño bioclimático, materiales sustentables y una planificación de obra que reduce los plazos en un 30%.\n\n¿Querés conocer cómo aplicamos estos principios a tu próximo proyecto?\n\n#arquitectura #construcciónAR #obrasPilar",
  casual:
    "Cuando ves cómo queda una obra después de meses de planificación, todo el esfuerzo se justifica 🙌\n\nMirá el antes y después de esta casa modular en Pilar — diseño moderno, terminaciones impecables y tiempos de obra que cumplimos al pie de la letra.\n\n¿Te imaginás tu casa así? 👇\n\n#PMDArquitectura #DiseñoModular #CasasModernas",
  inspiracional:
    "Cada metro cuadrado cuenta una historia. ✨\n\nDetrás de cada pared, de cada ventana orientada al sol, hay una familia que soñó con un hogar y un equipo que trabajó incansablemente para hacerlo realidad. En PMD creemos que la arquitectura no es solo construir — es transformar vidas.\n\n¿Cuál es tu historia?\n\n#arquitectura #hogar #sueños #PMDArquitectura",
  informativo:
    "📊 Datos clave del sector construcción Q1 2026:\n\n• Tiempo promedio de obra (vivienda unifamiliar): 8-10 meses\n• Costo por m² (terminación premium): consultar valores actualizados\n• Demanda en zonas premium del GBA Norte: +18% YoY\n\nEn PMD ofrecemos cotizaciones detalladas en menos de 48hs.\n\n#construcción #arquitectura #datos2026",
};

export function AIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [tone, setTone] = useState<Tone>("profesional");
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(null);
    setTimeout(() => {
      setGenerated(SAMPLE_OUTPUT[tone]);
      setLoading(false);
    }, 1100);
  };

  const handleCopy = async () => {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(generated);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="rounded-xl border border-amber/20 bg-gradient-to-br from-amber/[0.04] to-magenta/[0.03] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber/40 bg-amber/10 glow-amber">
            <Sparkles className="h-4 w-4 text-amber" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">
              IA · Generador
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Crear contenido con IA
            </h3>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Powered by Claude
        </span>
      </div>

      <div className="space-y-4 p-5">
        {/* Prompt */}
        <div>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
            Describí qué querés publicar
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="Ej: Quiero anunciar la finalización de la obra en Pilar, destacando los tiempos cumplidos y el diseño sustentable..."
            className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-surface-2 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-amber/40 focus:outline-none focus:ring-1 focus:ring-amber/20 transition-colors"
          />
        </div>

        {/* Platform + Tone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Plataforma
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                const isActive = platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all",
                      isActive
                        ? "border-cyan/50 bg-cyan/10 text-cyan"
                        : "border-white/10 bg-surface-2 text-muted hover:border-cyan/30 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Tono
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TONES.map((t) => {
                const isActive = tone === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-xs transition-all",
                      isActive
                        ? "border-magenta/50 bg-magenta/10 text-magenta"
                        : "border-white/10 bg-surface-2 text-muted hover:border-magenta/30 hover:text-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className={cn(
            "w-full flex items-center justify-center gap-2 rounded-lg border border-amber/40 bg-amber/15 px-4 py-2.5 text-sm font-semibold text-amber shadow-glow-amber hover:bg-amber/25 transition-all",
            loading && "opacity-70 cursor-wait"
          )}
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              Generar con IA
            </>
          )}
        </button>

        {/* Output */}
        {generated && (
          <div className="rounded-lg border border-cyan/20 bg-surface-2/80 p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                Resultado
              </span>
              <span className="font-mono text-[10px] text-muted tabular-nums">
                {generated.length} caracteres
              </span>
            </div>
            <p className="whitespace-pre-line text-sm text-foreground leading-relaxed">
              {generated}
            </p>
            <div className="mt-4 flex flex-col-reverse sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface px-3 py-2 text-xs font-medium text-foreground hover:border-cyan/40 hover:text-cyan transition-all"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "¡Copiado!" : "Copiar"}
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-cyan/40 bg-cyan/10 px-3 py-2 text-xs font-semibold text-cyan shadow-glow-cyan hover:bg-cyan/20 transition-all"
              >
                <Send className="h-3.5 w-3.5" />
                Enviar a Social Media
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
